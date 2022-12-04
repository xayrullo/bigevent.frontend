<template>
  <div>
    <breadcrumbs title="Checkout" />
    <section class="section-b-space">
      <div class="container">
        <div class="checkout-page">
          <div class="checkout-form">
            <ValidationObserver v-slot="{ invalid }">
              <form @submit.prevent="onSubmit">
                <div class="row">
                  <div class="col-lg-6 col-sm-12 col-xs-12">
                    <div class="checkout-title">
                      <h3>Billing Details</h3>
                    </div>
                    <div class="row check-out">
                      <div class="form-group col-md-6 col-sm-6 col-xs-12">
                        <div class="field-label">First Name</div>
                        <ValidationProvider
                          rules="required"
                          v-slot="{ errors }"
                          name="First name"
                        >
                          <input
                            type="text"
                            v-model="user.firstname"
                            name="First name"
                          />
                          <span class="validate-error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div class="form-group col-md-6 col-sm-6 col-xs-12">
                        <div class="field-label">Last Name</div>
                        <ValidationProvider
                          rules="required"
                          v-slot="{ errors }"
                          name="Last name"
                        >
                          <input
                            type="text"
                            v-model="user.lastname"
                            name="Last name"
                          />
                          <span class="validate-error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <ValidationProvider
                          rules="required|phone"
                          v-slot="{ errors }"
                          name="phone Number"
                        >
                          <div class="field-label">Phone</div>
                          <input
                            type="text"
                            v-model="user.phone"
                            name="Phone"
                          />
                          <span class="validate-error">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div
                        class="
                          form-group
                          col-lg-12 col-md-12 col-sm-12 col-xs-12
                        "
                      >
                        <nuxt-link :to="{ path: '/register' }"
                          >Create an Account?</nuxt-link
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-12 col-xs-12">
                    <div class="checkout-details">
                      <div class="order-box">
                        <div class="title-box">
                          <div>
                            Product
                            <span>Total</span>
                          </div>
                        </div>
                        <ul class="qty" v-if="cart.length">
                          <li v-for="(item, index) in cart" :key="index">
                            {{ item.title | uppercase }} X
                            {{ item.qty }}
                            <span>{{
                              $tools.priceFormat(item.price * item.qty)
                            }}</span>
                          </li>
                        </ul>
                        <ul class="sub-total">
                          <li>
                            Subtotal
                            <span class="count">{{
                              $tools.priceFormat(cartTotal)
                            }}</span>
                          </li>
                        </ul>
                        <ul class="sub-total">
                          <li>
                            Total
                            <span class="count">{{
                              $tools.priceFormat(cartTotal)
                            }}</span>
                          </li>
                        </ul>
                      </div>
                      <div class="payment-box">
                        <div class="text-right">
                          <button
                            type="submit"
                            @click="order()"
                            v-if="cart.length && !payment"
                            :disabled="invalid"
                            class="btn-solid btn"
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  <script>
import { mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      cart: "cart/cartItems",
      cartTotal: "cart/cartTotalAmount",
      curr: "products/changeCurrency",
    }),
  },
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        phone: "",
        paymentType: "",
        address: null,
        comment: "",
      },
      isLogin: false,
      paypal: {
        sandbox: "Your_Sendbox_Key",
      },
      payment: false,
      environment: "sandbox",
      button_style: {
        label: "checkout",
        size: "medium", // small | medium | large | responsive
        shape: "pill", // pill | rect
        color: "blue", // gold | blue | silver | black
      },
      amtchar: "",
    };
  },
  mounted() {
    this.user.firstname = this.$auth.user.firstname;
    this.user.lastname = this.$auth.user.lastname;
    this.user.phone = this.$auth.user.phone;
  },
  methods: {
    order() {
      this.isLogin = localStorage.getItem("userlogin");
      if (this.isLogin) {
        this.payWithStripe();
      } else {
        this.$router.replace("/page/account/login-firebase");
      }
    },
    payWithStripe() {
      const handler = window.StripeCheckout.configure({
        key: "PUBLISHBLE_KEY", // 'PUBLISHBLE_KEY'
        locale: "auto",
        closed: function () {
          handler.close();
        },
        token: (token) => {
          this.$store.dispatch("products/createOrder", {
            product: this.cart,
            userDetail: this.user,
            token: token.id,
            amt: this.cartTotal,
          });
          this.$router.push("/page/order-success");
        },
      });
      handler.open({
        name: "Multikart ",
        description: "Reach to your Dream",
        amount: this.cartTotal * 100,
      });
    },
    getamt() {
      return this.cartTotal.toString();
    },
    onPaymentComplete: function (data) {
      this.$store.dispatch("products/createOrder", {
        product: this.cart,
        userDetail: this.user,
        token: data.orderID,
        amt: this.cartTotal,
      });
      this.$router.push("/page/order-success");
    },
    onCancelled() {
      console.log("You cancelled a window");
    },
    onSubmit() {
      console.log("Form has been submitted!");
    },
  },
};
</script>
  