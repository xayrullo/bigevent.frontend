<template>
  <div>
    <div class="img-wrapper">
      <div class="lable-block">
        <span class="lable3" v-if="product.new">new</span>
        <span class="lable4" v-if="product.sale">on sale</span>
      </div>
      <div class="front">
        <nuxt-link :to="{ path: '/collections/products/' + product.id }">
          <img
            :src="$tools.getFileUrl(imageSrc.url)"
            :id="product.id"
            class="bg-img"
            height="500"
            width="320"
            style="object-fit: cover"
            :alt="product.name"
          />
        </nuxt-link>
      </div>
      <ul class="product-thumb-list">
        <li
          v-for="(image, index) in media.slice(0, 3)"
          class="grid_thumb_img"
          :class="{ active: imageSrc.id === image.id }"
          :key="index"
          @click="productVariantChange(image)"
        >
          <a href="javascript:void(0);">
            <img :src="$tools.getFileUrl(image.url)" />
          </a>
        </li>
      </ul>
      <div class="cart-info cart-wrap">
        <!-- <button
          data-toggle="modal"
          data-target="#addtocart"
          title="Add to cart"
          @click="addToCart(product)"
          v-b-modal.modal-cart
          variant="primary"
        >
          <i class="ti-shopping-cart"></i>
        </button> -->
        <a v-if="$auth.loggedIn" href="javascript:void(0)" title="Wishlist">
          <i
            class="ti-heart"
            aria-hidden="true"
            @click="addToWishlist(product)"
          ></i>
        </a>
        <!-- <a
          href="javascript:void(0)"
          title="Quick View"
          @click="showQuickview(product)"
          v-b-modal.modal-lg
          variant="primary"
        >
          <i class="ti-search" aria-hidden="true"></i>
        </a>
        <a
          href="javascript:void(0)"
          title="Comapre"
          @click="addToCompare(product)"
          v-b-modal.modal-compare
          variant="primary"
        >
          <i class="ti-reload" aria-hidden="true"></i>
        </a> -->
      </div>
    </div>
    <div class="product-detail">
      <div class="rating">
        <star-rating
          :star-size="15"
          :rating="product.rate"
          :increment="0.01"
          :read-only="true"
        />
      </div>
      <nuxt-link :to="{ path: 'products/' + product.id }">
        <h6>{{ product.title }}</h6>
      </nuxt-link>
      <p>{{ product.description }}</p>
      <h4 v-if="product.isSale">
        {{ discountedPrice(product) | currency }}
        <del>{{ product.price | currency }}</del>
      </h4>
      <h4 v-else>
        {{ $tools.priceFormat(product.price) | currency }}
      </h4>
      <!-- <ul class="color-variant" v-if="product.isColor"> -->
      <ul class="color-variant">
        <li
          v-for="(variant, variantIndex) in Color(product.warehouse)"
          :key="variantIndex"
        >
          <a
            @click="productColorchange(variant, product.warehouse)"
            :class="[variant]"
            v-bind:style="{ 'background-color': variant }"
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script>
import StarRating from "vue-star-rating";
import { mapState, mapGetters } from "vuex";
export default {
  props: ["product", "index", "isColor"],
  components: {
    StarRating,
  },
  data() {
    return {
      imageSrc: {},
      media: [],
      quickviewProduct: {},
      compareProduct: {},
      cartProduct: {},
      showquickview: false,
      showCompareModal: false,
      cartval: false,
      variants: {
        productId: "",
        image: "",
      },
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  filters: {
    currency(price) {
      return price + " sum";
    },
  },
  mounted() {
    this.media = this.product.warehouse[0].media;
    this.imageSrc = this.media[0];
  },
  computed: {
    ...mapState({
      productslist: (state) => state.products.productslist,
    }),
    ...mapGetters({
      curr: "products/changeCurrency",
    }),
  },
  methods: {
    getImgUrl(path) {
      return require("@/assets/images/" + path);
    },
    addToCart(product) {
      this.$snotify.success("Successfully added to cart");
      this.$store.dispatch("cart/addToCart", product);
    },
    addToWishlist(product) {
      this.$store.dispatch("products/addToWishlist", {
        data: product,
      });
    },
    showQuickview: function (productData) {
      this.showquickview = true;
      this.quickviewProduct = productData;
      this.$emit("openquickview", this.showquickview, this.quickviewProduct);
    },
    addToCompare: function (product) {
      this.showCompareModal = true;
      this.compareProduct = product;
      this.$emit(
        "showCompareModal",
        this.showCompareModal,
        this.compareProduct
      );
      this.$store.dispatch("products/addToCompare", product);
    },
    Color(warehouse) {
      const uniqColor = [];
      for (let i = 0; i < warehouse.length; i++) {
        if (uniqColor.indexOf(warehouse[i].color.code) === -1) {
          uniqColor.push(warehouse[i].color.code);
        }
      }
      return uniqColor;
    },
    productColorchange(colorCode, warehouse) {
      warehouse.map((item) => {
        if (item.color.code === colorCode) {
          this.media = item.media;
          this.imageSrc = this.media[0];
        }
      });
    },
    productVariantChange(imgsrc) {
      this.imageSrc = imgsrc;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
      this.$emit("alertseconds", this.dismissCountDown);
    },
    discountedPrice(product) {
      const price = product.price - (product.price * product.discount) / 100;
      return price;
    },
  },
};
</script>
  