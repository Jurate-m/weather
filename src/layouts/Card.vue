<template>
  <div class="card" :class="classes">
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

    pb: {
      type: Boolean,
      default: false,
    },

    pt: {
      type: Boolean,
      default: false,
    },

    padded: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        "card--transparent": this.transparent,
        pb: this.pb,
        pt: this.pt,
        "card--padded": this.padded,
      };
    },
  },
};
</script>
