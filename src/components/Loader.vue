<template>
  <span
    class="loader"
    :class="{ 'loader--light': light }"
    aria-label="loading"
  ></span>
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
