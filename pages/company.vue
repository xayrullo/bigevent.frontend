<template>
  <div>
    <x-header />
    <breadcrumbs title="Companies" />
    <section class="section-b-space ratio_asos">
      <div class="collection-wrapper">
        <div class="container">
          <div class="row category-m">
            <div
              class="col-grid-box col-lg-4 col-md-4 col-sm-6 swiper-slide mb-4"
              v-for="(item, index) in companies"
              :key="index"
            >
              <!-- v-bind:style="{ 'background-image': `url(${$tools.getFileUrl(item.image)})`, 'background-position': 'center', 'background-size': '108px 175px', 'background-repeat': 'no-repeat' }" -->
              <div class="category-wrapper">
                <div>
                  <div>
                    <img
                      :src="$tools.getFileUrl(item.attributes.logo.data.attributes.url)"
                      class="bg-img"
                      style="object-fit: cover"
                      width="200"
                      height="200"
                      alt
                    />
                  </div>
                  <h4>{{ item.attributes.name }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <x-footer />
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  asyncData({ store }) {
    store.dispatch("getCompanies", { populate: "*" });
  },
  data() {
    return {
      itemsCat: [
        {
          imagepath: require("@/assets/images/watch/cat1.png"),
          title: "calculator watch",
          description:
            '<ul class="category-link"><li><a href="#">Watchmaking conglomerates</a></li><li><a href="#">Breitling SA</a></li><li><a href="#">Casio watches</a></li><li><a href="#">Citizen Watch</a></li></ul>',
          button: "view more",
          image: "/uploads/1_d2f5f57356.webp",
        },
        {
          imagepath: require("@/assets/images/watch/cat2.png"),
          title: "Antimagnetic watch",
          description:
            '<ul class="category-link"><li><a href="#">Watchmaking conglomerates</a></li><li><a href="#">Breitling SA</a></li><li><a href="#">Casio watches</a></li><li><a href="#">Citizen Watch</a></li></ul>',
          button: "view more",
          image: "/uploads/1_d2f5f57356.webp",
        },
        {
          imagepath: require("@/assets/images/watch/cat3.png"),
          title: "History of watches",
          description:
            '<ul class="category-link"><li><a href="#">Watchmaking conglomerates</a></li><li><a href="#">Breitling SA</a></li><li><a href="#">Casio watches</a></li><li><a href="#">Citizen Watch</a></li></ul>',
          button: "view more",
        },
        {
          imagepath: require("@/assets/images/watch/cat4.png"),
          title: "watch models",
          description:
            '<ul class="category-link"><li><a href="#">Watchmaking conglomerates</a></li><li><a href="#">Breitling SA</a></li><li><a href="#">Casio watches</a></li><li><a href="#">Citizen Watch</a></li></ul>',
          button: "view more",
          image: "/uploads/1_d2f5f57356.webp",
        },
        {
          imagepath: require("@/assets/images/watch/cat1.png"),
          title: "women watch",
          description:
            '<ul class="category-link"><li><a href="#">Watchmaking conglomerates</a></li><li><a href="#">Breitling SA</a></li><li><a href="#">Casio watches</a></li><li><a href="#">Citizen Watch</a></li></ul>',
          button: "view more",
          image: "/uploads/1_d2f5f57356.webp",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      companies: state => state.company.companies
    }),
    ...mapGetters({
      // companies: "company/getCompanies"
    })
  }
};
</script>
  