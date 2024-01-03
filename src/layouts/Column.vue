<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import "../assets/scss/layouts/_col.scss";

export default {
  props: {
    justifyCenter: Boolean,
    justifyEnd: Boolean,
  },
  computed: {
    classes() {
      return {
        col: true,
        "justify-center": this.justifyCenter,
        "justify-end": this.justifyEnd,
      };
    },
  },
};
</script>
