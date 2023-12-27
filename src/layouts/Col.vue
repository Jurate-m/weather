<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import "../assets/scss/layouts/_col.scss";

export default {
  computed: {
    classes() {
      return {
        col: true,
      };
    },
  },
};
</script>
