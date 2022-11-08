<template>
  <div>
    <breadcrumbs :title="product.attributes.title" />
    <section>
      <div class="collection-wrapper productdetail">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div v-swiper:mySwiper="swiperOption" ref="mySwiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(product, index) in product.attributes.media.data"
                    :key="index"
                  >
                    <img
                      :src="$tools.getFileUrl(product.attributes.url)"
                      :id="product.id"
                      class="img-fluid bg-img"
                      :alt="product.attributes.name"
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
                        v-for="(product, index) in product.attributes.media
                          .data"
                        :key="index"
                      >
                        <img
                          :src="$tools.getFileUrl(product.attributes.url)"
                          :id="product.id"
                          class="img-fluid bg-img"
                          :alt="product.attributes.name"
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
                <h2>{{ product.attributes.title }}</h2>
                <h4 v-if="product.attributes.isSale">
                  <del>{{ product.attributes.price }}</del>
                  <span>{{ product.attributes.discount }}% off</span>
                </h4>
                <h3 v-if="product.attributes.isSale">
                  {{ discountedPrice(product) }}
                </h3>
                <h3 v-else>
                  {{ product.attributes.price }}
                </h3>
                <ul class="color-variant">
                  <li
                    v-bind:class="{ active: activeColor == variant }"
                    v-for="(variant, variantIndex) in Color(
                      product.attributes.colors
                    )"
                    :key="variantIndex"
                  >
                    <a
                      :class="[variant]"
                      v-bind:style="{
                        'background-color': color.attributes.code,
                      }"
                      @click="
                        sizeVariant(
                          product.attributes.colors[variantIndex].id,
                          variantIndex,
                          variant
                        )
                      "
                    ></a>
                  </li>
                </ul>
                <div class="pro_inventory" v-if="product.attributes.stock < 8">
                  <p class="active">
                    Hurry! We have only {{ product.attributes.stock }} product
                    in stock.
                  </p>
                  <div class="inventory-scroll">
                    <span style="width: 95%"></span>
                  </div>
                </div>
                <div class="product-description border-product">
                  <h6 class="product-title size-text">
                    select size
                    <span>
                      <a href="javascript:void(0)" v-b-modal.modal-1
                        >size chart</a
                      >
                    </span>
                  </h6>
                  <div class="size-box">
                    <ul>
                      <li
                        class="product-title"
                        v-bind:class="{ active: selectedSize == size }"
                        v-for="(size, index) in size"
                        :key="index"
                      >
                        <a
                          href="javascript:void(0)"
                          @click="changeSizeVariant(size)"
                          >{{ size }}</a
                        >
                      </li>
                    </ul>
                  </div>
                  <h5
                    class="avalibility"
                    v-if="counter <= product.attributes.stock"
                  >
                    <span>In Stock</span>
                  </h5>
                  <h5
                    class="avalibility"
                    v-if="counter > product.attributes.stock"
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
                        :disabled="counter > product.attributes.stock"
                        v-model="counter"
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
                  <nuxt-link :to="{ path: '/page/account/cart' }">
                    <button
                      class="btn btn-solid"
                      title="Add to cart"
                      @click="addToCart(product, counter)"
                      :disabled="counter > product.attributes.stock"
                    >
                      Add To Cart
                    </button>
                  </nuxt-link>
                  <button
                    class="btn btn-solid"
                    title="buy now"
                    @click="buyNow(product, counter)"
                    :disabled="counter > product.attributes.stock"
                  >
                    Buy Now
                  </button>
                </div>
                <div class="border-product">
                  <h6 class="product-title">product details</h6>
                  <p>
                    {{
                      product.attributes.description.substring(0, 200) + "...."
                    }}
                  </p>
                </div>
                <div class="border-product">
                  <h6 class="product-title">share it</h6>
                  <div class="product-icon">
                    <ul class="product-social">
                      <li>
                        <a href="#">
                          <i class="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-google-plus"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-rss"></i>
                        </a>
                      </li>
                    </ul>
                    <form class="d-inline-block">
                      <button
                        class="wishlist-btn"
                        @click="addToWishlist(product)"
                      >
                        <i class="fa fa-heart"></i>
                        <span class="title-font">Add To WishList</span>
                      </button>
                    </form>
                  </div>
                </div>
                <div class="border-product">
                  <h6 class="product-title">Time Reminder</h6>
                  <Timer date="December 20, 2020" />
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
                <b-card-text>{{ product.attributes.description }}</b-card-text>
              </b-tab>
              <b-tab title="Details">
                <b-card-text>
                  {{ product.attributes.description }}
                  <div class="single-product-tables">
                    <table>
                      <tbody>
                        <tr>
                          <td>Febric</td>
                          <td>Chiffon</td>
                        </tr>
                        <tr>
                          <td>Color</td>
                          <td>Red</td>
                        </tr>
                        <tr>
                          <td>Material</td>
                          <td>Crepe printed</td>
                        </tr>
                      </tbody>
                    </table>
                    <table>
                      <tbody>
                        <tr>
                          <td>Length</td>
                          <td>50 Inches</td>
                        </tr>
                        <tr>
                          <td>Size</td>
                          <td>S, M, L .XXL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card-text>
              </b-tab>
              <b-tab title="Video">
                <b-card-text>
                  <div class="mt-3 text-center">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/BUWzX78Ye_8"
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
      counter: 1,
      activeColor: "",
      selectedSize: "",
      qty: "",
      size: [],
      productTYpe: "",
      productId: "",
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
      // product: "products/getProduct"
    }),
    getDetail: function () {
      return this.$store.getters["products/getProduct"];
    },
    // product: function () {
    //   return this.$store.getters["products/getProduct"];
    // },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    // For displaying default color and size on pageload
    // this.uniqColor = this.getDetail.variants[0].color;
    // this.sizeVariant(this.getDetail.variants[0].image_id);
    // // Active default color
    // this.activeColor = this.uniqColor;
    // this.changeSizeVariant(this.getDetail.variants[0].size);
  },
  methods: {
    priceCurrency: function () {
      this.$store.dispatch("products/changeCurrency");
    },
    addToWishlist: function (product) {
      this.$store.dispatch("products/addToWishlist", product);
    },
    discountedPrice(product) {
      const price =
        product.attributes.price -
        (product.attributes.price * product.attributes.discount) / 100;
      return price;
    },
    // Display Unique Color
    Color(variants) {
      const uniqColor = [];
      for (let i = 0; i < variants.length; i++) {
        if (uniqColor.indexOf(variants[i].attributes.code) === -1) {
          uniqColor.push(variants[i].attributes.code);
        }
      }
      this.stock();
      return uniqColor;
    },
    // add to cart
    addToCart: function (product, qty) {
      product.quantity = qty || 1;
      this.$store.dispatch("cart/addToCart", product);
    },
    buyNow: function (product, qty) {
      product.quantity = qty || 1;
      this.$store.dispatch("cart/addToCart", product);
      this.$router.push("/page/account/checkout");
    },
    // Item Count
    increment() {
      this.counter++;
    },
    decrement() {
      if (this.counter > 1) this.counter--;
    },
    // Change size variant
    changeSizeVariant(variant) {
      this.selectedSize = variant;
      this.stock();
    },
    getImgUrl(path) {
      return require("@/assets/images/" + path);
    },
    slideTo(id) {
      this.swiper.slideTo(id, 1000, false);
    },
    sizeVariant(id, slideId, color) {
      this.swiper.slideTo(slideId, 1000, false);
      this.size = [];
      this.activeColor = color;
      // this.product.attributes.colors.filter((item) => {
      //   if (id === item.id) {
      //     this.size.push(item);
      //   }
      // });
    },
    stock() {
      // this.product.attributes.colors.filter((item) => {
      //   if (
      //     this.activeColor === item.attributes.code &&
      //     this.selectedSize === item.attributes.size
      //   ) {
      //     this.qty = item.attributes.qty;
      //   }
      // });
    },
  },
};
</script>
  