<template>
  <div>
    <breadcrumbs title="Wedding Dresses" />
    <section class="section-b-space ratio_asos">
      <div class="collection-wrapper">
        <div class="container">
          <div class="row">
            <div class="collection-content col">
              <div class="page-main-content">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="top-banner-wrapper">
                      <a href="#">
                        <img
                          :src="$tools.getImgUrl('banner/wedding-dresses.webp')"
                          class="img-fluid"
                          alt
                        />
                      </a>
                      <div class="top-banner-content small-section">
                        <h4>fashion</h4>
                        <p>
                          Handmade and crafted to perfection, our effortlessly
                          beautiful wedding gowns - featuring our signature
                          flattering silhouettes - are designed for comfort,
                          luxury and movement. You'll never want to take yours
                          off.
                        </p>
                      </div>
                    </div>
                    <div class="collection-product-wrapper">
                      <div class="product-top-filter">
                        <div class="row">
                          <div class="col-12">
                            <div class="product-filter-content">
                              <div class="search-count">
                                <h5>
                                  Showing Products 1-12 of
                                  {{ products.length }} Result
                                </h5>
                              </div>
                              <div class="product-page-filter">
                                <select @change="onChangeSort($event)">
                                  <option value="all">Sorting Items</option>
                                  <option value="a-z">
                                    Alphabetically, A-Z
                                  </option>
                                  <option value="z-a">
                                    Alphabetically, Z-A
                                  </option>
                                  <option value="low">
                                    price, low to high
                                  </option>
                                  <option value="high">
                                    price, high to low
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="product-wrapper-grid"
                      >
                        <div class="row">
                          <div class="col-sm-12">
                            <div
                              class="
                                text-center
                                section-t-space section-b-space
                              "
                              v-if="products.length == 0"
                            >
                              <img
                                :src="$tools.getImgUrl('empty-search.jpg')"
                                class="img-fluid"
                                alt
                              />
                              <h3 class="mt-3">
                                Sorry! Couldn't find the product you were
                                looking For!!!
                              </h3>
                              <div class="col-12 mt-3">
                                <nuxt-link
                                  :to="{ path: '/' }"
                                  class="btn btn-solid"
                                  >continue shopping</nuxt-link
                                >
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-grid-box col-lg-3 col-md-4 col-sm-6"
                            v-for="(product, index) in products"
                            :key="index"
                            v-show="setPaginate(index)"
                          >
                            <div class="product-box">
                              <product-box
                                @opencartmodel="showCart"
                                @showCompareModal="showCoampre"
                                @openquickview="showQuickview"
                                @showalert="alert"
                                @alertseconds="alert"
                                :product="product"
                                :index="index"
                                :isColor="false"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="product-pagination mb-0"
                        v-if="products.length > this.paginate"
                      >
                        <pagination :pages="pages" :length="products.length"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
import { mapState, mapGetters } from "vuex";
import quickviewModel from "~/components/widgets/quickview";
import compareModel from "~/components/widgets/compare-popup";
import cartModel from "~/components/cart-model/cart-modal-popup";
export default {
  components: {
    quickviewModel,
    compareModel,
    cartModel,
  },
  data() {
    return {
      current: 1,
      paginate: 18,
      paginateRange: 3,
      pages: [],
      paginates: "",
      showquickviewmodel: false,
      showcomparemodal: false,
      showcartmodal: false,
      quickviewproduct: {},
      comapreproduct: {},
      cartproduct: {},
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  asyncData({ store }) {
    store.dispatch('products/getProducts', {
      populate: "*",
    })
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    })
  },
  mounted() {
    this.getPaginate();
    this.updatePaginate(1);
  },
  methods: {
    onChangeSort(event) {
      if (event.target.value === "a-z") {
        this.products.sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          } else if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      } else if (event.target.value === "z-a") {
        this.products.sort(function (a, b) {
          if (a.title > b.title) {
            return -1;
          } else if (a.title < b.title) {
            return 1;
          }
          return 0;
        });
      } else if (event.target.value === "low") {
        this.products.sort(function (a, b) {
          if (a.price < b.price) {
            return -1;
          } else if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
      } else if (event.target.value === "high") {
        this.products.sort(function (a, b) {
          if (a.price > b.price) {
            return -1;
          } else if (a.price < b.price) {
            return 1;
          }
          return 0;
        });
      }
    },
    getPaginate() {
      this.paginates = Math.round(this.products.length / this.paginate);
      this.pages = [];
      for (let i = 0; i < this.paginates; i++) {
        this.pages.push(i + 1);
      }
    },
    setPaginate(i) {
      if (this.current === 1) {
        return i < this.paginate;
      } else {
        return (
          i >= this.paginate * (this.current - 1) &&
          i < this.current * this.paginate
        );
      }
    },
    updatePaginate(i) {
      this.current = i;
      let start = 0;
      let end = 0;
      if (this.current < this.paginateRange - 1) {
        start = 1;
        end = start + this.paginateRange - 1;
      } else {
        start = this.current - 1;
        end = this.current + 1;
      }
      if (start < 1) {
        start = 1;
      }
      if (end > this.paginates) {
        end = this.paginates;
      }
      this.pages = [];
      for (let i = start; i <= end; i++) {
        this.pages.push(i);
      }
      return this.pages;
    },
    alert(item) {
      this.dismissCountDown = item;
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
  