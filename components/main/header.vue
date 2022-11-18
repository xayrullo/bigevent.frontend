<template>
  <div>
    <header>
      <div class="mobile-fix-option"></div>
      <TopBar />
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="main-menu">
              <div class="menu-left">
                <div class="">
                  <nuxt-link :to="{ path: '/' }">
                    <img
                      :src="$tools.getImgUrl('logos/logo-line.png')"
                      height="90"
                    />
                  </nuxt-link>
                </div>
              </div>
              <div class="menu-right pull-right">
                <Nav />
                <HeaderWidgets />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import TopBar from "./topbar";
import Nav from "./navbar";
import HeaderWidgets from "./header-widgets";
export default {
  data() {
    return {};
  },
  components: {
    TopBar,
    Nav,
    HeaderWidgets,
  },
  methods: {
    left_sidebar() {
      this.leftSidebarVal = true;
    },
    closeBarValFromChild(val) {
      this.leftSidebarVal = val;
    },
  },
};
</script>
