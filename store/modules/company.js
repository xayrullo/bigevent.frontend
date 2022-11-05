const state = {
    loading: false,
    oneLoading: false,
    pending: false,
    deleting: false,
    error: null,
    companies: [],
}

// getters
const getters = {
    loading(state) { return state.loading; },
    oneLoading(state) { return state.oneLoading; },
    pending(state) { return state.pending; },
    getCompanies(state) { return state.companies; }
}

// mutations
const mutations = {
    LOADING(state, payload) {
        state.loading = payload
    },
    SET_COMPANIES(state, payload) {
        state.companies = payload
    },
}

// actions
const actions = {
    // get    getSomething
    getCompanies({ commit }, payload) {
        commit('LOADING', true);
        return new Promise((resolve, reject) => {
            this.$axios
                .$get(`companies`, { params: payload })
                .then(res => {
                    const _res = res.data || res;
                    commit('SET_COMPANIES', _res);
                    resolve(_res);
                })
                .catch(error => {
                    reject(error);
                })
                .finally(() => {
                    commit('LOADING', false);
                });
        });
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
