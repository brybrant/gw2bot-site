<template>
  <main>
    <div class="page-width page-padding">
      <header>
        <h1>Redirecting... <LoadingInlineSVG /></h1>
      </header>

      <nuxt-img
        format="webp"
        quality="75"
        width="320"
        height="262"
        src="/img/sleep-quaggan.png"
        alt=""
        :placeholder="[160, 131, 1]"
      />
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
