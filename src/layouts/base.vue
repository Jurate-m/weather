<template>
  <div :class="classes">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import "../assets/scss/main.scss";

export default {
  props: {
    dark: Boolean,
  },
  computed: {
    classes() {
      return {
        layout: true,
        "layout--dark": this.dark,
      };
    },
  },
};
</script>
