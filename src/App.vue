<template>
  <main>
    <div>lan: {{ getLan }} lon: {{ getLon }}</div>
    <br />
    <br />
    <br />
  </main>
</template>

<script>
export default {
  data() {
    return {};
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
