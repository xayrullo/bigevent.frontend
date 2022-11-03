<template>
    <div>
      <breadcrumbs title="Blog" />
      <section class="section-b-space blog-page ratio2_3">
        <div class="container">
            <div class="row">
              <BlogSidebar/>
              <div class="col-xl-9 col-lg-8 col-md-7 order-sec">
              <BlogList />
              </div>
            </div>
          </div>
      </section>
    </div>
  </template>
    <script>
  import BlogSidebar from "../widgets/blog-sidebar";
  import BlogList from "../widgets/blog-list";
  import { mapGetters } from "vuex";
  export default {
    components: {
      BlogSidebar,
      BlogList,
    },
    asyncData({ store, nuxt, params, i18n, route }) {
      store.dispatch("blog/getBlogs", { 
          populate: "*",
          sort: [
            'createdAt:desc'
          ]
      });
    },
  //   'sort[0][createdAt]': 'DESC',
    data() {},
    mounted() {},
    computed: {
      ...mapGetters({}),
    },
    methods: {},
  };
  </script>
    