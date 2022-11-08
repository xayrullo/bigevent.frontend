const state = {
    loading: false,
    oneLoading: false,
    pending: false,
    deleting: false,
    error: null,
    directions: [],
}

// getters
const getters = {
    directoryLoading(state) { return state.loading; },
    directoryOneLoading(state) { return state.oneLoading; },
    directoryPending(state) { return state.pending; },
    getDirections(state) { return state.data; }
}

// mutations
const mutations = {
    LOADING(state, payload) {
        state.loading = payload
    },
    SET_DIRECTIONS(state, payload) {
        state.directions = payload
    },
}

// actions
const actions = {
    // get    getSomething
    getDirections({ commit, state }, payload) {
        commit('LOADING', true);
        return new Promise((resolve, reject) => {
            this.$axios
                .$get(`directions`, { params: payload })
                .then(res => {
                    const _res = res.data || res;
                    commit('SET_DIRECTIONS', _res);
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
