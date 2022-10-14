<template>
  <div>
    <x-header />
    <slider />
    <directions-slider class="mt-4"/>
    <CollectionBanner />
    <ProductSlider :products="products" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <Banner />
    <ProductTab :products="products" :category="category" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <Services />
    <Blog />
    <Instagram />
    <LogoSlider />
    <x-footer />
    <quickviewModel :openModal="showquickviewmodel" :productData="quickviewproduct" />
    <compareModel :openCompare="showcomparemodal" :productData="comapreproduct" @closeCompare="closeCompareModal" />
    <cartModel :openCart="showcartmodal" :productData="cartproduct" @closeCart="closeCartModal" :products="products" />
    <newsletterModel />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import quickviewModel from '~/components/widgets/quickview'
import compareModel from '~/components/widgets/compare-popup'
import cartModel from '~/components/cart-model/cart-modal-popup'
import newsletterModel from '~/components/widgets/newsletter-popup'
import Slider from '~/components/home/slider'
import DirectionsSlider from '~/components/home/directions-slider'
import CollectionBanner from './shop/fashion/components/collection_banner'
import ProductSlider from './shop/fashion/components/product_slider'
import Banner from './shop/fashion/components/banner'
import ProductTab from './shop/fashion/components/product_tab'
import Services from './shop/fashion/components/services'
import Blog from './shop/fashion/components/blog'
import Instagram from './shop/fashion/components/instagram'
import LogoSlider from './shop/fashion/components/logo_slider'

export default {
  components: {
    Slider,
    DirectionsSlider,
    CollectionBanner,
    ProductSlider,
    Banner,
    ProductTab,
    Services,
    Blog,
    Instagram,
    LogoSlider,
    quickviewModel,
    compareModel,
    cartModel,
    newsletterModel
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
      cartproduct: {}
    }
  },
  computed: {
    ...mapState({
      productslist: state => state.products.productslist
    })
  },
  mounted() {
    this.productsArray()
  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === 'fashion') {
          this.products.push(item)
          item.collection.map((i) => {
            const index = this.category.indexOf(i)
            if (index === -1) this.category.push(i)
          })
        }
      })
    },
    showQuickview(item, productData) {
      this.showquickviewmodel = item
      this.quickviewproduct = productData
    },
    showCoampre(item, productData) {
      this.showcomparemodal = item
      this.comapreproduct = productData
    },
    closeCompareModal(item) {
      this.showcomparemodal = item
    },
    showCart(item, productData) {
      this.showcartmodal = item
      this.cartproduct = productData
    },
    closeCartModal(item) {
      this.showcartmodal = item
    }
  }
}
</script>
