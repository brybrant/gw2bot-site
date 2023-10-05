module.exports = {
  'root': true,
  'env': {
    browser: true,
    node: true
  },
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  'extends': [
    '@nuxtjs/eslint-config',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  'rules': {
    'quote-props': ['warn', 'consistent', {
      keywords: true
    }],
    'vue/singleline-html-element-content-newline': ['warn', {
      ignores: ['ExternalLink', 'NuxtLink', 'a', 'abbr', 'pre', 'span', 'td']
    }]
  }
}
