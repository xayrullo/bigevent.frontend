<template>
  <div class="col-xl-3 col-lg-4 col-md-5">
    <div class="blog-sidebar">
      <div class="theme-card">
        <h4>Recent Blog</h4>
        <ul class="recent-blog">
          <li v-for="(blog, index) in bloglist.slice(0, 6)" :key="index">
            <div class="media">
              <nuxt-link :to="{ path: `/blog/${blog.id}` }">
                <img
                  :src="$tools.getFileUrl(blog.image.url)"
                  style="object-fit: cover"
                  height="50"
                />
              </nuxt-link>
              <div class="media-body align-self-center">
                <nuxt-link :to="{ path: `/blog/${blog.id}` }">
                  <h6>{{ $tools.getDate(blog.createdAt) }}</h6>
                </nuxt-link>
                <p>{{ blog.title }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      bloglist: (state) => state.blog.blogs,
    }),
    getblogtags() {
      return this.$store.getters["blog/getblogTag"];
    },
  },
  methods: {},
};
</script>
