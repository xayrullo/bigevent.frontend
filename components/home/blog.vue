<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h2 class="home-title">{{ title }}</h2>
      <nuxt-link to="/blog" class="home-all">
        <span>{{ 'See all' }}</span>
        <img src="~/assets/images/home/link-all.svg" alt="" />
      </nuxt-link>
    </div>
    <section class="blog p-t-0 ratio2_3">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div v-swiper:mySwiper="swiperOption">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(blog, index) in bloglist.slice(0, 10)"
                  :key="index"
                >
                  <blog-box :data="blog" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  <script>
import { mapState } from "vuex";
export default {
  props: {},
  data() {
    return {
      title: "Explore GRACE Brides' Love Stories",
      subtitle: "",
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 20,
        freeMode: true,
        breakpoints: {
          1199: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          420: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        },
      },
    };
  },
  computed: mapState({
    bloglist: (state) => state.blog.blogs,
  }),
  methods: {},
};
</script>
  