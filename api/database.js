/* eslint-disable no-console */
import { MongoClient } from 'mongodb'

export const client = new MongoClient(
  process.env.MONGO_URL || 'mongodb://localhost:27017'
)

export async function getCollection (collection, res) {
  try {
    await client.connect()
  } catch (error) {
    console.error(error)
    res.status(504).send({
      message: 'Gateway Timeout',
      cause: `Failed to connect to database:\n${error.message}`
    })
    return 0
  }

  return client.db(process.env.MONGO_DB || 'toothy').collection(collection)
}

export async function getUser (userID, res) {
  const users = await getCollection('users', res)

  if (users === 0) { return 0 }

  const user = await users.findOne({ _id: userID })

  if (!user) {
    res.status(404).send({
      message: 'User Not Found',
      cause: 'Please add your Guild Wars 2 API key to GW2Bot first'
    })
    return 0
  }

  if (user.cogs.GuildWars2.dpsreport_token) {
    return user
  }

  const dpsToken = await fetch('https://dps.report/getUserToken')
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      console.error(
        `Error ${response.status} getting dps.report token for <@${userID}>`
      )

      res.status(response.status).send({ message: response.statusText })
      return 0
    })

  if (dpsToken === 0) { return 0 }

  await users.updateOne({ _id: userID }, {
    $set: {
      'cogs.GuildWars2.dpsreport_token': dpsToken.userToken
    }
  })

  user.cogs.GuildWars2.dpsreport_token = dpsToken.userToken

  return user
}
