<template>
  <div>
    <x-header />
    ABOUT
    <x-footer />
  </div>
</template>
<script>
export default {
  auth: false,
  middleware: "auth-redirect",
};
</script>