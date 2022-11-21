<template>
  <div>
    <x-header />
    <Breadcrumbs :title="'Login'" />
    <section class="login-page section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <h3>{{ "Login" }}</h3>
            <div class="theme-card">
              <ValidationObserver v-slot="{ invalid }">
                <form class="theme-form" @submit.prevent="onSubmit">
                  <div class="form-group">
                    <label for="email">{{ "Enter email" }}</label>
                    <ValidationProvider
                      rules="required|email"
                      v-slot="{ errors }"
                      name="email"
                    >
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="auth.identifier"
                        :placeholder="'Enter email'"
                        name="email"
                      />
                      <span class="validate-error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div v-if="isEmail" class="form-group">
                    <label for="password">{{ "Password" }}</label>
                    <ValidationProvider
                      rules="required|min:6"
                      v-slot="{ errors }"
                      name="password"
                    >
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="auth.password"
                        :placeholder="'Enter your password'"
                      />
                      <span class="validate-error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-solid"
                    :disabled="invalid"
                  >
                    {{ "Login" }}
                  </button>
                </form>
              </ValidationObserver>
            </div>
          </div>
          <div class="col-lg-6 right-login">
            <h3>{{ "Are you new user?" }}</h3>
            <div class="theme-card authentication-right">
              <h6 class="title-font">{{ "Create an account" }}</h6>
              <p>
                Sign up for a free account at our store. Registration is quick
                and easy. It allows you to be able to order from our shop. To
                start shopping click register.
              </p>
              <nuxt-link :to="{ path: '/register' }" class="btn btn-solid">{{
                "Create an account"
              }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <x-footer />
  </div>
</template>
<script>
import Breadcrumbs from "~/components/widgets/breadcrumbs";

const EMAILREG =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MOBILEREG = /^([+]?[9]{2}[8][0-9]{2}[0-9]{7})$/;

export default {
  auth: "guest",
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      logintitle: "Login",
      registertitle: "New Customer",
      auth: {
        identifier: "",
        password: "",
      },
      isEmail: true,
      isPhone: false,
      isPhoneOtpPending: false,
    };
  },
  watch: {
    "auth.identifier"() {
      // if (EMAILREG.test(this.auth.identifier)) {
      //   this.isPhone = false;
      //   this.isEmail = true;
      // } else {
      //   this.isEmail = false;
      //   this.isPhone = false;
      // }
      // this.isPhoneOtpPending = false;
    },
  },
  methods: {
    sendOtp() {},
    registerPhone() {},
    async registerEmail() {
      this.$snotify.info("Login In");
      try {
        await this.$auth
          .loginWith("local", {
            data: this.auth,
          })
          .then(async (res) => {
            if (this.$route.query.from) {
              this.$router.push(this.$route.query.from);
            }
            // this.afterLoginProcess()
          });
      } catch (e) {
        if (e.response) this.authError = e.response.data.error.message;
        this.$sentry.captureException(e);
      }
    },
    async afterLoginProcess() {
      this.$snotify.success("Successfully Logged In");
    },
    async onSubmit() {
      if (this.auth.identifier.includes("+") > 0) {
        this.auth.identifier = this.auth.identifier.substring(1);
      }
      if (MOBILEREG.test(this.auth.identifier)) {
        this.sendOtp();
        return;
      }
      this.tryToLogin();
    },
    tryToLogin() {
      this.loading = true;
      if (this.isEmail) {
        this.registerEmail();
      } else {
        this.registerPhone();
      }
    },
  },
};
</script>
