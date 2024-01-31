<template>
  <div>
    <h1>Current Weather</h1>

    <!-- Display current weather information directly in the template -->
    <p>{{ currentWeather }}</p>

    <!-- Placeholder or loading message when current weather is not available -->
    <p v-if="!currentWeather">Loading current weather...</p>
  </div>
  <!-- <CurrentWeather :locationId="locationId"></CurrentWeather> -->
</template>

<script>
import CurrentWeather from "@/components/CurrentWeather.vue";

export default {
  data() {
    return {
      currentWeather: null,
    };
  },
  components: {
    // CurrentWeather,
  },

  methods: {
    async fetchData() {
      if (!sessionStorage.getItem("CurrentWeather")) {
        try {
          if (!sessionStorage.getItem("LocationId")) {
            await this.$store.dispatch("loadLocationId");
          }
          await this.$store.dispatch("current/getCurrentWeather");
        } catch (error) {
          console.log(error);
        }
      }

      this.currentWeather = sessionStorage.getItem("CurrentWeather");
    },
  },

  created() {
    this.fetchData();
  },
};
</script>
