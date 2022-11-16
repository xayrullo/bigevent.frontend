export default {
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    title: "BigEvent",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/multikart/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Lato:300,400,700,900",
      },
    ],
    script: [{ src: "https://checkout.stripe.com/checkout.js" }],
  },

  router: {},
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#ff4c3b", throttle: 200, height: "3px", css: true },
  /*
   ** Global CSS
   */
  css: ["swiper/css/swiper.css", "~/assets/scss/app.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/plugin.js", ssr: false },
    { src: "~/plugins/localStorage.js", ssr: false },
    { src: "~/plugins/local-components.js" },
    { src: "~/plugins/tools.js" },
    { src: "~/plugins/axios.js" },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "vue-scrollto/nuxt",
    "@nuxtjs/auth-next",
  ],
  buildModules: ["@nuxtjs/dotenv"],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.VUE_APP_BASE_URL,
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "jwt",
          global: true,
          maxAge: 3600,
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: "auth/local", method: "post" },
          user: { url: "users/me", method: "get" },
          logout: false,
        },
        redirect: {
          login: "/",
          logout: "/",
          user: "/profile",
          callback: "/",
        },
      },
    },
  },
  strapi: {
    url: process.env.VUE_APP_BASE_URL || "http://localhost:1337",
    prefix: "/api",
    version: "v4",
    cookie: {},
    cookieName: "strapi_jwt",
  },
  generate: {
    fallback: true,
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ["vee-validate/dist/rules"],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    babel: { compact: true },
  },
};
