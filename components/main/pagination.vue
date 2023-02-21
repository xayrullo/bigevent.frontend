<template>
  <div class="theme-paggination-block">
    <div class="row">
      <div class="col-xl-6 col-md-6 col-sm-12">
        <nav aria-label="Page navigation">
          <ul v-if="pageCount <= 5" class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                href="javascript:void(0)"
                @click="previousPage"
              >
                <span aria-hidden="true">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
              </a>
            </li>
            <li
              v-for="(p, ind) in pageCount"
              :key="ind"
              class="page-item"
              :class="{ active: p === page }"
            >
              <a class="page-link" @click="$emit('onChange', p)">{{ p }}</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="javascript:void(0)" @click="nextPage">
                <span aria-hidden="true">
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </span>
              </a>
            </li>
          </ul>
          <ul v-else class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                href="javascript:void(0)"
                @click="previousPage"
              >
                <span aria-hidden="true">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
              </a>
            </li>
            <li
              v-if="beginningPages.first > 1"
              class="page-item"
              :class="{ active: 1 === page }"
            >
              <a class="page-link" @click="$emit('onChange', 1)">{{ 1 }}</a>
            </li>
            <li v-if="beginningPages.first > 2" class="page-item">
              <a class="page-link">...</a>
            </li>
            <li
              class="page-item"
              :class="{ active: beginningPages.first === page }"
            >
              <a class="page-link" @click="changePage(beginningPages.first)">{{
                beginningPages.first
              }}</a>
            </li>
            <li
              class="page-item"
              :class="{ active: beginningPages.second === page }"
            >
              <a class="page-link" @click="changePage(beginningPages.second)">{{
                beginningPages.second
              }}</a>
            </li>
            <li
              class="page-item"
              :class="{ active: beginningPages.third === page }"
            >
              <a class="page-link" @click="changePage(beginningPages.third)">{{
                beginningPages.third
              }}</a>
            </li>
            <li v-if="beginningPages.third < pageCount" class="page-item">
              <a class="page-link">...</a>
            </li>
            <li
              v-if="beginningPages.third < pageCount"
              class="page-item"
              :class="{ active: pageCount === page }"
            >
              <a class="page-link" @click="changePage(pageCount)">{{
                pageCount
              }}</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="javascript:void(0)" @click="nextPage">
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
          <h5 v-if="pageSize >= total">Showing 1-{{ pageSize }}</h5>
          <h5 v-else>
            {{ calPagination() }}
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
    length: Number,
    pageSize: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      beginningPages: {
        first: 2,
        second: 3,
        third: 4,
      },
    };
  },
  mounted() {},
  methods: {
    calPagination() {
      const start = this.pageSize * (this.page - 1) + 1;
      const end =
        this.pageSize * this.page < this.total
          ? this.pageSize * this.page
          : this.total;
      if (start === end) return "Showing " + start + " of " + this.total;
      return "Showing " + start + " - " + end + " of " + this.total;
    },
    changePage(page) {
      if (page === this.pageCount) {
        this.beginningPages.first = page - 2;
        this.beginningPages.second = page - 1;
        this.beginningPages.third = page;
      } else if (page === 1) {
        this.beginningPages.first = page;
        this.beginningPages.second = page + 1;
        this.beginningPages.third = page + 2;
      } else {
        this.beginningPages.first = page - 1;
        this.beginningPages.second = page;
        this.beginningPages.third = page + 1;
      }
      this.$emit("onChange", page);
    },
    previousPage() {
      if (this.page - 1 >= 1) {
        this.changePage(this.page - 1);
      }
    },
    nextPage() {
      if (this.page + 1 <= this.pageCount) {
        this.changePage(this.page + 1);
      }
    },
  },
};
</script>