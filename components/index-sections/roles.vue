<template>
  <section>
    <div class="page-width page-padding">
      <h2>Powerful Tools for Server&nbsp;Admins</h2>

      <picture>
        <source
          :data-srcset="require('@/assets/img/space-quaggan.webp')"
          type="image/webp"
        >
        <img
          data-sizes="auto"
          class="lazyload"
          :data-src="require('@/assets/img/space-quaggan.png')"
          alt=""
        >
      </picture>

      <p class="h5">
        Automatic Discord&nbsp;roles for Guild&nbsp;Wars&nbsp;2&nbsp;communities
      </p>

      <p class="h6 gutter-top-margin">
        Add basic verification with <code>/server&nbsp;api_key_role</code>&nbsp;to distinguish GW2Bot&nbsp;users
      </p>

      <p class="h6">
        Synchronize <strong>up&nbsp;to 8&nbsp;guilds in a single Discord&nbsp;server</strong> by using the&nbsp;<code>/guildsync</code>&nbsp;command
      </p>

      <p class="h6">
        Organise WvW players with&nbsp;<code>/worldsync</code> to add team roles to your Discord&nbsp;server
      </p>

      <NuxtLink class="button button--large" to="/commands">See All GW2Bot Capabilities</NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RolesSection'
}
</script>

<style lang="scss" scoped>
section {
  text-align: right;
}
h2 {
  margin: 0;
}
a {
  margin: $baseline-rem 0 (-$gutter-rem * 0.25) 0;
}
img {
  float: left;
  margin: $baseline-rem 0 0 0;
  width: 308px;
  height: 305px;
}
</style>
