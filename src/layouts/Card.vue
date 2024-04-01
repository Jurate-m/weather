<template>
  <div class="card" :class="{ 'card--transparent': transparent }">
    <div class="card__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/layouts/_card.scss";

export default {
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
