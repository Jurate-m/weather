<template>
  <div
    :key="hour.date"
    v-if="hour"
    class="weather-hourly-single"
    :class="classes"
    @click="toggleDisplay()"
  >
    <div class="weather-hourly-single__summary">
      <p style="display: inline-block; padding-right: 10px">
        {{ hour.date.getUTCHours() }}
      </p>
      <p style="display: inline-block; padding-right: 10px">
        Temperature:{{ hour.temperature }}
      </p>
      <p style="display: inline-block; padding-right: 10px">
        {{ hour.summary }}
      </p>
      <p style="display: inline-block; padding-right: 10px">
        <img :src="`/src/assets/icons/weather/${hour.icon}.png`" />
      </p>
      <p style="display: inline-block; padding-right: 10px">
        Humidity:{{ hour.humidity }}
      </p>
      <p style="display: inline-block; padding-right: 10px">
        Wind: {{ hour.wind.dir }} {{ hour.wind.speed }}
      </p>
    </div>
    <Transition>
      <div class="weather-hourly-single__details" v-show="this.active">
        <div class="weather-hourly-single__details-inner">
          <span>Feels like: {{ hour.feels_like }}</span>
          <span>wind: {{ hour.wind.dir }} {{ hour.wind.speed }}</span>
          <span>Wind Gust: {{ hour.wind.gust }}</span>
          <span>Cloud cover: {{ hour.cloud_cover }}</span>
          <span>Visibility: {{ hour.visibility }}</span>
          <span>UV index: {{ hour.uv_index }}</span>
          <span>Probability of rain: {{ hour.probability.precipitation }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import "../assets/scss/components/_weatherHourlySingle.scss";

export default {
  props: ["hour"],
  data() {
    return {
      active: false,
    };
  },

  methods: {
    toggleDisplay() {
      this.active = !this.active;
    },
  },

  computed: {
    classes() {
      return {
        active: this.active,
      };
    },
  },

  mounted() {},
};
</script>
