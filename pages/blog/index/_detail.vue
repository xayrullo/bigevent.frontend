<template>
  <div>
    <breadcrumbs :routes="routes" :title="blog.attributes.title" />
    <section class="blog-detail-page section-b-space ratio2_3">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 blog-detail">
            <h3>{{ blog.attributes.title }}</h3>
            <ul class="post-social">
              <li>{{ $tools.getDate(blog.attributes.createdAt) }}</li>
            </ul>
            <p>{{ blog.attributes.description }}</p>
          </div>
        </div>
        <div class="section-b-space blog-advance mt-4">
          <div v-html="blog.attributes.content"></div>
        </div>
      </div>
    </section>
  </div>
</template>
  <script>
import { mapGetters } from "vuex";
export default {
  auth: false,
  components: {},
  asyncData({ store, route }) {
    store.dispatch("blog/getBlogDetail", {
      id: route.params.detail,
      query: {
        populate: "*",
      },
    });
  },
  data() {
    return {
      routes: [{ path: "blog", name: "Blog" }],
    };
  },
  computed: {
    ...mapGetters({
      blog: "blog/getBlog",
    }),
  },
};
</script>
  