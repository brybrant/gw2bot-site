<template>
  <div class="top-bar" @mouseover="topBarHover = true" @mouseleave="topBarHover = false">
    <div class="top-bar__shadow">
      <div
        v-if="$route.name === 'index' && topBarBackgroundOpacity < 1"
        class="top-bar__filter"
      />
      <div
        class="top-bar__background"
        :class="{'top-bar__background--solid': $route.name !== 'index'}"
        :style="[ topBarHover || navActive || userMenuActive ? null : { 'opacity': topBarBackgroundOpacity } ]"
      />
      <div class="page-width page-padding">
        <NuxtLink class="top-bar__logo" to="/">
          <GW2BotLogo /><!--
            Remove whitespace between logo and wordmark (inline-block elements)
          --><div class="top-bar__logo-wordmark">
            <span class="top-bar__logo-wordmark-stroke" aria-hidden="true">
              G<span class="two-kern">W</span>2Bot
            </span>
            <span class="top-bar__logo-wordmark-color">
              G<span class="two-kern">W</span>2Bot
            </span>
            <span class="sr-only"> - A Discord Bot for Guild Wars 2</span>
          </div>
        </NuxtLink>

        <div class="top-bar__toggles">
          <div class="top-bar__toggle">
            <button
              class="dark-mode-button"
              :class="$colorMode.value=='dark' ? 'active' : ''"
              :title="$colorMode.value=='dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="$colorMode.value=='dark' ? ($colorMode.preference='light') : ($colorMode.preference='dark')"
            />
          </div>

          <div class="top-bar__toggle top-bar__toggle--navigation">
            <button
              class="main-nav-button"
              :class="{active: navActive}"
              :title="navActive ? 'Hide navigation' : 'Show navigation'"
              @click="navActive = !navActive"
            >
              <div />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mobile-navigation-cover"
      :class="{active: navActive}"
      @click="navActive = false"
    />

    <div class="page-width">
      <div class="main-nav__container" :class="{active: navActive}">
        <nav class="main-nav" aria-label="Navigation" itemscope itemtype="http://www.schema.org/SiteNavigationElement">
          <NuxtLink
            to="/"
            class="main-nav__link"
            active-class="active"
            itemprop="url"
            exact
            @click.native="navActive = userMenuActive = false"
          >
            <span class="main-nav__link-name">Home</span>
          </NuxtLink>
          <NuxtLink
            to="/commands"
            class="main-nav__link"
            active-class="active"
            itemprop="url"
            @click.native="navActive = userMenuActive = false"
          >
            <span class="main-nav__link-name">Commands</span>
          </NuxtLink>
          <NuxtLink
            to="/faq"
            class="main-nav__link"
            active-class="active"
            itemprop="url"
            @click.native="navActive = userMenuActive = false"
          >
            <span class="main-nav__link-name">
              F.A<span class="q-kern">.</span>Q
            </span>
          </NuxtLink>
          <a
            class="main-nav__link"
            :href="$supportServerLink"
            target="_blank"
            itemprop="url"
          >
            <span class="main-nav__link-name">Support</span>
          </a>
          <a
            v-if="!$auth.loggedIn"
            href="#"
            class="main-nav__link"
            @click="$auth.loginWith('discord')"
          >
            <span class="main-nav__link-name">Login</span>
          </a>
          <div
            v-if="$auth.loggedIn"
            class="main-nav__group"
            :class="{active: userMenuActive}"
          >
            <button class="main-nav__link" :class="{active: userMenuActive}" @click="userMenuActive = !userMenuActive">
              <span class="main-nav__link-name">
                <img
                  class="main-nav__user-image"
                  :src="`https://cdn.discordapp.com/avatars/${$auth.user.id}/${$auth.user.avatar}.webp?size=64`"
                >User<DropdownInlineSVG />
              </span>
            </button>
            <div v-if="$auth.loggedIn" class="main-nav__sub-menu" :class="{active: userMenuActive}">
              <div class="main-nav__user-info small-text">
                <span class="main-nav__user-name">
                  {{ $auth.user.global_name }}
                </span>
              </div>
              <NuxtLink
                to="/logs"
                class="main-nav__link"
                active-class="active"
                @click.native="navActive = userMenuActive = false"
              >
                <span class="main-nav__link-name">Encounter Logs</span>
              </NuxtLink>
              <a href="#" class="main-nav__link" @click="$auth.logout()">
                <span class="main-nav__link-name">Logout</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import DropdownInlineSVG from '@/components/inline-svgs/dropdown'
import GW2BotLogo from '@/components/inline-svgs/gw2bot'

export default {
  name: 'HeaderComponent',
  components: {
    DropdownInlineSVG,
    GW2BotLogo
  },
  data () {
    return {
      navActive: false,
      topBarBackgroundOpacity: 1,
      topBarHover: false,
      userMenuActive: false
    }
  },
  mounted () {
    window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.handleScroll()
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.topBarBackgroundOpacity = Math.min(
        0.67 + (Math.round((window.scrollY / window.innerHeight) * 100) / 300),
        1
      )
    }
  }
}
</script>
