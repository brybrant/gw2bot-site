# gw2bot-site

The website of [GW2Bot](https://github.com/Maselkov/GW2Bot), created by [Maselkov](https://github.com/Maselkov/).
Visit [gw2bot.info](https://gw2bot.info/) to see the live website.

## About

This website is built using [Nuxt.js](https://v2.nuxt.com/) and takes advantage of an embedded [Express.js](https://expressjs.com/) API.

It showcases some features of the bot, lists the available commands, and hosts a couple of FAQs.

It also has Discord authentication for viewing encounter logs that are uploaded via the bot.

## Setup

``` bash
# Install dependencies
npm install

# Run locally for development
npm run dev

# Build for production
npm run build
```

### Nuxt configuration

You must replace `YOUR_BOT_ID` in the file `./nuxt.config.js` with your Discord bot's Client ID for authentication.

``` js
// ./nuxt.config.js

export default {
  auth: {
    strategies: {
      discord: {
        client_id: 'YOUR_BOT_ID'
      }
    }
  }
}
```

### Discord bot configuration

You must configure the OAuth2 redirect URIs for your bot to allow Discord authentication. Go to your [Discord Developer Portal](https://discord.com/developers/applications/) and select your bot. Go to OAuth2 General settings and enter the following URIs:

Development: `http://localhost:3000/login`

Production: `https://gw2bot.info/login`

### MongoDB configuration

In development, make sure your local mongodb service is running when you try to view the logs page. The website connects to the same database used by GW2Bot.

If your connection to the database times out, you may need to edit your [mongod configuration file](https://www.mongodb.com/docs/manual/reference/configuration-options/#configuration-file-options) to enable IPV6 connection to localhost:

``` yaml
# path/to/mongod.cfg

net:
  port: 27017
  bindIp: localhost,127.0.0.1
  ipv6: true
```

## Contribution

Feel free to create an issue or pull request for any improvement you would like to add.

For pull requests, please explain the issue, your solution/improvement, and make sure ESLint is happy.
