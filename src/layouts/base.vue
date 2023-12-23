<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import "../assets/sass/main.scss";

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
