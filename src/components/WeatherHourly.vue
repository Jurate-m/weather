<template>
  <!-- <pre>{{ data[0].date }}</pre> -->
  <div :class="classes" v-if="data">
    <h3>
      {{ weekdays[data[0].date.getDay()] }},
      {{ data[0].date.toLocaleString("en-GB", { month: "long" }) }}
      {{ data[0].date.getDate() }}
    </h3>
    <ul>
      <div>
        <WeatherHourlySingle
          v-for="item in data"
          :hour="item"
          v-if="data"
        ></WeatherHourlySingle>
        <br />
        <br />
        <br />
      </div>
    </ul>
  </div>
</template>

<script>
import WeatherHourlySingle from "./WeatherHourlySingle.vue";

export default {
  components: { WeatherHourlySingle },
  props: ["data"],

  data() {
    return {
      day: null,
      weekdays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
  },

  methods: {
    toggleDisplay() {},
  },

  computed: {
    classes() {
      return {
        "weather-hourly": true,
      };
    },
  },

  mounted() {
    this.days = this.data;
  },
};
</script>
