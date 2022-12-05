<template>
  <div
    v-show="isScrolled"
    class="tap-top top-cls"
    @click="backToTop"
    v-scroll-to="'#body-content'"
  >
    <div>
      <i class="fa fa-angle-double-up" style="font-size: 32px"></i>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userScrollPosition: 0,
    };
  },
  computed: {
    isScrolled() {
      return this.userScrollPosition > 100;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScrollPosition);
  },
  updated() {},
  beforeDestroy() {
    window.removeEventListener("scroll", this.updateScrollPosition);
  },
  methods: {
    updateScrollPosition() {
      this.userScrollPosition = window.scrollY;
    },
    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>