const state = {
  loading: false,
  oneLoading: false,
  pending: false,
  deleting: false,
  error: null,
  directions: [],
  genders: [],
};

// getters
const getters = {
  directoryLoading(state) {
    return state.loading;
  },
  directoryOneLoading(state) {
    return state.oneLoading;
  },
  directoryPending(state) {
    return state.pending;
  },
  getDirections(state) {
    return state.directions;
  },
  getGenders(state) {
    return state.genders.map((gen) => {
      return { id: gen.id, name: gen.name };
    });
  },
};

// mutations
const mutations = {
  LOADING(state, payload) {
    state.loading = payload;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  SET_DIRECTIONS(state, payload) {
    state.directions = payload;
  },
  SET_GENDERS(state, payload) {
    state.genders = payload;
  },
};

// actions
const actions = {
  // get    getSomething
  getDirections({ commit, state }, payload) {
    commit("LOADING", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`directions`, { params: payload })
        .then((res) => {
          const _res = res.results || res;
          commit("SET_DIRECTIONS", _res);
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
  getGenders({ commit, state }, data) {
    commit("LOADING", true);
    return new Promise((resolve, reject) => {
      if (state.genders.length) resolve(state.gender);
      else
        this.$axios
          .get(`/genders`, { params: data })
          .then((res) => {
            const _res = res.results || res;
            commit("SET_GENDERS", _res.data);
            resolve(_res.data);
          })
          .catch((error) => {
            commit("SET_ERROR", error);
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
