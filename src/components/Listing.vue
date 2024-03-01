<template>
  <ul :class="class">
    <slot></slot>
  </ul>
</template>

<script>
import "@/assets/scss/components/_listing.scss";

export default {
  props: {
    full_width: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    class() {
      return {
        listing: true,
        "listing--full-w": this.full_width,
      };
    },
  },
};
</script>
