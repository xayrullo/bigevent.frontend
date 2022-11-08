<template>
  <nuxt-link :to="{ path: `/blog/${data.id}` }">
    <div>
      <div class="classic-effect">
        <div>
          <img
            :src="$tools.getFileUrl(data.attributes.image.data.attributes.url)"
            :height="500"
            alt
            style="object-fit: cover; position: static; width: 100%"
          />
        </div>
        <span></span>
      </div>
    </div>
    <div class="blog-details text-left">
      <p>{{ data.attributes.title }}</p>
      <div class="mt-2">{{ data.attributes.description | textWrap }}</div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    data: Object,
  },
  filters: {
    textWrap(text) {
      if (text.length <= 200) return text;
      return text.slice(0, 200) + "...";
    },
  },
};
</script>