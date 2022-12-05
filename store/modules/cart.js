import products from "../../data/products";
import Vue from "vue";
const state = {
  products: products.data,
  cart: [],
};
// getters
const getters = {
  cartItems: (state) => {
    return state.cart;
  },
  cartTotalAmount: (state) => {
    return state.cart.reduce((total, product) => {
      return total + product.price * product.qty;
    }, 0);
  },
};
// mutations
const mutations = {
  ADD_TO_CART(state, payload) {
    state.cart.push(payload);
  },
  REMOVE_CART_ITEM(state, payload) {
    const index = state.cart.indexOf(payload);
    state.cart.splice(index, 1);
  },
  updateCartQuantity: (state, payload) => {
    // Calculate Product stock Counts
    function calculateStockCounts(product, quantity) {
      const qty = product.quantity + quantity;
      const stock = product.stock;
      if (stock < qty) {
        return false;
      }
      return true;
    }
    state.cart.find((items, index) => {
      if (items.id === payload.product.id) {
        const qty = state.cart[index].quantity + payload.qty;
        const stock = calculateStockCounts(state.cart[index], payload.qty);
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty;
        } else {
          // state.cart.push({
          //   ...product,
          //   quantity: qty
          // })
        }
        return true;
      }
    });
  },
  removeCartItem: (state, payload) => {
    const index = state.cart.indexOf(payload);
    state.cart.splice(index, 1);
  },
};
// actions
const actions = {
  addToCart(context, payload) {
    const product = context.state.cart.find((item) => item.id === payload.id);
    if (product) {
      Vue.prototype.$snotify.warning(
        "You have already added this item to your cart."
      );
      return;
    }
    const { commit } = context;
    const qty = payload.quantity ? payload.quantity : 1;
    Vue.prototype.$snotify.success(
      "Product is successfully added to your cart."
    );
    commit("ADD_TO_CART", { ...payload, qty });
  },
  updateCartQuantity: (context, payload) => {
    context.commit("updateCartQuantity", payload);
  },
  removeCartItem: (context, payload) => {
    context.commit("REMOVE_CART_ITEM", payload);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
