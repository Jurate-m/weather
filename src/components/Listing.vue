<template>
  <div :class="classes" v-if="data">
    <h3>
      <slot name="header"> Test </slot>
    </h3>
    <ul>
      <div>
        <ListingSingle
          v-for="item in data"
          :data="item"
          v-if="data"
        ></ListingSingle>
        <br />
        <br />
        <br />
      </div>
    </ul>
  </div>
</template>

<script>
import ListingSingle from "./ListingSingle.vue";

export default {
  components: { ListingSingle },
  props: ["data"],

  data() {
    return {
      weekdays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
  },

  methods: {
    toggleDisplay() {},
  },

  computed: {
    classes() {
      return {
        listing: true,
      };
    },
  },
};
</script>
