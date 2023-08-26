<template>
  <section class="feature-section">
    <div class="feature-background" aria-hidden="true" />

    <div class="page-width page-padding">
      <h2>Stay Connected and&nbsp;Informed</h2>

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
.feature-background:after {
  background-image: conic-gradient(
    hsl(300, 100%, 76%) 182deg,
    hsl(270, 100%, 78%) 226deg,
    hsl(230, 100%, 92%) 270deg,
    hsl(195, 100%, 74%) 314deg,
    hsl(160, 100%, 70%) 358deg
  );
  .dark-mode & {
    background-image: conic-gradient(
      hsl(300, 16%, 48%) 182deg,
      hsl(270, 25%, 50%) 226deg,
      hsl(230, 30%, 54%) 270deg,
      hsl(190, 24%, 41%) 314deg,
      hsl(160, 24%, 38%) 358deg
    );
  }
}
img {
  width: 303px;
  height: 340px;
}
</style>
