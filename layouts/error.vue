<template>
  <main>
    <div class="page-width page-padding">
      <header>
        <h1>Error {{ error.statusCode }}</h1>

        <p>{{ error.message }}.</p>
      </header>

      <picture>
        <source
          :srcset="error.statusCode===404 ?
            require('@/assets/img/404-quaggan.webp') :
            require('@/assets/img/error-quaggan.webp')"
          type="image/webp"
        >
        <img
          :class="error.statusCode===404 ? 'notfound-quaggan' : 'error-quaggan'"
          :src="error.statusCode===404 ?
            require('@/assets/img/404-quaggan.png') :
            require('@/assets/img/error-quaggan.png')"
          alt=""
        >
      </picture>

      <p v-if="error.statusCode!=404">
        If this problem persists, please <ExternalLink href="https://github.com/brybrant/gw2bot-site/issues">submit an issue on GitHub</ExternalLink> or report it in the <ExternalLink :href="$supportServerLink">GW2Bot Discord&nbsp;Server</ExternalLink>.
      </p>

      <br>

      <NuxtLink class="button button--large" to="/">
        Back to Home Page
      </NuxtLink>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return {
      title: `${this.error.statusCode} | GW2Bot`
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  display: inline-block;
  width: 100%;
  vertical-align: top;
}
.notfound-quaggan {
  margin: 0 0 $baseline-rem 48px;
  width: 356px;
  height: 370px;
}
.error-quaggan {
  width: 308px;
  height: 313px;
}
</style>
