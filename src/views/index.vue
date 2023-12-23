<template>
  <Layout dark>
    <Card>
      <div>lan: {{ getLan }} lon: {{ getLon }}</div>
    </Card>
  </Layout>
</template>

<script>
import Layout from "../layouts/base.vue";
import Card from "../layouts/Card.vue";

export default {
  components: {
    Layout,
    Card,
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
