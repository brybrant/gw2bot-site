<template>
  <main>
    <div class="page-width page-padding">
      <header>
        <h1>Error {{ error.statusCode }}</h1>

        <p>{{ error.message }}.</p>

        <pre v-if="error.cause">{{ error.cause }}.</pre>
      </header>

      <picture>
        <source
          :data-srcset="require(`~/assets/img/${notFound ? '404' : 'error'}-quaggan.png?format=webp`)"
          type="image/webp"
        >
        <img
          alt=""
          :class="`${notFound ? 'notfound' : 'error'}-quaggan lazyload`"
          :width="notFound ? '356' : '308'"
          :height="notFound ? '370' : '313'"
          :data-src="require(`~/assets/img/${notFound ? '404' : 'error'}-quaggan.png`)"
        >
      </picture>

      <p v-if="!notFound">
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
import metadata from '@/assets/js/metadata'

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
    return metadata({
      title: `${this.error.statusCode} | GW2Bot`,
      description: 'Error',
      robots: this.notFound ? 'noindex, noarchive' : 'all'
    })
  },
  computed: {
    notFound () {
      return this.error.statusCode === 404
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

pre {
  display: inline-block;
  vertical-align: top;
  margin: $baseline-rem 0 0 0;
  padding: 1px 5px;
}
</style>
