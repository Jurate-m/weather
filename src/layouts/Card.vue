<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import "../assets/scss/components/_card.scss";

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
