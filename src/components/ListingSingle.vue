<template>
  <div
    :key="data.date"
    v-if="data"
    class="listing-single"
    :class="classes"
    @click="toggleDisplay()"
  >
    Test
  </div>
</template>

<script>
import ListingSingleInner from "./ListingSingleInner.vue";
import "../assets/scss/components/_listingSingle.scss";

export default {
  props: ["data"],
  components: {
    ListingSingleInner,
  },

  data() {
    return {
      active: false,
    };
  },

  methods: {
    toggleDisplay() {
      this.active = !this.active;
    },
  },

  computed: {
    classes() {
      return {
        active: this.active,
      };
    },
  },

  mounted() {},
};
</script>
