<template>
  <Card>
    <div>
      <!-- Display current weather information directly in the template -->
      <h5>{{ location }}</h5>
    </div>
    <CurrentWeather :data="currentWeather"></CurrentWeather>
  </Card>
</template>

<script>
import Card from "@/layouts/Card.vue";
import CurrentWeather from "@/components/CurrentWeather.vue";

export default {
  data() {
    return {
      currentWeather: null,
      location: null,
    };
  },

  components: {
    Card,
    CurrentWeather,
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

      this.location = this.modifyLocationString(
        sessionStorage.getItem("LocationId")
      );
      this.currentWeather = JSON.parse(
        sessionStorage.getItem("CurrentWeather")
      );
    },

    modifyLocationString(location) {
      // check for a better way of doing this
      let string = location.replace(/[^a-zA-Z ]/g, " ");
      if (string.split(" ").length > 1) {
        string
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      } else {
        string = string.charAt(0).toUpperCase() + string.slice(1);
      }

      return string;
    },
  },

  created() {
    this.fetchData();
  },
};
</script>
