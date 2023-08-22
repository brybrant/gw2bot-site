<template>
  <footer>
    <div class="footer-width page-padding">
      <div class="flexbox-container">
        <div class="flexbox">
          <div class="flexbox__item">
            <a class="github-link" href="https://github.com/Maselkov/GW2Bot" target="_blank">
              <GitHubInlineSVG fit />
            </a>
            <small>
              GW2Bot created by<br><span class="bold-text">@maselkov</span>
            </small>
          </div>

          <div class="flexbox__item">
            <a class="github-link" href="https://github.com/brybrant/gw2bot-site" target="_blank">
              <GitHubInlineSVG fit />
            </a>
            <small>
              Website created by <span class="bold-text">@penemue.</span>&nbsp;and&nbsp;<span class="bold-text">@matt_bryant</span>
            </small>
          </div>
        </div>
      </div>

      <p class="small-text"><small>Thanks to all contributors<LoveheartInlineSVG /><br>Please read our <NuxtLink to="/terms-of-service">Terms&nbsp;of Service</NuxtLink> and our <NuxtLink to="/privacy-policy">Privacy&nbsp;Policy</NuxtLink> before using&nbsp;GW2Bot.<br>Join the <ExternalLink :href="$supportServerLink">GW2Bot Discord Server</ExternalLink> for further&nbsp;support.</small></p>

      <p class="small-text"><small>NCSOFT, ArenaNet, Guild&nbsp;Wars, Guild&nbsp;Wars&nbsp;2, and all associated logos, designs, and composite marks are trademarks or registered trademarks of NCSOFT&nbsp;Corporation.</small></p>
    </div>
  </footer>
</template>

<script>
import GitHubInlineSVG from '@/components/inline-svgs/github'
import LoveheartInlineSVG from '@/components/inline-svgs/loveheart'

export default {
  name: 'FooterComponent',
  components: {
    GitHubInlineSVG,
    LoveheartInlineSVG
  }
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
  color: $grey-350;
  .dark-mode & {
    background: $grey-250;
    color: $grey-1000;
  }
}

.flexbox-container {
  display: inline-block;
  vertical-align: top;
}
.flexbox {
  margin-left: 0;
}
.flexbox__item {
  padding-left: 0;
  width: 50%;
  small {
    display: block;
    line-height: 1.25rem;
  }
}

.github-link {
  display: block;
  margin: 4px auto;
  border-radius: 18px;
  width: 36px;
  height: 36px;
  color: $grey-300;
  &:hover {
    color: $grey-500;
  }
  &:active {
    color: $grey-200;
  }
  .dark-mode & {
    color: $grey-1000;
    &:hover {
      color: $grey-1200;
    }
    &:active {
      color: $grey-900;
    }
  }
}
</style>
