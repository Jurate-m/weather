<template>
  <div>lan: {{ getLan }} lon: {{ getLon }}</div>
  <Layout dark>
    <CurrentWeather></CurrentWeather>
  </Layout>
</template>

<script>
import Layout from "../layouts/base.vue";
import CurrentWeather from "@/components/CurrentWeather.vue";

export default {
  components: {
    Layout,
    CurrentWeather,
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
