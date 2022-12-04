const state = {
  loading: false,
  oneLoading: false,
  pending: false,
  deleting: false,
  error: null,
  companies: [],
  company: {},
};

// getters
const getters = {
  loading(state) {
    return state.loading;
  },
  oneLoading(state) {
    return state.oneLoading;
  },
  pending(state) {
    return state.pending;
  },
  getCompanies: (state) => {
    return state.companies;
  },
  getCompany: (state) => {
    return state.company;
  },
};

// mutations
const mutations = {
  LOADING(state, payload) {
    state.loading = payload;
  },
  SET_COMPANIES(state, payload) {
    state.companies = payload;
  },
  SET_COMPANY(state, payload) {
    state.company = payload;
  },
};

// actions
const actions = {
  // get    getSomething
  getCompanies({ commit }, payload) {
    commit("LOADING", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`companies`, { params: payload })
        .then((res) => {
          const _res = res.results || res;
          commit("SET_COMPANIES", _res);
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
        .$get(`companies/${payload.id}`, { params: payload.query })
        .then((res) => {
          const _res = res.data || res;
          commit("SET_COMPANY", _res);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
