<template>
  <div>
    <nuxt id="body-content" />
    <layout-setting />
    <back-to-top />
    <vue-snotify />
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
  async fetch() {
    if (!process.client) {
      return;
    }
    const token = localStorage.getItem("auth._token.local");
    if (token !== "false" && token)
      await this.$auth.setUserToken(localStorage.getItem("auth._token.local"));
    this.fetchGlobals();
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 3000);
    });
  },
  methods: {
    async fetchGlobals() {
      await this.$store.dispatch("directory/getGenders");
      if (this.$auth.loggedIn) {
        await this.$store.dispatch("products/getWishProducts", {
          populate:
            "product, product.brand, product.country, product.colors, product.sizes, product.direction, product.company",
          filters: {
            $and: [
              {
                user: {
                  id: this.$auth.user.id,
                },
              },
            ],
          },
        });
      }
    },
  },
};
</script>
