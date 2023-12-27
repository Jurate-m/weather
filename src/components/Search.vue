<!-- NTH -->

<template>
  <div :class="classes">
    <div>
      <form>
        <input type="text" name="location-query" placeholder="Location" />
      </form>
    </div>
  </div>
</template>

<script>
import "../assets/scss/components/_search.scss";

export default {
  props: [],

  data() {
    return {};
  },

  computed: {
    classes() {
      return {
        "search-box": true,
      };
    },
  },
};
</script>
