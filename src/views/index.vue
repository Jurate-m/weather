<template>
  <Layout dark="true">
    <div>lan: {{ getLan }} lon: {{ getLon }}</div>
  </Layout>
</template>

<script>
import Layout from "../layouts/base.vue";

export default {
  components: {
    Layout,
  },

  computed: {
    getLan() {
      return this.$store.getters.getLatitude;
    },

    getLon() {
      return this.$store.getters.getLongitude;
    },
  },

  mounted() {
    this.$store.dispatch("getPreciseClientLocation");
  },
};
</script>
