<template>
  <div v-if="days">
    <h1>Hourly</h1>
    <div v-for="day in days">
      <WeatherHourly :data="day"></WeatherHourly>
    </div>
  </div>
</template>

<script>
import WeatherHourly from "../components/WeatherHourly.vue";

export default {
  components: { WeatherHourly },
  data() {
    return {
      days: null,
    };
  },
};
</script>
