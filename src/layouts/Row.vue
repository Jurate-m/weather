<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import "../assets/scss/layouts/_row.scss";

export default {
  computed: {
    classes() {
      return {
        row: true,
      };
    },
  },
};
</script>
