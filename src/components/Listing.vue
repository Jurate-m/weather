<template>
  <ul class="listing" :class="{ 'listing--flex': flex }">
    <slot></slot>
  </ul>
</template>

<script>
import "@/assets/scss/components/_listing.scss";

export default {
  props: {
    flex: {
      type: Boolean,
      default: false,
    },
    full_width: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
