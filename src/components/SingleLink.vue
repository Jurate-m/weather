<template>
  <div :class="class">
    <router-link :to="{ name: routeName }">{{ text }}</router-link>
  </div>
</template>

<script>
import "@/assets/scss/components/_singleLink.scss";

export default {
  props: {
    routeName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    alignRight: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    class() {
      return {
        "single-link": true,
        "single-link--right": this.alignRight,
      };
    },
  },
};
</script>
