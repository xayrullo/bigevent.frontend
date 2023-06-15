<template>
  <div>
    <x-header />
    <slider :directions="directions" />
    <directions-slider
      title="Explore Our Collections"
      subtitle="Luxury pieces and accessories that are designed to be treasured."
      :directions="directions"
      class="mt-4"
    />
    <special-products
      :products="products"
      :category="category"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <companies />
    <!-- <Services /> -->
    <Blog />
    <x-footer />
    <quickviewModel
      :openModal="showquickviewmodel"
      :productData="quickviewproduct"
    />
    <compareModel
      :openCompare="showcomparemodal"
      :productData="comapreproduct"
      @closeCompare="closeCompareModal"
    />
    <cartModel
      :openCart="showcartmodal"
      :productData="cartproduct"
      @closeCart="closeCartModal"
      :products="products"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import quickviewModel from "~/components/widgets/quickview";
import compareModel from "~/components/widgets/compare-popup";
import cartModel from "~/components/cart-model/cart-modal-popup";
import Slider from "~/components/home/slider";
import DirectionsSlider from "~/components/home/directions-slider";
import SpecialProducts from "~/components/home/special-products";
import Companies from "~/components/home/companies";
import Blog from "~/components/home/blog";

export default {
  auth: false,
  components: {
    Companies,
    Slider,
    DirectionsSlider,
    Blog,
    SpecialProducts,
    quickviewModel,
    compareModel,
    cartModel,
  },
  data() {
    return {
      products: [],
      category: [],
      showquickviewmodel: false,
      showcomparemodal: false,
      showcartmodal: false,
      quickviewproduct: {},
      comapreproduct: {},
      cartproduct: {},
    };
  },
  async asyncData({ store, params, i18n, route }) {
    await store.dispatch("directory/getDirections", { populate: "*" });
    await store.dispatch("products/getSpecialProducts", {
      populate: "*",
      sort: ["createdAt:desc"],
    });
    await store.dispatch("blog/getBlogs", {
      populate: "*",
      sort: ["createdAt:desc"],
    });
    await store.dispatch("company/getCompanies", { populate: "*" });
  },
  computed: {
    ...mapState({
      productslist: (state) => state.products.productslist,
      directions: (state) => state.directory.directions,
    }),
  },
  mounted() {
    this.productsArray();
  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === "fashion") {
          this.products.push(item);
          item.collection.map((i) => {
            const index = this.category.indexOf(i);
            if (index === -1) this.category.push(i);
          });
        }
      });
    },
    showQuickview(item, productData) {
      this.showquickviewmodel = item;
      this.quickviewproduct = productData;
    },
    showCoampre(item, productData) {
      this.showcomparemodal = item;
      this.comapreproduct = productData;
    },
    closeCompareModal(item) {
      this.showcomparemodal = item;
    },
    showCart(item, productData) {
      this.showcartmodal = item;
      this.cartproduct = productData;
    },
    closeCartModal(item) {
      this.showcartmodal = item;
    },
  },
};
</script>
