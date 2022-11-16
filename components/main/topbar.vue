<template>
  <div class="top-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="header-contact">
            <ul>
              <li>
                <i class="fa fa-phone" aria-hidden="true"></i>Call Us: +998 93
                949-98-96
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6 text-right">
          <ul class="header-dropdown">
            <li class="mobile-wishlist">
              <nuxt-link :to="{ path: '/page/account/wishlist' }">
                <i class="fa fa-heart" aria-hidden="true"></i>
              </nuxt-link>
            </li>
            <li
              v-if="$store.state.auth.loggedIn"
              class="onhover-dropdown mobile-account"
            >
              <i class="fa fa-user" aria-hidden="true"></i>
              {{ "My Account" }}
              <ul class="onhover-show-div">
                <li>
                  <nuxt-link :to="{ path: '/page/account/dashboard' }">
                    {{ "Dashboard" }}
                  </nuxt-link>
                </li>
                <li>
                  <a @click="userLogout" class="text-danger">{{ "Logout" }}</a>
                </li>
              </ul>
            </li>
            <li v-else class="mobile-account">
              <nuxt-link :to="{ path: '/login' }">
                {{ "Login" }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import firebase from "firebase";
import UserAuth from "~/pages/page/account/auth/auth";
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  created() {
    if (process.client) {
      this.isLogin = localStorage.getItem("userlogin");
    }
  },
  methods: {
    async userLogout() {
      await this.$auth.logout();
    },
  },
};
</script>
  