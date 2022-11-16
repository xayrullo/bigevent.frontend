<template>
  <div>
    <x-header />
    <Breadcrumbs :title="'Register'" />
    <section class="register-page section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h3>{{ "Create an account" }}</h3>
            <div class="theme-card">
              <ValidationObserver v-slot="{ invalid }">
                <form class="theme-form" @submit.prevent="onSubmit">
                  <div class="form-row">
                    <div class="col-md-6">
                      <label>{{ "First Name" }}</label>
                      <ValidationProvider
                        rules="required"
                        v-slot="{ errors }"
                        name="first name"
                      >
                        <input
                          type="text"
                          class="form-control mb-0"
                          id="First name"
                          v-model="account.fname"
                          :placeholder="'First Name'"
                          name="first name"
                        />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <label for="lname">{{ "Last Name" }}</label>
                      <ValidationProvider
                        rules="required"
                        v-slot="{ errors }"
                        name="last name"
                      >
                        <input
                          type="text"
                          class="form-control mb-0"
                          id="lname"
                          v-model="account.lname"
                          :placeholder="'Last Name'"
                          name="lname"
                        />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-6">
                      <label for="email">{{ "Email" }}</label>
                      <ValidationProvider
                        rules="required|email"
                        v-slot="{ errors }"
                        name="Email"
                      >
                        <input
                          type="email"
                          class="form-control mb-0"
                          id="email"
                          v-model="account.email"
                          :placeholder="'Email'"
                          name="email"
                        />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <label for="gender">{{ "Gender" }}</label>
                      <ValidationProvider
                        rules="required"
                        v-slot="{ errors }"
                        name="gender"
                      >
                        <select
                          :placeholder="'Select your gender'"
                          v-model="account.gender"
                          class="form-control mb-0 py-3"
                          style="height: auto"
                        >
                          <option
                            v-for="(gender, index) in genders"
                            :key="index"
                            :value="gender.id"
                          >
                            {{ gender.name }}
                          </option>
                        </select>
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-6">
                      <label for="password">{{ "Password" }}</label>
                      <ValidationProvider
                        rules="required"
                        v-slot="{ errors }"
                        name="password"
                      >
                        <input
                          type="password"
                          class="form-control mb-0"
                          id="password"
                          v-model="account.password"
                          :placeholder="'Enter your password'"
                          name="password"
                        />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <label for="confirm-password">
                        {{ "Confirm password" }}
                      </label>
                      <ValidationProvider
                        rules="required|confirmed:password"
                        v-slot="{ errors }"
                        name="confirm-password"
                      >
                        <input
                          type="password"
                          class="form-control mb-0"
                          id="confirm-password"
                          v-model="confirmPassword"
                          :placeholder="'Confirm password'"
                          name="confirm-password"
                        />
                        <span class="validate-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-solid mt-2"
                    :disabled="invalid"
                  >
                    {{ "Create an account" }}
                  </button>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </section>
    <x-footer />
  </div>
</template>
<script>
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full.esm";
import { mapGetters } from "vuex";
import Breadcrumbs from "~/components/widgets/breadcrumbs";
export default {
  // middleware: 'guest',
  components: {
    Breadcrumbs,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      account: {
        fname: "",
        lname: "",
        email: "",
        gender: null,
        password: "",
      },
      confirmPassword: "",
      hidden: {
        password: true,
        confirm_password: true,
      },
      title: "create account",
      password: null,
    };
  },
  computed: {
    ...mapGetters({
      genders: "directory/getGenders",
    }),
  },
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        this.$axios.setToken(false);
        await this.$axios
          .post("auth/local/register", {
            username: this.account.email,
            email: this.account.email,
            password: this.account.password,
            fullname: this.account.fname + " " + this.account.lname,
            gender: this.account.gender,
          })
          .then(() => {
            try {
              this.$auth.loginWith("local", {
                data: {
                  identifier: this.account.email,
                  password: this.account.password,
                },
              });
            } catch (e) {
              if (e.response) this.err = e.response.data.error.message;
            }
          });
        this.success = true;
      } catch (e) {
        if (e.response) this.err = e.response.data.error.message;
      }
    },
  },
};
</script>
