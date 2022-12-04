import products from "../../data/products";

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
  addToCart: (context, payload) => {
    const { commit } = context;
    const product = { ...payload };
    const qty = payload.quantity ? payload.quantity : 1;
    commit("ADD_TO_CART", { ...product, qty });
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
