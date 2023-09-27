/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fetch from 'node-fetch'
import { Long, ObjectID } from 'mongodb'

import bosses from '../assets/js/bossesData'

import * as database from './database'
import { authenticate } from './authenticate'
import { generateEncounters } from './generateEncounters'

const server = express()

server.disable('x-powered-by')

server.use(
  cors({
    ...(process.env.NODE_ENV === 'production' && {
      origin: /https:\/\/(www\.)?gw2bot\.info/
    })
  })
)

server.use(cookieParser())

server.use('/encounters', authenticate)

const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict'
}

const encounterData = {}
const encounterLookup = {}
const encounterTally = {
  total: 0
}

for (const instances of Object.values(bosses)) {
  for (const instance of instances) {
    encounterTally[instance.name] = 0

    for (const encounter of instance.encounters) {
      encounterLookup[encounter.name] = encounter.ids
      encounterTally[encounter.name] = 0

      for (const id of encounter.ids) {
        encounterData[id] = {
          instance: instance.name,
          name: encounter.name,
          count: 0
        }
      }
    }
  }
}

server.get('/user', async (req, res) => {
  const discordToken = req.header('Authorization')

  if (!discordToken) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  // Check if user has previously authenticated
  if (req.cookies.userID && req.cookies.accountName && req.cookies.dpsToken) {
    const user = await database.getUser(Long(req.cookies.userID), res)

    if (user === 0) { return }

    if (req.cookies.accountName !== user.cogs.GuildWars2.key.account_name) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }

    res.send(user.cogs.GuildWars2.key.account_name)
    return
  }

  const discordUser = await fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: discordToken
    }
  }).then((response) => {
    if (response.ok) {
      return response.json()
    }

    console.error(
      `Received error ${response.status} from Discord API.\nToken: "${discordToken}"`
    )
    res.status(response.status).send({
      message: response.statusText
    })
    return 0
  })

  if (discordUser === 0) { return }

  const userID = Long(discordUser.id)
  const user = await database.getUser(userID, res)

  if (user === 0) { return }

  if (!userID.equals(user._id)) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  // accountName is from user's active API key (changes with /key switch)
  const accountName = user.cogs.GuildWars2.key.account_name
  const dpsToken = user.cogs.GuildWars2.dpsreport_token

  res.cookie('userID', discordUser.id, cookieOptions)
    .cookie('accountName', accountName, cookieOptions)
    .cookie('dpsToken', dpsToken, cookieOptions)
    .send(accountName)
})

server.get('/encounters', async (req, res) => {
  const encounters = await database.getCollection('gw2.encounters', res)

  try {
    const userEncounterData = JSON.parse(JSON.stringify(encounterData))

    await encounters.find({
      players: req.cookies.accountName
    }, {
      projection: {
        boss_id: 1
      }
    }).forEach(doc => userEncounterData[doc.boss_id].count++)

    const userEncounterTally = JSON.parse(JSON.stringify(encounterTally))

    for (const boss of Object.values(userEncounterData)) {
      userEncounterTally.total += boss.count
      userEncounterTally[boss.instance] += boss.count
      if (boss.name === boss.instance) { continue }
      userEncounterTally[boss.name] += boss.count
    }

    res.send(userEncounterTally)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

server.get('/encounters/:name', async (req, res) => {
  const encounterIds = encounterLookup[req.params.name]

  if (encounterIds === undefined) {
    res.status(400).send({
      message: 'Bad Request',
      cause: 'Invalid encounter name'
    })
    return
  }

  const encounters = await database.getCollection('gw2.encounters', res)

  try {
    const userEncounters = await encounters.find({
      players: req.cookies.accountName,
      boss_id: {
        $in: encounterIds
      }
    }, {
      projection: {
        start_date: 0,
        players: 0
      },
      sort: [
        ['date', -1]
      ]
    }).toArray()

    res.send(userEncounters)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

if (process.env.NODE_ENV === 'development') {
  server.get('/encounters_test', async (req, res) => {
    const encounters = await database.getCollection('gw2.encounters_test', res)

    if (encounters === 0) { return }

    const count = Math.min(Math.max(req.query.count, 1), 150)

    if (!count) {
      console.error(`Invalid encounter count: "${req.query.count}"`)
      res.status(400).send({
        message: 'Bad Request',
        cause: 'Invalid encounter count.\nSet "count" query to integer'
      })
      return
    }

    const documentCount = await encounters.countDocuments()

    if (documentCount !== count) {
      await encounters.drop()

      const result = await encounters.bulkWrite(
        generateEncounters(count, req.cookies.accountName)
      )

      if (result.ok) {
        console.log(`Generated ${result.nInserted} test encounters`)
      } else {
        res.status(500).send({ message: 'Internal Server Error' })
        return
      }
    }

    try {
      const userEncounterTally = JSON.parse(JSON.stringify(encounterTally))

      userEncounterTally.total = userEncounterTally['World vs World'] = count

      res.send(userEncounterTally)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Internal Server Error' })
    }
  })

  server.get('/encounters_test/:name', async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.status(403).send({ message: 'Forbidden' })
      return
    }

    const encounterIds = encounterLookup[req.params.name]

    if (encounterIds === undefined) {
      res.status(400).send({
        message: 'Bad Request',
        cause: 'Invalid encounter name'
      })
      return
    }

    const encounters = await database.getCollection('gw2.encounters_test', res)

    try {
      const userEncounters = await encounters.find({}, {
        sort: [
          ['date', -1]
        ]
      }).toArray()

      res.send(userEncounters)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Internal Server Error' })
    }
  })
}

server.post('/encounters/:id', express.json(), async (req, res) => {
  const encounterId = new ObjectID(req.params.id)

  const encounters = await database.getCollection('gw2.encounters', res)

  try {
    await encounters.updateOne({ _id: encounterId }, {
      $set: {
        details: req.body
      }
    })

    res.send('Success')
  } catch (error) {
    console.error(`Error adding details to encounter "${req.params.id}"`)
    res.send('Failure')
  }
})

export default {
  path: '/api',
  handler: server
}
