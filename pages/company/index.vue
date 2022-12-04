<template>
  <div>
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
                  <nuxt-link :to="{ path: `/company/${item.id}` }">
                    <div>
                      <img
                        :src="
                          item.logo
                            ? $tools.getFileUrl(item.logo.url)
                            : $tools.getImgUrl('logos/2.png')
                        "
                        class="bg-img"
                        style="object-fit: cover"
                        width="200"
                        height="200"
                        alt
                      />
                    </div>
                    <h4>{{ item.name }}</h4>
                    <h6>{{ $tools.phoneFormatter(item.phone) }}</h6>
                  </nuxt-link>
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
import { mapGetters, mapState } from "vuex";
export default {
  auth: false,
  asyncData({ store }) {
    store.dispatch("company/getCompanies", { populate: "*" });
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      companies: (state) => state.company.companies,
    }),
    ...mapGetters({
      // companies: "company/getCompanies"
    }),
  },
};
</script>
