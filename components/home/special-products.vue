<template>
  <div>
    <div class="title1 section-t-space">
      <h4>{{ subtitle }}</h4>
      <h2 class="title-inner1">{{ title }}</h2>
    </div>
    <section class="section-b-space p-t-0 ratio_asos">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="theme-tab">
              <b-tabs content-class="mt-3">
                <b-tab
                  :title="collection.name"
                  v-for="(collection, index) in collections"
                  :key="index"
                >
                  <div class="no-slider row">
                    <div
                      class="product-box"
                      v-for="(product, index) in products.slice(0, 8)"
                      :key="index"
                    >
                      <product-box
                        @opencartmodel="showCartModal"
                        @showCompareModal="showcomparemodal"
                        @openquickview="showquickview"
                        @showalert="alert"
                        @alertseconds="alert"
                        :product="product"
                        :index="index"
                        :isColor="false"
                      />
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-alert
      :show="dismissCountDown"
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="alert"
    >
      <p>Product Is successfully added to your wishlist.</p>
    </b-alert>
  </div>
</template>
  <script type="text/javascript">
import productBox1 from "@/components/product-box/product-box1";
import { mapGetters } from "vuex";
export default {
  components: {
    productBox1,
  },
  data() {
    return {
      collections: [
        {
          id: 1,
          name: "New Products",
        },
        {
          id: 2,
          name: "On Sale",
        },
        {
          id: 3,
          name: "Top Products",
        },
      ],
      title: "special products",
      subtitle: "exclusive products",
      showCart: false,
      showquickviewmodel: false,
      showcomapreModal: false,
      quickviewproduct: {},
      comapreproduct: {},
      cartproduct: {},
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  computed: {
    ...mapGetters({
      products: "products/getSpecialProducts",
    }),
  },
  methods: {
    getCategoryProduct(collection) {
      return this.products.filter((item) => {
        if (item.collection.find((i) => i === collection)) {
          return item;
        }
      });
    },
    alert(item) {
      this.dismissCountDown = item;
    },
    showCartModal(item, productData) {
      this.showCart = item;
      this.cartproduct = productData;
      this.$emit("openCart", this.showCart, this.cartproduct);
    },
    showquickview(item, productData) {
      this.showquickviewmodel = item;
      this.quickviewproduct = productData;
      this.$emit(
        "openQuickview",
        this.showquickviewmodel,
        this.quickviewproduct
      );
    },
    showcomparemodal(item, productData) {
      this.showcomapreModal = item;
      this.comapreproduct = productData;
      this.$emit("openCompare", this.showcomapreModal, this.comapreproduct);
    },
  },
};
</script>
  