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
          :src="error.statusCode===404 ?
            require('@/assets/img/404-quaggan.png') :
            require('@/assets/img/error-quaggan.png')"
          alt=""
        >
      </picture>

      <p v-if="error.statusCode!=404">
        If this problem persists, please report it in the <a class="external" :href="$supportServerLink" target="_blank">GW2Bot Discord&nbsp;Server</a>.
      </p>

      <br>

      <nuxt-link class="button button--large" to="/">
        Back to Home Page
      </nuxt-link>
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
      title: `${this.error.statusCode}`
    }
  }
}
</script>

<style scoped>
img {
  display: inline-block;
  width: 100%;
  max-width: 336px;
  max-height: 336px;
  vertical-align: top;
}
</style>
