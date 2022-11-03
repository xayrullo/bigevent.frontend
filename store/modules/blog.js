import blog from '../../data/blog'

const state = {
  blog: {},
  bloglist: blog.data,
  blogs: [],
  loading: false,
}
// getters
const getters = {
  getblogTag: (state) => {
    const uniqueTag = []
    const blogTag = []
    state.bloglist.map((blog, index) => {
      if (blog.tags) {
        blog.tags.map((tag) => {
          const index = uniqueTag.indexOf(tag)
          if (index === -1) uniqueTag.push(tag)
        })
      }
    })
    for (let i = 0; i < uniqueTag.length; i++) {
      blogTag.push(uniqueTag[i])
    }
    return blogTag
  },
  getBlogs: state => state.blogs,
  getBlog: state => state.blog,
}
// mutations
const mutations = {
  LOADING(state, payload) {
    state.loading = payload
  },
  SET_BLOGS(state, payload) {
    state.blogs = payload
  },
  SET_BLOG(state, payload) {
    state.blog = payload
  },
}
// actions
const actions = {
  getBlogs({ commit }, payload) {
    commit('LOADING', true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`blogs`, { params: payload })
        .then(res => {
          const _res = res.data || res;
          commit('SET_BLOGS', _res);
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
  getBlogDetail({ commit }, payload) {
    commit('LOADING', true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`blogs/${payload.id}`, { params: payload.query })
        .then(res => {
          const _res = res.data || res;
          commit('SET_BLOG', _res);
          resolve(_res);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          commit('LOADING', false);
        });
    });
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
