<template>
  <footer>
    <div class="footer-width page-padding">
      <p><small>GW2Bot created by&nbsp;Maselkov#2365, website created by&nbsp;Penemue#8514 and maintained by&nbsp;Mattt#7551<br>If you want to contribute, see <a class="external" href="https://github.com/Maselkov/GW2Bot" target="_blank">here for the bot</a> and <a class="external" href="https://github.com/brybrant/gw2bot-site" target="_blank">here for the&nbsp;website</a>. Thanks to all&nbsp;contributors.</small></p>

      <p><small>Please read our <nuxt-link to="/terms-of-service">Terms of Service</nuxt-link> and our <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link> before using&nbsp;GW2Bot.<br>Join the <a class="external" :href="$supportServerLink" target="_blank">GW2Bot Discord Server</a> for further&nbsp;support.</small></p>

      <p><small>NCSOFT, ArenaNet, Guild Wars, Guild Wars&nbsp;2, and all associated logos, designs, and composite marks are trademarks or registered trademarks of NCSOFT&nbsp;Corporation.</small></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style lang="scss" scoped>
footer {
  position: relative;
  margin: ($baseline-rem * 2) 0 0 0;
  padding: $baseline-rem 0 ($baseline-rem * 2) 0;
  text-align: center;
  width: 100%;
  background: $grey-1100;
  .dark-mode & {
    background: $grey-250;
  }
}
</style>
