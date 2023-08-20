<template>
  <section>
    <div class="page-width page-padding">
      <h2>Quick and Easy Setup</h2>

      <picture>
        <source
          :data-srcset="require('@/assets/img/lost-quaggan.webp')"
          type="image/webp"
        >
        <img
          data-sizes="auto"
          class="lazyload"
          :data-src="require('@/assets/img/lost-quaggan.png')"
          alt=""
        >
      </picture>

      <p class="h5">
        Get started with GW2Bot in no time
      </p>

      <p class="h6 gutter-top-margin">
        GW2Bot has user-friendly <em>slash&nbsp;commands</em> which provide helpful instructions and autocompletion while you&nbsp;type
      </p>

      <p class="h6">
        Use the <code>/key&nbsp;add</code>&nbsp;command to <strong>store up&nbsp;to 15 of your API&nbsp;keys</strong> with&nbsp;GW2Bot
      </p>

      <p class="h6">
        Switch between your API&nbsp;keys by typing&nbsp;<code>/key&nbsp;switch</code> and GW2Bot&nbsp;will provide an interactive list for you to choose&nbsp;from
      </p>

      <a
        class="button button--large"
        :href="$inviteLink"
        target="_blank"
      >Start Using GW2Bot</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SetupSection'
}
</script>

<style lang="scss" scoped>
section {
  text-align: left;
}
h2 {
  margin: 0;
}
a {
  margin: $baseline-rem 0 (-$gutter-rem * 0.25) 0;
}
img {
  float: right;
  margin: $baseline-rem 0 0 0;
  width: 308px;
  height: 290px;
}
</style>
