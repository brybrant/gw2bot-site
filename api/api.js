/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fetch from 'node-fetch'
import { Long, ObjectID } from 'mongodb'

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

server.get('/user', async (req, res) => {
  const discordToken = req.header('Authorization')

  if (!discordToken) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  // Check if user has previously authenticated
  if (req.cookies.userID && req.cookies.accountName && req.cookies.dpsToken) {
    try {
      const user = await database.getUser(Long(req.cookies.userID), res)

      if (user === 0) { return }

      res.send(user.cogs.GuildWars2.key.account_name)
    } catch (error) {
      console.error(error)
      res.status(401).send({ message: 'Unauthorized' })
    }
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
  }).catch((error) => {
    console.error(error)
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
  const gw2AccountName = req.cookies.accountName

  if (!gw2AccountName) {
    res.status(400).send({
      message: 'Bad Request',
      cause: 'Invalid account name'
    })
    return
  }

  const encounters = await database.getCollection('gw2.encounters', res)

  if (encounters === 0) { return }

  try {
    const userEncounters = await encounters.find({
      players: gw2AccountName
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
    res.status(500).send({
      message: 'Internal Server Error',
      cause: error.message
    })
  }
})

server.get('/encounters/test', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.send([])
    return
  }

  const gw2AccountName = req.cookies.accountName

  if (!gw2AccountName) {
    res.status(400).send({
      message: 'Bad Request',
      cause: 'Invalid account name'
    })
    return
  }

  const encounters = await database.getCollection('gw2.encounters_test', res)

  if (encounters === 0) { return }

  const count = Math.min(Math.max(req.query.count, 10), 150)

  if (!count) {
    console.error(`Invalid encounter count: "${count}"`)
    res.status(400).send({
      message: 'Bad Request',
      cause: 'Invalid encounter count.\nSet "count" query parameter to integer'
    })
    return
  }

  const documentCount = await encounters.countDocuments()

  if (documentCount !== count) {
    await encounters.drop()

    const generatedEncounters = generateEncounters(count, gw2AccountName)

    const result = await encounters.bulkWrite(generatedEncounters)

    if (result.ok) {
      console.log(`Generated ${result.nInserted} test encounters`)
    } else {
      res.status(500).send({
        message: 'Internal Server Error'
      })
      return
    }
  }

  try {
    const userEncounters = await encounters.find({}, {
      sort: [
        ['date', -1]
      ]
    }).toArray()

    res.send(userEncounters)
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: 'Internal Server Error',
      cause: error.message
    })
  }
})

server.post('/encounters/:id', express.json(), async (req, res) => {
  const encounterId = new ObjectID(req.params.id)

  const encounters = await database.getCollection('gw2.encounters', res)

  if (encounters === 0) { return }

  const result = await encounters.updateOne({ _id: encounterId }, {
    $set: {
      details: req.body
    }
  })

  if (result.modifiedCount === 1) {
    console.log(`Added details to encounter "${req.params.id}"`)
    res.send('Success')
    return
  }

  console.log(`Error adding details to encounter "${req.params.id}"`)
  res.send('Failure')
})

export default {
  path: '/api',
  handler: server
}
