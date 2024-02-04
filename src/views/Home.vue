<template>
  <Card class="py-20 px-30">
    <div>
      <!-- Display current weather information directly in the template -->
      <h5>{{ location }}</h5>
    </div>
    <CurrentWeather
      v-if="currentWeather && astroData"
      :data="currentWeather"
      :astro="astroData[0]"
    ></CurrentWeather>
  </Card>
</template>

<script>
import Card from "@/layouts/Card.vue";
import CurrentWeather from "@/components/CurrentWeather.vue";
import { modifyString } from "@/utils.js";

export default {
  data() {
    return {
      currentWeather: null,
      location: null,
      astroData: null,
    };
  },

  components: {
    Card,
    CurrentWeather,
  },

  methods: {
    async fetchData() {
      if (
        !sessionStorage.getItem("CurrentWeather") ||
        !sessionStorage.getItem("AstroData")
      ) {
        try {
          if (!sessionStorage.getItem("LocationId")) {
            await this.$store.dispatch("loadLocationId");
          }
          await this.$store.dispatch("current/getCurrentWeather");
          await this.$store.dispatch("astro/getAstroData");
        } catch (error) {
          console.log(error);
        }
      }

      this.location = modifyString(sessionStorage.getItem("LocationId"));
      this.currentWeather = JSON.parse(
        sessionStorage.getItem("CurrentWeather")
      );
      this.astroData = JSON.parse(sessionStorage.getItem("AstroData"));
    },
  },

  beforeMount() {
    if (sessionStorage.getItem("lastCurrentApiTimeStmp")) {
      let sessionTime = new Date(
        sessionStorage.getItem("lastCurrentApiTimeStmp")
      );
      let current = new Date();
      if (
        sessionTime.getHours() != current.getHours() ||
        sessionTime.getDate() != current.getDate()
      ) {
        sessionStorage.removeItem("CurrentWeather");
      }
    }
  },

  created() {
    this.fetchData();
  },
};
</script>
