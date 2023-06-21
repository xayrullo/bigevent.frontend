<template>
  <div>
    <section class="p-0">
      <div
        class="full-banner parallax text-center p-left"
        v-bind:style="{ 'background-image': `url(${imagepath})` }"
      >
        <img :src="imagepath" alt class="bg-img d-none" />
        <div class="container">
          <div class="row">
            <div class="col-4">
              <div class="banner-contain text-left">
                <div class="display-1 mb-4">{{ title }}</div>
                <div class="h4">{{ subtitle }}</div>
                <div class="mt-4">{{ text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  <script type="text/javascript">
export default {
  data() {
    return {
      imagepath: require("@/assets/images/parallax/1.jpg"),
      title: "2022",
      subtitle: "New Collection In Showrooms, Book Now",
      text: "Discover the new Memoirs of Her collection in GRACE showrooms globally. We have carefully crafted our showrooms so that your experience is true to our values; sophisticated, authentic, friendly and relaxed, with one-on-one service that is second to none. Secure your free one hour luxury appointment below.",
    };
  },
};
</script>
  <style lang="scss">



</style>