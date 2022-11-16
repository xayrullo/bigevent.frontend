export default {
    state: {
        token: null,
        user: {},
        loading: false,
        error: null
    },
    getters: {},
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
        IS_LOADING(state, payload) {
            state.loading = payload;
        },
        REMOVE_TOKEN(state, payload) {
            state.token = payload;
        },
        SET_USER(state, payload) {
            state.user = payload;
        },
        ERROR_AUTH(state, payload) {
            state.error = payload;
        },
    },
    actions: {
        setToken({ commit }, payload) {
            commit('SET_TOKEN', payload);
        },
        setUser({ commit }, payload) {
            commit('IS_LOADING', true)
            return new Promise((resolve, reject) => {
                this.$axios.$get('/users/me', {params: payload}).then(res => {
                    commit('SET_USER', res);
                    localStorage.setItem('user_info', JSON.stringify(res));
                    resolve();
                }).catch(err => {
                    reject()
                    console.log(err);
                })
                    .finally(() => {
                        commit('IS_LOADING', false);
                    })
            })
        },
        async signOut({ commit }) {
            commit('REMOVE_TOKEN', null);
            await localStorage.removeItem('token');
            await localStorage.removeItem('user_info');
            return 'Token Deleted';
        }
    }
}