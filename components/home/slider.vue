<template>
  <div>
    <!-- Home slider -->
    <section class="p-0">
      <div class="slide-1 home-slider">
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in directions"
              :key="index"
            >
              <div
                class="home p-left text-left"
                v-bind:style="{
                  'background-image': 'url(' + getBgImage(item) + ')',
                }"
              >
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <div class="slider-contain">
                        <div class="slider-content">
                          <h1>{{ item.title }}</h1>
                          <h4>{{ item.description }}</h4>
                          <nuxt-link
                            :to="{
                              path: `/collections/${item.link}`,
                            }"
                            class="btn btn-solid"
                            >Shop new collection</nuxt-link
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
      </div>
    </section>
    <!-- Home slider end -->
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    directions: Array,
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 10000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      items: [
        {
          imagepath: require("@/assets/images/banner/wedding-dresses.webp"),
          title: "Wedding Dresses",
          description:
            "Handmade and crafted to perfection, our effortlessly beautiful wedding gowns - featuring our signature flattering silhouettes - are designed for comfort, luxury and movement. You’ll never want to take yours off.",
          button: "",
          alignclass: "p-left text-left",
        },
        {
          imagepath: require("@/assets/images/banner/ready-to-wear.webp"),
          title: "Ready to Wear Wedding Dresses",
          description:
            "A collection of ready-to-wear gowns handmade to a standard size and height. In stock and ready to deliver directly to your door, each dress is perfect for the last minute or destination bride.",
          button: "",
          alignclass: "p-left text-left",
        },
        {
          imagepath: require("@/assets/images/banner/wedding-veils.jpg"),
          title: "Wedding Veils & Headbands",
          description:
            "For that WOW moment and a dreamy entrance to be remembered, our veils are romantic yet show-stopping, and feature exclusive fabrics and trims. Opt for a versatile silk scarf mid-wedding for added effortless chic.",
          button: "",
          alignclass: "p-left text-left",
        },
      ],
    };
  },
  methods: {
    getBgImage(item) {
      return item.banner
        ? this.$tools.getFileUrl(item.banner.url)
        : this.$tools.getImgUrl("beauty/banner2.jpg");
    },
  },
};
</script>
<style scoped lang="scss">
.home {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
  }
  .slider-content {
    position: relative;
    z-index: 10;
  }
}

</style>