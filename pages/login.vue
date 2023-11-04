<template>
  <main>
    <div class="page-width page-padding">
      <header>
        <h1>Redirecting... <LoadingInlineSVG /></h1>
      </header>

      <picture>
        <source
          data-srcset="~/assets/img/sleep-quaggan.png?format=webp"
          type="image/webp"
        >
        <img
          alt=""
          class="lazyload"
          width="320"
          height="262"
          data-src="~/assets/img/sleep-quaggan.png"
        >
      </picture>
    </div>
  </main>
</template>

<script>
import LoadingInlineSVG from '@/components/inline-svgs/loading'
import metadata from '@/assets/js/metadata'

export default {
  name: 'LoginPage',
  components: {
    LoadingInlineSVG
  },
  middleware: 'auth',
  head () {
    return metadata({
      title: 'Logging In...',
      description: 'Logging in...',
      robots: 'noindex, noarchive'
    })
  },
  async mounted () {
    await this.$auth.fetchUser()

    if (!this.$auth.loggedIn) {
      this.$auth.loginWith('discord')
    } else {
      this.$router.push({
        name: sessionStorage.getItem('lastRoute') || 'index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h1 .inline-svg {
  width: $h1-line-rem;
  height: $h1-line-rem;
}

img {
  display: inline-block;
  margin: 0 96px 0 0;
  width: 320px;
  height: 262px;
  vertical-align: top;
}
</style>
