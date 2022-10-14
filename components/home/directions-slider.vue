<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="title1 section-t-space">
            <h4>{{subtitle}}</h4>
            <h2 class="title-inner1">{{title}}</h2>
          </div>
        </div>
      </div>
    </div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in items" :key="index">
          <div>
            <div class="logo-block text-center">
              <a href="#">
                <img :src="item.imagepath" alt />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script type="text/javascript">
export default {
  components: {},
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        freeMode: true,
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
      items: [
        {
          imagepath: require("@/assets/images/logos/1.png"),
        },
        {
          imagepath: require("@/assets/images/logos/2.png"),
        },
        {
          imagepath: require("@/assets/images/logos/3.png"),
        },
        {
          imagepath: require("@/assets/images/logos/4.png"),
        },
        {
          imagepath: require("@/assets/images/logos/5.png"),
        },
        {
          imagepath: require("@/assets/images/logos/6.png"),
        },
        {
          imagepath: require("@/assets/images/logos/7.png"),
        },
        {
          imagepath: require("@/assets/images/logos/8.png"),
        },
      ],
    };
  },
};
</script>
  