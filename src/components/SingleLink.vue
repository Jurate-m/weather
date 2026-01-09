<template>
  <div class="single-link" :class="{ 'single-link--right': this.alignRight }">
    <router-link :to="{ name: routeName }">{{ text }}</router-link>
  </div>
</template>

<script>
import "@/assets/scss/components/_singleLink.scss";

export default {
  props: {
    routeName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    alignRight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
