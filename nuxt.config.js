const meta = {
  title: 'GW2Bot - A Discord Bot for Guild Wars 2',
  description: 'GW2Bot is a powerful Guild Wars 2 bot for Discord!'
}

export default {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en',
      xmlns: 'http://www.w3.org/1999/xhtml'
    },
    title: meta.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { name: 'theme-color', content: '#C12D2B' },
      { name: 'msapplication-TileColor', content: '#fff' },
      { name: 'application-name', content: 'GW2Bot' },
      { hid: 'robots', name: 'robots', content: 'all' },
      { hid: 'title', property: 'og:title', content: meta.title },
      { hid: 'description', name: 'description', property: 'og:description', content: meta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://gw2bot.info' },
      { property: 'og:image', content: 'https://gw2bot.info/og-image.png' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#b40000' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#b40000' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/filters' },
    { src: '~/plugins/globalComponents' },
    { src: '~/plugins/globalVariables' },
    { src: '~/plugins/tooltips', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/color-mode',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Settings for '@nuxtjs/style-resources' module
  */
  styleResources: {
    scss: [
      '~/assets/scss/_functions.scss',
      '~/assets/scss/_silent-classes.scss',
      '~/assets/scss/_colors.scss',
      '~/assets/scss/_settings.scss'
    ]
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/stylelint-module',
    // Doc: https://v0.image.nuxtjs.org/
    '@nuxt/image'
  ],
  /*
  ** Settings for '@nuxt/image' module
  */
  image: {
    screens: {
      '480': 480,
      '600': 600,
      '720': 720,
      '960': 960,
      '1200': 1200,
      '1440': 1440,
      '1680': 1680,
      '1920': 1920
    },
    staticFilename: '[publicPath]/img/[name]-[hash][ext]'
  },

  serverMiddleware: [
    '~/api/api'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    credentials: true,
    debug: process.env.NODE_ENV === 'development'
  },

  auth: {
    redirect: {
      login: '/login',
      logout: false,
      callback: '/login',
      home: false
    },
    strategies: {
      discord: {
        _scheme: 'oauth2',
        authorization_endpoint: 'https://discord.com/api/oauth2/authorize',
        userinfo_endpoint: 'https://discord.com/api/users/@me',
        client_id: 'YOUR_BOT_ID',
        scope: ['identify'],
        response_type: 'token',
        token_type: 'Bearer'
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
