<template>
  <section class="feature-section">
    <div class="feature-background" aria-hidden="true" />

    <div class="page-width page-padding">
      <h2>Seamless Discord Integration</h2>

      <nuxt-img
        loading="lazy"
        format="webp"
        quality="75"
        width="308"
        height="320"
        src="/img/bear-quaggan.png"
        alt=""
      />

      <p class="h5">
        GW2Bot can be configured to automatically process specific data on your Discord&nbsp;server*
      </p>

      <p class="h6 gutter-top-margin">
        By default, GW2Bot will respond to Guild&nbsp;Wars&nbsp;2 <ExternalLink href="https://wiki.guildwars2.com/wiki/Chat_link_format#Link_type_details">chat&nbsp;links</ExternalLink>. This behavior can be disabled with the <code>/server&nbsp;preview_chat_links</code>&nbsp;command
      </p>

      <p class="h6">
        Process EVTC log files from arcdps with&nbsp;<code>/evtc</code> or explore automatic processing options with&nbsp;<code>/evtc_automation</code>
      </p>

      <p class="h6">
        Automatically change all server member names to Guild&nbsp;Wars&nbsp;2 account names by using the <code>/server&nbsp;force_account_names</code>&nbsp;command
      </p>

      <p class="h6">
        <small>*GW2Bot does not record your message contents. Read the <NuxtLink to="/privacy-policy">privacy policy</NuxtLink> for more&nbsp;information</small>
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
.feature-background:after {
  background-image: conic-gradient(
    hsl(118, 100%, 44%) 182deg,
    hsl(90, 100%, 84%) 270deg,
    hsl(62, 100%, 36%) 358deg
  );
  .dark-mode & {
    background-image: conic-gradient(
      hsl(118, 26%, 39%) 182deg,
      hsl(90, 18%, 41%) 270deg,
      hsl(62, 42%, 33%) 358deg
    );
  }
}
img {
  width: 308px;
  height: 320px;
}
</style>
