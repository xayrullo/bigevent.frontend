import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import blog from "./modules/blog";
import menu from "./modules/menu";
import products from "./modules/products";
import cart from "./modules/cart";
import filter from "./modules/filter";
import layout from "./modules/layout";
import directory from "./modules/directory";
import company from "./modules/company";

Vue.use(Vuex);
const createStore = () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit({ commit }, params) {
        console.log("nuxtServerInit: ", params);
      },
    },
    modules: {
      auth,
      blog,
      menu,
      products,
      cart,
      filter,
      layout,
      directory,
      company,
    },
  });
};
export default createStore;
