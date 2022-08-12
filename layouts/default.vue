<template>
  <div>
    <HeaderComponent />
    <div class="page">
      <Nuxt />
    </div>
    <DonateComponent />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/header'
import DonateComponent from '@/components/donate'
import FooterComponent from '@/components/footer'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    DonateComponent,
    FooterComponent
  }
}
</script>
