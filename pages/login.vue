<template>
  <main>
    <div class="page-width page-padding">
      <header>
        <h1>Redirecting... <LoadingInlineSVG /></h1>
      </header>
    </div>
  </main>
</template>

<script>
import LoadingInlineSVG from '@/components/inline-svgs/loading'

export default {
  name: 'LoginPage',
  components: {
    LoadingInlineSVG
  },
  middleware: 'auth',
  head () {
    return {
      title: 'Logging In...'
    }
  },
  mounted () {
    if (!this.$auth.loggedIn) {
      this.$auth.loginWith('discord')
    }
  }
}
</script>

<style lang="scss" scoped>
h1 .inline-svg {
  width: $h1-line-rem;
  height: $h1-line-rem;
}
</style>
