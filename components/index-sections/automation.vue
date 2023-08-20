<template>
  <section>
    <div class="page-width page-padding">
      <h2>Seamless Discord Integration</h2>

      <picture>
        <source
          :data-srcset="require('@/assets/img/bear-quaggan.webp')"
          type="image/webp"
        >
        <img
          data-sizes="auto"
          class="lazyload"
          :data-src="require('@/assets/img/bear-quaggan.png')"
          alt=""
        >
      </picture>

      <p class="h5">
        GW2Bot can be configured to automatically process specific data on your Discord&nbsp;server*
      </p>

      <p class="h6 gutter-top-margin">
        By default, GW2Bot will respond to <a class="external" href="https://wiki.guildwars2.com/wiki/Chat_link_format#Link_type_details" target="_blank">chat&nbsp;links</a>. This can be disabled with&nbsp;<code>/server&nbsp;preview_chat_links</code>
      </p>

      <p class="h6">
        Process EVTC log files from arcdps with&nbsp;<code>/evtc</code> or explore automation options with&nbsp;<code>/evtc_automation</code>
      </p>

      <p class="h6">
        Automatically change all server member names to Guild&nbsp;Wars&nbsp;2 account names with <code>/server&nbsp;force_account_names</code>
      </p>

      <p class="h6">
        <small>*GW2Bot does not record your message contents. Read the <NuxtLink to="/privacy-policy">privacy policy</NuxtLink> for more information</small>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AutomationSection'
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
  height: 320px;
}
</style>
