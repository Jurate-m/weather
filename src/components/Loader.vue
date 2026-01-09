<template>
  <div class="loader" :class="{ 'loader--light': light }">
    <span aria-label="loading"></span>
  </div>
</template>

<script>
import "@/assets/scss/components/_loader.scss";

export default {
  props: {
    light: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
