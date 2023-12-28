<template>
  <Layout dark>
    <Weather></Weather>
  </Layout>
</template>

<script>
import Layout from "../layouts/base.vue";
import Weather from "@/components/Weather.vue";

export default {
  components: {
    Layout,
    Weather,
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
    this.$store.dispatch("setClientLocation");
  },
};
</script>
