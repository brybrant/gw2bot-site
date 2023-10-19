<template>
  <div>
    <HeaderComponent />
    <div class="page">
      <Nuxt />
    </div>
    <DonateComponent />
    <FooterComponent />
  </div>
</template>

<script>
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
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
          media: 'print',
          onload: 'this.onload=null;this.removeAttribute("media")'
        }
      ]
    }
  }
}
</script>
