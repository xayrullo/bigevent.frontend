<template>
  <div>
    <nuxt id="body-content"/>
    <layout-setting/>
    <back-to-top />
  </div>
</template>

<script>
import LayoutSetting from '../components/widgets/layout-setting'
import BackToTop from '../components/main/back-to-top'
export default {
  head() {
    return {
      title: 'MultiKart Ecommerce | Vuejs Shopping Theme'
    }
  },
  components: {
    BackToTop,
    LayoutSetting
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    })
  }
}
</script>
