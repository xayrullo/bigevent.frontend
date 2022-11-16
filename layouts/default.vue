<template>
  <div>
    <nuxt id="body-content" />
    <layout-setting />
    <back-to-top />
  </div>
</template>

<script>
import LayoutSetting from "../components/widgets/layout-setting";
import BackToTop from "../components/main/back-to-top";
export default {
  head() {
    return {
      title: "BigEVENT Ecommerce",
    };
  },
  asyncData({ store, params, i18n, route }) {},
  components: {
    BackToTop,
    LayoutSetting,
  },
  mounted() {
    this.fetchGlobals();
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 3000);
    });
  },
  methods: {
    async fetchGlobals() {
      await this.$store.dispatch("directory/getGenders");
    },
  },
};
</script>
