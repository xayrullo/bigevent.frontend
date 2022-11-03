<template>
  <div>
    <x-header/>
    <slider :directions="directions"/>
    <directions-slider
      title="Explore Our Collections"
      subtitle="Luxury pieces and accessories that are designed to be treasured."
      :directions="directions"
      class="mt-4"
    />
    <ProductSlider
      :products="products"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <!-- <Banner /> -->
    <ProductTab
      :products="products"
      :category="category"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <Services />
    <Blog />
    <!-- <Instagram /> -->
    <LogoSlider />
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
    <newsletterModel />
  </div>
</template>
<script>
import { mapState } from "vuex";
import quickviewModel from "~/components/widgets/quickview";
import compareModel from "~/components/widgets/compare-popup";
import cartModel from "~/components/cart-model/cart-modal-popup";
import newsletterModel from "~/components/widgets/newsletter-popup";
import Slider from "~/components/home/slider";
import DirectionsSlider from "~/components/home/directions-slider";
import Blog from "~/components/home/blog";
// import Banner from "~/components/home/banner";
import ProductSlider from "./shop/fashion/components/product_slider";
import ProductTab from "./shop/fashion/components/product_tab";
import Services from "./shop/fashion/components/services";
// import Instagram from "./shop/fashion/components/instagram";
import LogoSlider from "./shop/fashion/components/logo_slider";

export default {
  components: {
    Slider,
    DirectionsSlider,
    ProductSlider,
    Blog,
    // Banner,
    ProductTab,
    Services,
    // Instagram,
    LogoSlider,
    quickviewModel,
    compareModel,
    cartModel,
    newsletterModel,
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
  asyncData({ store, params, i18n, route }) {
    store.dispatch('getDirections', { populate: "*"})
  },
  computed: {
    ...mapState({
      productslist: (state) => state.products.productslist,
      directions: state => state.directory.directions
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
