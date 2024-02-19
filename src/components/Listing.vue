<template>
  <ul :class="parentClass">
    <li
      :class="[childClass, { active: index === activeIndex }]"
      v-for="(item, index) in data"
      :key="index"
    >
      <slot name="featured" :item="item" :index="index"></slot>
      <div v-if="!featured" class="listing-single__inner">
        <button @click="setActive(index)" type="button">
          <slot name="button" :item="item" :index="index"></slot>
        </button>
        <slot name="details" :item="item" :index="index"></slot>
      </div>
    </li>
  </ul>
</template>

<script>
import "@/assets/scss/components/_listing.scss";

export default {
  props: {
    extended: {
      type: Boolean,
      default: false,
      required: false,
    },
    featured: {
      type: Boolean,
      deafult: false,
      required: false,
    },
    data: {
      type: Object,
      required: true,
    },
    activeIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      index: 0,
    };
  },

  computed: {
    parentClass() {
      return {
        listing: true,
        "listing--full-w": this.extended,
      };
    },

    childClass() {
      return {
        "listing-single": true,
        "listing-single--featured": this.featured,
      };
    },
  },

  methods: {
    setActive(index) {
      this.$emit("set-active", index);
    },
  },
};
</script>
