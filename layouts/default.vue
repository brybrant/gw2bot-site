<template>
  <div>
    <div id="tooltip-boundary" />

    <HeaderComponent />

    <div class="page">
      <Nuxt />
    </div>

    <DonateComponent />

    <FooterComponent />
  </div>
</template>

<script>
import { options as VTooltipOptions } from 'floating-vue'

import HeaderComponent from '@/components/header'
import DonateComponent from '@/components/donate'
import FooterComponent from '@/components/footer'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    DonateComponent,
    FooterComponent
  },
  head () {
    return {
      link: [
        {
          rel: 'preload',
          href: '/fonts/TrebuchetMS-Bold.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
        }
      ]
    }
  },
  mounted () {
    VTooltipOptions.boundary = document.getElementById('tooltip-boundary')
  }
}
</script>

<style lang="scss" scoped>
#tooltip-boundary {
  position: fixed;
  top: $nav-height;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
}
</style>
