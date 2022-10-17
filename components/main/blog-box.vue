<template>
  <nuxt-link to="/">
    <div>
      <div class="classic-effect">
        <div>
          <img :src="$tools.getImgUrl(data.image)" :height="500" alt style="object-fit: cover; position: static; width: 100%;" />
        </div>
        <span></span>
      </div>
    </div>
    <div class="blog-details text-left">
      <p>{{ data.title }}</p>
      <div class="mt-2">{{ data.description | textWrap }}</div>
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
        if (text.length  <= 200) return text;
        return text.slice(0, 200) + '...'
    }
  }
};
</script>