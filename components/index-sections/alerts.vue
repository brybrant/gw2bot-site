<template>
  <section>
    <div class="page-width page-padding">
      <h2>Stay Connected and Informed</h2>

      <picture>
        <source
          :data-srcset="require('@/assets/img/bubble-quaggan.webp')"
          type="image/webp"
        >
        <img
          data-sizes="auto"
          class="lazyload"
          :data-src="require('@/assets/img/bubble-quaggan.png')"
          alt=""
        >
      </picture>

      <p class="h5">
        Subscribe to automatic reminders &amp; notifications&nbsp;for effortless&nbsp;engagement
      </p>

      <p class="h6 gutter-top-margin">
        Use the <code>/reminder</code> commands to receive personal&nbsp;alerts when specific events are about to&nbsp;happen
      </p>

      <p class="h6">
        Configure GW2Bot to announce news, daily achievements, and&nbsp;updates to your server with&nbsp;<code>/notifier</code>&nbsp;commands
      </p>

      <p class="h6">
        <strong>Track the cost of gems</strong> with the&nbsp;<code>/gem&nbsp;track</code> command to <strong>capitalize on price&nbsp;fluctuations</strong>
      </p>

      <a
        class="button button--large"
        :href="$inviteLink"
        target="_blank"
      >Add GW2Bot to Your Server</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AlertsSection'
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
  margin: $baseline-rem 0 0 $baseline-rem;
  width: 303px;
  height: 340px;
}
</style>
