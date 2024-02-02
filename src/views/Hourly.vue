<template>
  {{ hourlyWeather }}
  <p v-if="!hourlyWeather">Loading hourly weather...</p>

  <!-- <div v-if="days">
    <h1>{{ hourlyData }}</h1>
    <div v-for="day in days">
      <Listing :data="days"></Listing>
    </div>
  </div> -->
</template>

<script>
import Listing from "../components/Listing.vue";

export default {
  data() {
    return {
      hourlyWeather: null,
    };
  },

  // components: { Listing },

  methods: {
    async fetchData() {
      if (!sessionStorage.getItem("HourlyWeather")) {
        try {
          if (!sessionStorage.getItem("LocationId")) {
            await this.$store.dispatch("loadLocationId");
          }
          await this.$store.dispatch("hourly/getHourlyWeather");
        } catch (error) {
          console.log(error);
        }
      }

      this.hourlyWeather = JSON.parse(sessionStorage.getItem("HourlyWeather"));
    },
  },

  created() {
    this.fetchData();
  },
};
</script>
