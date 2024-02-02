<template>
  <!-- <pre>{{ dailyWeather }}</pre> -->
  <h1>{{ dailyWeather }}</h1>
  <p v-if="!dailyWeather">Loading daily weather...</p>
</template>

<script>
export default {
  data() {
    return {
      dailyWeather: null,
    };
  },

  // components: { Listing },

  methods: {
    async fetchData() {
      if (!sessionStorage.getItem("DailyWeather")) {
        try {
          if (!sessionStorage.getItem("LocationId")) {
            await this.$store.dispatch("loadLocationId");
          }
          await this.$store.dispatch("daily/getDailyWeather");
        } catch (error) {
          console.log(error);
        }
      }

      this.dailyWeather = JSON.parse(sessionStorage.getItem("DailyWeather"));
    },
  },

  created() {
    this.fetchData();
  },
};
</script>
