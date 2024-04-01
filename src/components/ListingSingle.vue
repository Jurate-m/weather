<template>
  <li :class="class">
    <slot></slot>
  </li>
</template>

<script>
export default {
  props: {
    featured: {
      type: Boolean,
      default: false,
    },
    customEvent: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    return {
      activeItem: false,
    };
  },

  computed: {
    class() {
      return {
        "listing-single": true,
        "listing-single--featured": this.featured,
        active: this.activeItem,
      };
    },
  },

  methods: {
    setActive() {
      if (this.customEvent) {
        this.$emit("set-active");
      } else {
        this.activeItem = !this.activeItem;
      }
    },
  },
};
</script>
