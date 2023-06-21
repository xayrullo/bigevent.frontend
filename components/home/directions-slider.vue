<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h2 class="home-title">{{ title }}</h2>
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
                <nuxt-link :to="`/collections/${direction.link}`">
                  <img
                    :src="
                      direction.image
                        ? $tools.getFileUrl(direction.image.url)
                        : $tools.getImgUrl('1.jpg')
                    "
                    :id="direction.id"
                    class="img-fluid bg-img"
                    :alt="direction.title"
                    :key="index"
                  />
                </nuxt-link>
              </div>
            </div>
            <div class="product-detail mt-2">
              <nuxt-link :to="`/collections/${direction.link}`">
                <div class="text-xl font-medium">{{ direction.title }}</div>
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
  mounted() {},
};
</script>
<style scoped>
.nuxt-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
