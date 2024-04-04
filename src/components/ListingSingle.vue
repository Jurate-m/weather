<template>
  <li :class="class">
    <button v-if="$slots.button" type="button" @click="setActive()">
      <slot name="button"></slot>
    </button>
    <div v-if="$slots.details">
      <Transition name="slide-down">
        <slot name="details" v-if="activeItem"></slot>
      </Transition>
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
