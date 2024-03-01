<template>
  <li :class="class">
    <div>
      <slot name="featured"></slot>
      <div v-if="!featured" class="listing-single__inner">
        <button @click="setActive()" type="button">
          <slot name="button"></slot>
        </button>
        <slot name="details" v-if="activeItem"></slot>
      </div>
    </div>
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
