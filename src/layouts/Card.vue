<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import "../assets/scss/layouts/_card.scss";

export default {
  computed: {
    classes() {
      return {
        card: true,
      };
    },
  },
};
</script>
