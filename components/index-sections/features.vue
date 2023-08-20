<template>
  <section>
    <div class="page-width page-padding">
      <h2>The Versatile Guild&nbsp;Wars&nbsp;2 Companion</h2>

      <picture>
        <source
          :data-srcset="require('@/assets/img/knight-quaggan.webp')"
          type="image/webp"
        >
        <img
          data-sizes="auto"
          class="lazyload"
          :data-src="require('@/assets/img/knight-quaggan.png')"
          alt=""
        >
      </picture>

      <p class="h5">
        GW2Bot includes many convenient ways to interact with your account from within&nbsp;Discord
      </p>

      <p class="h6 gutter-top-margin">
        Save time with <code>/search</code> to quickly find items on your&nbsp;account
      </p>

      <p class="h6">
        <strong>Track your weekly raid&nbsp;progression</strong> with the&nbsp;<code>/bosses</code> command and <strong>flex your raid&nbsp;achievements</strong> with the&nbsp;<code>/kp</code>&nbsp;command
      </p>

      <p class="h6">
        <strong>Monitor your trades</strong> with&nbsp;<code>/tp</code> commands and type&nbsp;<code>/wallet</code> to <strong>check your&nbsp;wealth</strong>
      </p>

      <NuxtLink class="button button--large" to="/commands">View All Commands</NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection'
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
  height: 320px;
}
</style>
