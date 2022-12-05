<template>
  <div>
    <breadcrumbs :title="product.title" />
    <section>
      <div class="collection-wrapper productdetail">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(image, index) in warehouse.media"
                    :key="index"
                  >
                    <img
                      :src="$tools.getFileUrl(image.url)"
                      :id="product.id"
                      class="img-fluid bg-img"
                      :alt="product.name"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 slider-nav-images">
                  <div v-swiper:mySwiper1="swiperOption1">
                    <div class="swiper-wrapper">
                      <div
                        class="swiper-slide"
                        v-for="(image, index) in warehouse.media"
                        :key="index"
                      >
                        <img
                          :src="$tools.getFileUrl(image.url)"
                          :id="image.id"
                          class="img-fluid bg-img"
                          :alt="image.name"
                          @click="slideTo(index)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 rtl-text">
              <div class="product-right">
                <h2>{{ product.title }}</h2>
                <h4 v-if="product.isSale">
                  <del>{{ $tools.priceFormat(product.price) }}</del>
                  <span>{{ product.discount }}% off</span>
                </h4>
                <h3 v-if="product.isSale">
                  {{ discountedPrice(product) }}
                </h3>
                <h3 v-else>
                  {{ $tools.priceFormat(product.price) }}
                </h3>
                <ul class="color-variant">
                  <li
                    v-bind:class="{
                      active:
                        warehouse.color && warehouse.color.code == variant,
                    }"
                    v-for="(variant, variantIndex) in Color(product.warehouse)"
                    :key="variantIndex"
                  >
                    <a
                      :class="[variant]"
                      v-bind:style="{
                        'background-color': variant,
                      }"
                      @click="sizeVariant(variant, product.warehouse)"
                    ></a>
                  </li>
                </ul>
                <div class="pro_inventory" v-if="product.stock < 8">
                  <p class="active">
                    Hurry! We have only {{ product.stock }} product in stock.
                  </p>
                  <div class="inventory-scroll">
                    <span style="width: 95%"></span>
                  </div>
                </div>
                <div class="product-description border-product">
                  <h6 class="product-title size-text">
                    select size
                    <!-- <span>
                      <a href="javascript:void(0)" v-b-modal.modal-1
                        >size chart</a
                      >
                    </span> -->
                  </h6>
                  <div class="size-box">
                    <ul>
                      <li
                        class="product-title"
                        v-bind:class="{
                          active: checkout.size === size.size.id,
                        }"
                        v-for="(size, index) in warehouse.sizes"
                        :key="index"
                      >
                        <a
                          v-if="size.stock > 0"
                          href="javascript:void(0)"
                          @click="changeSizeVariant(size)"
                          >{{ size.size.name }}</a
                        >
                      </li>
                    </ul>
                  </div>
                  <h5
                    class="avalibility"
                    v-if="checkout.quantity <= product.stock"
                  >
                    <span>In Stock</span>
                  </h5>
                  <h5
                    class="avalibility"
                    v-if="checkout.quantity > product.stock"
                  >
                    <span>Out of Stock</span>
                  </h5>
                  <h6 class="product-title">quantity</h6>
                  <div class="qty-box">
                    <div class="input-group">
                      <span class="input-group-prepend">
                        <button
                          type="button"
                          class="btn quantity-left-minus"
                          data-type="minus"
                          data-field
                          @click="decrement()"
                        >
                          <i class="ti-angle-left"></i>
                        </button>
                      </span>
                      <input
                        type="text"
                        name="quantity"
                        class="form-control input-number"
                        :disabled="checkout.quantity > selectedSize.stock"
                        v-model="checkout.quantity"
                      />
                      <span class="input-group-prepend">
                        <button
                          type="button"
                          class="btn quantity-right-plus"
                          data-type="plus"
                          data-field
                          @click="increment()"
                        >
                          <i class="ti-angle-right"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="product-buttons">
                  <nuxt-link :to="{ path: '/profile/cart' }">
                    <button
                      class="btn btn-solid"
                      title="Add to cart"
                      @click="addToCart(product)"
                      :disabled="checkout.quantity > selectedSize.stock"
                    >
                      Add To Cart
                    </button>
                  </nuxt-link>
                  <button
                    class="btn btn-solid"
                    title="buy now"
                    @click="buyNow(product)"
                    :disabled="checkout.quantity > selectedSize.stock"
                  >
                    Buy Now
                  </button>
                </div>
                <div class="border-product">
                  <h6 class="product-title">product details</h6>
                  <p>
                    {{ product.description.substring(0, 200) + "...." }}
                  </p>
                </div>
                <div class="border-product">
                  <h6 class="product-title">share it</h6>
                  <div class="product-icon">
                    <div class="d-inline-block">
                      <button
                        class="wishlist-btn"
                        @click="addToWishlist(product)"
                      >
                        <i class="fa fa-heart"></i>
                        <span class="title-font">Add To WishList</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="tab-product m-0">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-lg-12">
            <b-tabs card>
              <b-tab title="Description" active>
                <b-card-text>{{ product.description }}</b-card-text>
              </b-tab>
              <b-tab title="Details">
                <b-card-text>
                  <div v-html="product.context"></div>
                </b-card-text>
              </b-tab>
              <b-tab v-if="product.video" title="Video">
                <b-card-text>
                  <div class="mt-3 text-center">
                    <iframe
                      width="560"
                      height="315"
                      :src="product.video"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                    ></iframe>
                  </div>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  <script>
import { mapState, mapGetters } from "vuex";
import Timer from "~/components/widgets/timer";
// import relatedProduct from "~/components/widgets/related-products";
export default {
  auth: false,
  components: {
    Timer,
    // relatedProduct,
  },
  async asyncData({ store, route }) {
    await store.dispatch("products/getDetail", {
      id: route.params.detail,
      query: {
        populate: "*",
      },
    });
  },
  data() {
    return {
      warehouse: {},
      checkout: {
        size: null,
        color: null,
        quantity: 1,
      },
      selectedSize: {},
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 20,
        freeMode: true,
      },
      swiperOption1: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        centeredSlides: false,
      },
    };
  },
  computed: {
    ...mapState({
      currency: (state) => state.products.currency,
      product: (state) => state.products.product,
    }),
    ...mapGetters({
      curr: "products/changeCurrency",
    }),
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    if (this.product.warehouse.length) {
      this.warehouse = this.product.warehouse[0];
      this.checkout.color = this.product.warehouse[0].color.id;
      this.checkout.size = this.product.warehouse[0].sizes[0].size.id;
      this.selectedSize = this.product.warehouse[0].sizes[0];
    }
  },
  methods: {
    priceCurrency: function () {
      this.$store.dispatch("products/changeCurrency");
    },
    addToWishlist() {
      this.$store.dispatch("products/addToWishlist", {
        data: this.product,
      });
    },
    discountedPrice(product) {
      const price = product.price - (product.price * product.discount) / 100;
      return price;
    },
    // Display Unique Color
    Color(warehouse) {
      const uniqColor = [];
      for (let i = 0; i < warehouse.length; i++) {
        if (uniqColor.indexOf(warehouse[i].color.code) === -1) {
          uniqColor.push(warehouse[i].color.code);
        }
      }
      this.stock();
      return uniqColor;
    },
    // add to cart
    addToCart(product, qty) {
      this.$store.dispatch("cart/addToCart", product);
    },
    buyNow: function (product, qty) {
      product.quantity = qty || 1;
      this.$store.dispatch("cart/addToCart", product);
      this.$router.push("/page/account/checkout");
    },
    // Item Count
    increment() {
      if (this.checkout.quantity < this.selectedSize.stock)
        this.checkout.quantity++;
    },
    decrement() {
      if (this.checkout.quantity > 1) this.checkout.quantity--;
    },
    // Change size variant
    changeSizeVariant(data) {
      this.checkout.size = data.size.id;
      this.selectedSize = data;
      this.stock();
    },
    getImgUrl(path) {
      return require("@/assets/images/" + path);
    },
    slideTo(id) {
      this.swiper.slideTo(id, 1000, false);
    },
    sizeVariant(colorCode, warehouse) {
      warehouse.map((item) => {
        if (item.color.code === colorCode) {
          this.warehouse = item;
          this.checkout.color = item.color.id;
        }
      });
    },
    stock() {},
  },
};
</script>
  