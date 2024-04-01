<template>
  <li :class="class">
    <div v-if="accordion">
      <button type="button" @click="setActive()">
        <slot name="button"></slot>
      </button>
      <slot name="details" v-if="activeItem"></slot>
    </div>

    <slot></slot>
  </li>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    accordion: {
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
      activeItem: this.index == 0,
    };
  },

  computed: {
    class() {
      return {
        "listing-single": true,
        "listing-single--featured": this.featured,
        "listing-single--acordion": this.accordion,
        active: this.activeItem || this.index == 0,
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
