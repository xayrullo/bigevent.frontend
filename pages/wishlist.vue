<template>
  <div>
    <x-header />
    <breadcrumbs title="wishlist" />
    <section class="wishlist-section section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <table
              class="table cart-table table-responsive-xs"
              v-if="wishlist.length"
            >
              <thead>
                <tr class="table-head">
                  <th scope="col">image</th>
                  <th scope="col">product name</th>
                  <th scope="col">price</th>
                  <th scope="col">created country</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody v-for="(item, index) in wishlist" :key="index">
                <tr>
                  <td>
                    <nuxt-link
                      :to="{ path: `/collections/products/${item.id}` }"
                      v-if="item.attributes.media.data"
                    >
                      <img
                        :src="
                          $tools.getFileUrl(
                            item.attributes.media.data[0].attributes.formats
                              .thumbnail.url
                          )
                        "
                        :alt="item.attributes.title"
                      />
                    </nuxt-link>
                  </td>
                  <td>
                    <nuxt-link
                      :to="{ path: `/collections/products/${item.id}` }"
                      >{{ item.attributes.title }}</nuxt-link
                    >
                  </td>
                  <td>
                    <h2>
                      {{ $tools.priceFormat(item.attributes.price) + " sum" }}
                    </h2>
                  </td>
                  <td>
                    <img
                      width="80"
                      height="50"
                      :src="
                        $tools.getFileUrl(
                          item.attributes.country.data.attributes.flag.data
                            .attributes.url
                        )
                      "
                      :alt="item.attributes.country.data.attributes.name"
                    />
                  </td>
                  <td>
                    <a class="icon mr-3" @click="removeWishlistItem(item)">
                      <i class="ti-close"></i>
                    </a>
                    <a class="cart" @click="addToCart(item)">
                      <i class="ti-shopping-cart"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row wishlist-buttons" v-if="wishlist.length">
          <div class="col-12">
            <nuxt-link
              :to="{ path: '/collections/gallery' }"
              :class="'btn btn-solid'"
              >continue shopping</nuxt-link
            >
          </div>
        </div>
        <div
          class="col-sm-12 empty-cart-cls text-center"
          v-if="!wishlist.length"
        >
          <img
            :src="$tools.getImgUrl('empty-wishlist.png')"
            class="img-fluid"
            alt="empty cart"
          />
          <h3 class="mt-3">
            <strong>Your Wishlist is Empty</strong>
          </h3>
          <div class="col-12">
            <nuxt-link
              :to="{ path: '/collections/gallery' }"
              class="btn btn-solid"
              >continue shopping</nuxt-link
            >
          </div>
        </div>
      </div>
    </section>
    <x-footer />
  </div>
</template>
  <script>
import { mapGetters } from "vuex";
export default {
  auth: true,
  components: {},
  async fetch() {},
  computed: {
    ...mapGetters({
      wishlist: "products/getWishProducts",
      curr: "products/changeCurrency",
    }),
  },
  methods: {
    getImgUrl(path) {
      return require("@/assets/images/" + path);
    },
    removeWishlistItem: function (product) {
      this.$store.dispatch("products/removeWishlistItem", product);
    },
    addToCart: function (product) {
      this.$store.dispatch("cart/addToCart", product);
    },
  },
};
</script>
  