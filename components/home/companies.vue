<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h2 class="home-title">{{ 'Stores' }}</h2>
      <nuxt-link to="/companies" class="home-all">
        <span>{{ 'See all' }}</span>
        <img src="~/assets/images/home/link-all.svg" alt="" />
      </nuxt-link>
    </div>

    <section class="section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="slide-6 no-arrow">
              <div v-swiper:mySwiper="swiperOption">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(company, index) in companies"
                    :key="index"
                  >
                    <nuxt-link :to="{ path: `/company/${company.id}` }">
                      <div class="logo-block text-center">
                        <div>
                          <img
                            :src="
                              company.logo
                                ? $tools.getFileUrl(company.logo.url)
                                : $tools.getImgUrl('logos/2.png')
                            "
                            width="100"
                            height="100"
                          />
                        </div>
                      </div>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        freeMode: true,
        breakpoints: {
          1199: {
            slidesPerView: 6,
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
  computed: {
    ...mapGetters({
      companies: "company/getCompanies",
    }),
  },
  mounted() {},
};
</script>
  