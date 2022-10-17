<template>
  <div class="theme-paggination-block">
    <div class="row">
      <div class="col-xl-6 col-md-6 col-sm-12">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                href="javascript:void(0)"
                @click="updatePaginate(current - 1)"
              >
                <span aria-hidden="true">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
              </a>
            </li>
            <li
              class="page-item"
              v-for="(page_index, index) in pages"
              :key="index"
              :class="{ active: page_index == current }"
            >
              <a
                class="page-link"
                href="javascrip:void(0)"
                @click.prevent="updatePaginate(page_index)"
                >{{ page_index }}</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link"
                href="javascript:void(0)"
                @click="updatePaginate(current + 1)"
              >
                <span aria-hidden="true">
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-xl-6 col-md-6 col-sm-12">
        <div class="product-search-count-bottom">
          <h5>
            Showing Products 1-12 of
            {{ length }} Result
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pages: Array,
    length: Number
  },
  data() {
    return {
      current: 1,
      paginate: 12,
      paginateRange: 3,
      paginates: "",
    };
  },
  mounted() {
    this.updatePaginate(1);
  },
  methods: {
    updatePaginate(i) {
      this.current = i;
      let start = 0;
      let end = 0;
      if (this.current < this.paginateRange - 1) {
        start = 1;
        end = start + this.paginateRange - 1;
      } else {
        start = this.current - 1;
        end = this.current + 1;
      }
      if (start < 1) {
        start = 1;
      }
      if (end > this.paginates) {
        end = this.paginates;
      }
      this.pages = [];
      for (let i = start; i <= end; i++) {
        this.pages.push(i);
      }
      return this.pages;
    },
  },
};
</script>