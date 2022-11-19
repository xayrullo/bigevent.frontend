import products from "../../data/products";

const state = {
  productslist: products.data,
  products: [],
  specialProducts: [],
  product: {},
  wishlist: [],
  compare: [],
  currency: {
    curr: "usd",
    symbol: "$",
  },
  order: [],
  locale: "en",
  searchProduct: [],
  pagination: {
    page: 1,
    total: 0,
    pageSize: 12,
    pageCount: 1,
  },
};
// getters
const getters = {
  getProducts: (state) => state.products,
  getSpecialProducts: (state) => state.specialProducts,
  getProduct: (state) => state.product,
  getcollectionProduct: (state) => {
    return (collection) =>
      state.products.filter((product) => {
        return collection === product.collection;
      });
  },
  getProductById: (state) => {
    return (id) =>
      state.products.find((product) => {
        return product.id === +id;
      });
  },
  compareItems: (state) => {
    return state.compare;
  },
  wishlistItems: (state) => {
    return state.wishlist;
  },
  changeCurrency: (state) => {
    if (state.currency.curr === "eur") {
      state.currency.curr = 0.9;
      return state.currency;
    } else if (state.currency.curr === "inr") {
      state.currency.curr = 70.93;
      return state.currency;
    } else if (state.currency.curr === "gbp") {
      state.currency.curr = 0.78;
      return state.currency;
    } else if (state.currency.curr === "usd") {
      state.currency.curr = 1;
      return state.currency;
    }
  },
  getOrder: (state) => {
    return state.order;
  },
};
// mutations
const mutations = {
  LOADING(state, payload) {
    state.loading = payload;
  },
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  SET_SPECIAL_PRODUCTS(state, payload) {
    state.specialProducts = payload;
  },
  SET_PRODUCT(state, payload) {
    state.product = payload;
  },
  SET_PAGINATION(state, payload) {
    state.pagination = payload;
  },
  changeCurrency: (state, payload) => {
    state.currency = payload;
  },
  addToWishlist: (state, payload) => {
    const product = state.products.find((item) => item.id === payload.id);
    const wishlistItems = state.wishlist.find((item) => item.id === payload.id);
    if (wishlistItems) {
    } else {
      state.wishlist.push({
        ...product,
      });
    }
  },
  removeWishlistItem: (state, payload) => {
    const index = state.wishlist.indexOf(payload);
    state.wishlist.splice(index, 1);
  },
  addToCompare: (state, payload) => {
    const product = state.products.find((item) => item.id === payload.id);
    const compareItems = state.compare.find((item) => item.id === payload.id);
    if (compareItems) {
    } else {
      state.compare.push({
        ...product,
      });
    }
  },
  removeCompareItem: (state, payload) => {
    const index = state.compare.indexOf(payload);
    state.compare.splice(index, 1);
  },
  searchProduct: (state, payload) => {
    payload = payload.toLowerCase();
    state.searchProduct = [];
    if (payload.length) {
      state.products.filter((product) => {
        if (product.title.toLowerCase().includes(payload)) {
          state.searchProduct.push(product);
        }
      });
    }
  },
  createOrder: (state, payload) => {
    state.order = payload;
  },
};
// actions
const actions = {
  getProducts({ commit }, payload) {
    commit("LOADING", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`products`, { params: payload })
        .then((res) => {
          console.log(res);
          commit("SET_PAGINATION", {
            page: res.meta.pagination.page || state.pagination.page,
            total: res.meta.pagination.total,
            pageSize: state.pagination.pageSize,
            pageCount: res.meta.pagination.pageCount,
          });
          const _res = res.data || res;
          commit("SET_PRODUCTS", _res);
          resolve(_res);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit("LOADING", false);
        });
    });
  },
  getSpecialProducts({ commit }, payload) {
    commit("LOADING", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`products`, { params: payload })
        .then((res) => {
          const _res = res.data || res;
          commit("SET_SPECIAL_PRODUCTS", _res);
          resolve(_res);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit("LOADING", false);
        });
    });
  },
  getDetail({ commit }, payload) {
    commit("LOADING", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`products/${payload.id}`, { params: payload.query })
        .then((res) => {
          const _res = res.data || res;
          commit("SET_PRODUCT", _res);
          resolve(_res);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit("LOADING", false);
        });
    });
  },
  changeCurrency: (context, payload) => {
    context.commit("changeCurrency", payload);
  },
  addToWishlist: (context, payload) => {
    context.commit("addToWishlist", payload);
  },
  removeWishlistItem: (context, payload) => {
    context.commit("removeWishlistItem", payload);
  },
  addToCompare: (context, payload) => {
    context.commit("addToCompare", payload);
  },
  removeCompareItem: (context, payload) => {
    context.commit("removeCompareItem", payload);
  },
  searchProduct: (context, payload) => {
    context.commit("searchProduct", payload);
  },
  createOrder: (context, payload) => {
    context.commit("createOrder", payload);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
