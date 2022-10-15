<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="title1 section-t-space">
            <h4>{{ subtitle }}</h4>
            <h2 class="title-inner1">{{ title }}</h2>
          </div>
        </div>
      </div>
    </div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(direction, index) in directions"
          :key="index"
        >
          <div class="product-box">
            <div class="img-wrapper">
              <div class="front">
                <nuxt-link to="/">
                  <img
                    :src="$tools.getImgUrl(direction.image)"
                    :id="direction.id"
                    class="img-fluid bg-img"
                    :alt="direction.title"
                    :key="index"
                  />
                </nuxt-link>
              </div>
            </div>
            <div class="product-detail">
              <nuxt-link :to="direction.link">
                <h6>{{ direction.title }}</h6>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script type="text/javascript">
export default {
  props: {
    directions: Array,
    subtitle: String,
    title: String,
  },
  components: {},
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        freeMode: true,
        spaceBetween: 20,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          1199: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 4,
          },
          420: {
            slidesPerView: 3,
          },
          0: {
            slidesPerView: 2,
          },
        },
      },
    };
  },
  mounted() {
    console.log("Directions: ", this.directions);
  },
};
</script>
<style scoped>
.nuxt-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
