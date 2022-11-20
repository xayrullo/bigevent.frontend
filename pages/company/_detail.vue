<template>
  <div>
    <breadcrumbs :routes="routes" :title="'XJ Group'" />
    <section class="blog-detail-page section-b-space ratio2_3 pt-0">
      <div class="container">
        <div class="top-banner-wrapper">
          <a v-if="company.attributes.banner" href="#">
            <img
              :src="$tools.getImgUrl('mega-menu/2.jpg')"
              class="img-fluid"
              alt
            />
          </a>
          <div class="top-banner-content small-section">
            <h4>{{ company.attributes.name }}</h4>
            <!-- <h5>{{ company.attributes.description }}</h5> -->
            <p>{{ company.attributes.description }}</p>
          </div>
        </div>
        <div
          v-if="
            company.attributes.directions.data &&
            company.attributes.directions.data.length > 1
          "
          class="container category-button"
        >
          <section class="section-b-space border-section border-bottom-0">
            <div class="row partition1">
              <div class="col">
                <a
                  class="btn btn-outline btn-block"
                  :class="{ active: !$route.query.direction }"
                  @click="changeByDirection({ id: 'all' })"
                  >All</a
                >
              </div>
              <div
                class="col"
                v-for="(cat, index) in company.attributes.directions.data"
                :key="index"
              >
                <a
                  class="btn btn-outline btn-block"
                  :class="{ active: $route.query.direction == cat.id }"
                  @click="changeByDirection(cat)"
                  >{{ cat.attributes.title }}</a
                >
              </div>
            </div>
          </section>
        </div>
        <div class="product-wrapper-grid">
          <div class="row">
            <div class="col-sm-12">
              <div
                class="text-center section-t-space section-b-space"
                v-if="products.length == 0"
              >
                <img
                  :src="$tools.getImgUrl('empty-search.jpg')"
                  class="img-fluid"
                  alt
                />
                <h3 class="mt-3">
                  Sorry! Couldn't find the product you were looking For!!!
                </h3>
                <div class="col-12 mt-3">
                  <nuxt-link :to="{ path: '/' }" class="btn btn-solid"
                    >continue shopping</nuxt-link
                  >
                </div>
              </div>
            </div>
            <div
              class="col-grid-box col-lg-3 col-md-4 col-sm-6"
              v-for="(product, index) in products"
              :key="index"
              v-show="setPaginate(index)"
            >
              <div class="product-box">
                <product-box
                  @opencartmodel="showCart"
                  @showCompareModal="showCompare"
                  @openquickview="showQuickview"
                  @showalert="alert"
                  @alertseconds="alert"
                  :product="product"
                  :index="index"
                  :isColor="false"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="pagination.pageCount > 1" class="product-pagination mb-0">
          <pagination
            :pageCount="pagination.pageCount"
            :pageSize="pagination.pageSize"
            :page="pagination.page"
            :total="pagination.total"
            @onChange="changePage($event)"
          />
        </div>
      </div>
    </section>
  </div>
</template>
  <script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      routes: [{ path: "company", name: "Companies" }],
      current: 1,
      paginate: 18,
      paginateRange: 3,
      pages: [],
      paginates: "",
      showquickviewmodel: false,
      showcomparemodal: false,
      showcartmodal: false,
      quickviewproduct: {},
      comapreproduct: {},
      cartproduct: {},
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  async asyncData({ store, route }) {
    if (route.params.detail)
      await store.dispatch("company/getDetail", {
        id: route.params.detail,
        query: { populate: "*" },
      });
    await store.dispatch("products/getProducts", {
      populate: "*",
      filters: {
        $and: [
          {
            company: {
              id: route.params.detail,
            },
            direction: {
              id: route.query.direction,
            },
          },
        ],
      },
    });
  },
  computed: {
    ...mapState({
      //   company: (state) => state.company.company
      pagination: (state) => state.products.pagination,
    }),
    ...mapGetters({
      companies: "company/getCompanies",
      company: "company/getCompany",
      products: "products/getProducts",
    }),
  },
  watch: {
    "$route.query": {
      handler() {
        this.fetchProducts();
      },
      deep: true,
    },
  },
  methods: {
    changeByDirection(direction) {
      let _query = { ...this.$route.query };
      if (direction.id === "all") delete _query.direction;
      else _query.direction = direction.id;
      this.$router.push({
        path: this.$route.fullpath,
        query: _query,
      });
    },
    async fetchProducts() {
      await this.$store.dispatch("products/getProducts", {
        populate: "*",
        filters: {
          $and: [
            {
              company: {
                id: this.$route.params.detail,
              },
              direction: {
                id: this.$route.query.direction,
              },
            },
          ],
        },
      });
    },
    setPaginate(i) {
      if (this.current === 1) {
        return i < this.paginate;
      } else {
        return (
          i >= this.paginate * (this.current - 1) &&
          i < this.current * this.paginate
        );
      }
    },
    alert(item) {
      this.dismissCountDown = item;
    },
    showQuickview(item, productData) {
      this.showquickviewmodel = item;
      this.quickviewproduct = productData;
    },
    showCompare(item, productData) {
      this.showcomparemodal = item;
      this.comapreproduct = productData;
    },
    closeCompareModal(item) {
      this.showcomparemodal = item;
    },
    showCart(item, productData) {
      this.showcartmodal = item;
      this.cartproduct = productData;
    },
    closeCartModal(item) {
      this.showcartmodal = item;
    },
  },
};
</script>
  