<template>
  <main>
    <div class="feature-media">
      <picture>
        <source
          media="(max-width: 800px)"
          :data-srcset="require(`@/assets/${featureMedia}.webp`)"
          type="image/webp"
        >
        <source
          :data-srcset="require(`@/assets/${featureMedia}--high.webp`)"
          type="image/webp"
        >
        <img
          data-sizes="auto"
          class="feature-media__media lazyload"
          :src="require(`@/assets/${featureMedia}--low.jpg`)"
          :data-src="require(`@/assets/${featureMedia}.jpg`)"
          :data-srcset="`${require(`@/assets/${featureMedia}.jpg`)} 960w, ${require(`@/assets/${featureMedia}--high.jpg`)} 1920w`"
          alt=""
        >
      </picture>
      <!--<video class="feature-media__media" autoplay loop muted playsinline>
        <source src="@/assets/img/feature-images/Sea_Dragon.mp4" type="video/mp4">
      </video>-->
      <div class="feature-media__content page-width page-padding">
        <picture v-if="anniversary">
          <source srcset="@/assets/img/party-quaggan.webp" type="image/webp">
          <img class="party-quaggan" src="@/assets/img/party-quaggan.png" alt="">
        </picture>
        <h1 class="feature-title">
          {{ anniversary ? `Celebrate ${botAge} Years of&nbsp;GW2Bot!` : 'Bring The World&nbsp;of Tyria Into&nbsp;Discord' }}
        </h1>
        <a
          class="feature-button button button--giant"
          :href="$inviteLink"
          target="_blank"
        >Add To Your Server!</a>
      </div>
    </div>
    <!--<div class="page-width page-padding">
      <h2>GW2Bot Demo</h2>

      <div class="bot-demo">
        <video id="demo" autoplay loop muted playsinline>
          <source src="@/assets/img/demo.webm" type="video/webm">
          <source src="@/assets/img/demo.mp4" type="video/mp4">
        </video>
      </div>

      <NuxtLink to="/commands" class="button button--giant">
        View all Commands
      </NuxtLink>
    </div>-->

    <AboutComponent />

    <SetupSection />

    <FeaturesSection />

    <AlertsSection />

    <RolesSection />

    <AutomationSection />
  </main>
</template>

<script>
import '@/node_modules/lazysizes/lazysizes.min.js'
import Rellax from '@/node_modules/rellax/rellax.min.js'

import AboutComponent from '@/components/about'
import SetupSection from '@/components/index-sections/setup'
import FeaturesSection from '@/components/index-sections/features'
import AlertsSection from '@/components/index-sections/alerts'
import RolesSection from '@/components/index-sections/roles'
import AutomationSection from '@/components/index-sections/automation'

const botBirthday = new Date('September 9, 2017 18:18:00 GMT+00:00')

const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth() // 0-11
const currentDay = now.getDate() // 1-31

const yearStart = new Date(currentYear, 0, 1) // 24 * 60 * 60 * 1000 = 864e5
const daysSinceYearStart = Math.floor((now - yearStart) / 864e5) + 1
const currentWeek = Math.ceil(daysSinceYearStart / 7) - 1

const featureMedia = [
  /* january @ 0 */
  'divinity-reach-winter', // (0) 0-7
  'garden-orrery', // (1) 8-14
  'divinity-reach', // (2) 15-21
  'lunar-new-year', // (3) 22-28
  /* february @ 31 */
  'orr-city-collapse', // (4) 29-35
  'bloodtide-coast-drm', // (5) 36-42
  'darkrime-delves', // (6) 43-49
  'aurenes-sanctuary', // (7) 50-56
  /* march @ 59 */
  'wall-ascalon', // (8) 57-63
  'yong-reactor', // (9) 64-70
  'spring', // (10) 71-77
  'pegodas', // (11) 78-84
  /* april @ 90 */
  'spring3', // (12) 85-91
  'orrery', // (13) 92-98
  'mossed', // (14) 99-105
  'vigil-castle', // (15) 106-112
  'guild-initiative-headquarters', // (16) 113-119
  /* may @ 120 */
  'fractals-of-the-mists', // (17) 120-126
  'echovald-skiffs', // (18) 127-133
  'bramble-walls', // (19) 134-140
  'flower-of-death', // (20) 141-147
  /* june @ 151 */
  'lions-arch', // (21) 148-154
  'dragon-bash', // (22) 155-161
  'dragon-bash2', // (23) 162-168
  'summer', // (24) 169-175
  /* july @ 181 */
  'a-shattered-nation', // (25) 176-182
  'divinity-reach-street-view', // (26) 183-189
  'catacomb', // (27) 190-196
  'festival-of-the-four-winds', // (28) 197-203
  'kite-city', // (29) 204-210
  /* august @ 212 */
  'sylvari-canopy', // (30) 211-217
  'regrown-aqueduct-ruins', // (31) 218-224
  'wizards-tower', // (32) 225-231
  'secrets-of-the-obscure', // (33) 232-238
  /* september @ 243 */
  'travel-room', // (34) 239-245
  'steppe', // (35) 246-252
  'laying-to-rest', // (36) 253-259
  'echovald-forest', // (37) 260-266
  /* october @ 273 */
  'autumn', // (38) 267-273
  'victory-or-death', // (39) 274-280
  'halloween', // (40) 281-287
  'halloween2', // (41) 288-294
  'riel-candles', // (42) 295-301
  /* november @ 304 */
  'battle-of-kyhlo', // (43) 302-308
  'heart-of-the-mists', // (44) 309-315
  'night-garden', // (45) 316-322
  'sunqua-peak', // (46) 323-329
  /* december @ 334 */
  'airships', // (47) 330-336
  'temple-of-the-silent-storm', // (48) 337-343
  'wintersday-night', // (49) 344-350
  'infinirarium', // (50) 351-357
  'wintersday', // (51) 358-364
  'wintersday' // (52) 365+
][currentWeek]

export default {
  name: 'IndexPage',
  components: {
    AboutComponent,
    SetupSection,
    FeaturesSection,
    AlertsSection,
    RolesSection,
    AutomationSection
  },
  data () {
    return {
      anniversary: currentMonth === 8 && currentDay > 8 && currentDay < 24,
      botAge: currentYear - botBirthday.getFullYear(),
      featureMedia: `img/feature-images/${featureMedia}`
    }
  },
  mounted () {
    if (this.rellax === undefined) {
      this.rellax = new Rellax('.feature-media__media', { speed: -4 })
    }

    window.removeEventListener('resize', this.resizeRellax)
    window.addEventListener('resize', this.resizeRellax)

    this.responsiveRellax()
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.resizeRellax)
  },
  methods: {
    resizeRellax () {
      clearTimeout(this.rellaxResizeTimer)
      // Debounce the resize event for performance
      this.rellaxResizeTimer = setTimeout(this.responsiveRellax, 250)
    },
    responsiveRellax () {
      window.innerWidth < 801 ? this.rellax.destroy() : this.rellax.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.feature-media {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin-top: -$nav-height;
  padding-top: $nav-height * 0.5;
  height: 100vh;
  min-height: 480px;
  overflow: hidden;
}

.feature-media__media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.666) contrast(0.9);
}

.feature-media__content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  &:before {
    @extend %Psuedo-element;
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 100%;
    height: 480px;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(3px) brightness(0.85) saturate(0.6);
    mask: radial-gradient($black, rgba($black,0.8) 36%, rgba($black,0) 70.71%) 0 0/100% 100%;
  }
}
.feature-title {
  margin: 0;
  color: $white;
  text-shadow: 0 4px  16px $black,
               0 8px  32px rgba($black,.5),
               0 16px 64px rgba($black,.25),
               0 32px 128px rgba($black,.125);
  @include media-query('gt-600') {
    font-size: $xl-font-rem;
    line-height: $xl-line-rem;
  }
}
.feature-button {
  margin-top: $baseline-rem * 2;
  box-shadow: 0 4px  16px $black,
              0 8px  32px rgba($black,.5),
              0 16px 64px rgba($black,.25),
              0 32px 128px rgba($black,.125);
}

.party-quaggan {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 320px;
  max-height: 394px;
  vertical-align: top;
}

section {
  padding: ($baseline-rem * 1.5) 0 ($baseline-rem * 2) 0;
  &:nth-child(2n+1) {
    background: $white;
    .dark-mode & {
      background: $grey-350;
    }
  }
}

// .bot-demo {
//   margin: $baseline-rem 0;
//   video {
//     display: inline-block;
//     border-radius: 8px;
//     width: 100%;
//     max-width: 687px;
//     max-height: 543px;
//     vertical-align: top;
//     box-shadow: $card-shadow;
//     .dark-mode & {
//       box-shadow: $card-shadow--dark;
//     }
//   }
// }
</style>
