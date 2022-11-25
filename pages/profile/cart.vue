<template>
  <div>
    <breadcrumbs title="Cart" />
    <section class="cart-section section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <table
              class="table cart-table table-responsive-xs"
              v-if="cart.length"
            >
              <thead>
                <tr class="table-head">
                  <th scope="col">image</th>
                  <th scope="col">product name</th>
                  <th scope="col">price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">action</th>
                  <th scope="col">total</th>
                </tr>
              </thead>
              <tbody v-for="(item, index) in cart" :key="index">
                <tr>
                  <td>
                    <nuxt-link
                      v-if="item.attributes.media.data"
                      :to="{ path: '/collections/products/' + item.id }"
                    >
                      <img
                        :src="
                          $tools.getFileUrl(
                            item.attributes.media.data[0].attributes.url
                          )
                        "
                        alt
                      />
                    </nuxt-link>
                    <nuxt-link
                      v-else
                      :to="{ path: '/collections/products/' + item.id }"
                    >
                      <img :src="$tools.getImgUrl('1.jpg')" alt />
                    </nuxt-link>
                  </td>
                  <td>
                    <nuxt-link
                      :to="{ path: '/collections/products/' + item.id }"
                      >{{ item.attributes.title }}</nuxt-link
                    >
                    <div class="mobile-cart-content row">
                      <div class="col-xs-3">
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
                      <div class="col-xs-3">
                        <h2 class="td-color">
                          {{ $tools.priceFormat(item.attributes.price) }} sum
                        </h2>
                      </div>
                      <div class="col-xs-3">
                        <h2 class="td-color">
                          <a href="#" class="icon">
                            <i class="ti-close"></i>
                          </a>
                        </h2>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h2>{{ $tools.priceFormat(item.attributes.price) }} sum</h2>
                  </td>
                  <td>
                    <div class="qty-box">
                      <div class="input-group">
                        <span class="input-group-prepend">
                          <button
                            type="button"
                            class="btn quantity-left-minus"
                            data-type="minus"
                            data-field
                            @click="decrement(item)"
                          >
                            <i class="ti-angle-left"></i>
                          </button>
                        </span>
                        <input
                          type="text"
                          name="quantity"
                          class="form-control input-number"
                          :disabled="item.qty > item.stock"
                          v-model="item.qty"
                        />
                        <span class="input-group-prepend">
                          <button
                            type="button"
                            class="btn quantity-right-plus"
                            data-type="plus"
                            data-field
                            @click="increment(item)"
                          >
                            <i class="ti-angle-right"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a class="icon" @click="removeCartItem(item)">
                      <i class="ti-close"></i>
                    </a>
                  </td>
                  <td>
                    <h2 class="td-color">
                      {{ $tools.priceFormat(item.attributes.price) }} sum
                    </h2>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="table cart-table table-responsive-md"
              v-if="cart.length"
            >
              <tfoot>
                <tr>
                  <td>total price :</td>
                  <td style="min-width: 300px">
                    <h2>{{ $tools.priceFormat(cartTotal) }} sum</h2>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div
              class="col-sm-12 empty-cart-cls text-center"
              v-if="!cart.length"
            >
              <img
                :src="'@/assets/images/icon-empty-cart.png'"
                class="img-fluid"
                alt="empty cart"
              />
              <h3 class="mt-3">
                <strong>Your Cart is Empty</strong>
              </h3>
              <h4 class="mb-3">Add something to make me happy :)</h4>
              <div class="col-12">
                <nuxt-link :to="{ path: '/' }" class="btn btn-solid"
                  >continue shopping</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row cart-buttons" v-if="cart.length">
          <div class="col-6">
            <nuxt-link :to="{ path: '/' }" :class="'btn btn-solid'"
              >continue shopping</nuxt-link
            >
          </div>
          <div class="col-6">
            <nuxt-link
              :to="{ path: '/profile/checkout' }"
              :class="'btn btn-solid'"
              >check out</nuxt-link
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  <script>
import { mapGetters } from "vuex";
export default {
  auth: false,
  data() {
    return {
      counter: 1,
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      cart: "cart/cartItems",
      cartTotal: "cart/cartTotalAmount",
    }),
  },
  methods: {
    getImgUrl(path) {
      return require("@/assets/images/" + path);
    },
    removeCartItem(product) {
      this.$store.dispatch("cart/removeCartItem", product);
    },
    increment(product, qty = 1) {
      this.$store.dispatch("cart/updateCartQuantity", {
        product: product,
        qty: qty,
      });
    },
    decrement(product, qty = -1) {
      this.$store.dispatch("cart/updateCartQuantity", {
        product: product,
        qty: qty,
      });
    },
  },
};
</script>
  