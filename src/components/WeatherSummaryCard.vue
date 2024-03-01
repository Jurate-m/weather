<template>
  <div>
    <div class="weather-summary-card">
      <div class="weather-summary-card__item">
        <p>{{ date }}</p>
      </div>

      <div class="weather-summary-card__item icon">
        <img :src="`/src/assets/icons/weather/${icon}.svg`" />
      </div>
      <div class="weather-summary-card__item temp">
        <p>{{ Math.round(temperature) }}°C</p>
      </div>

      <div class="weather-summary-card__item hum">
        <img src="/src/assets/icons/drop.svg" />
        <p>{{ humidity }}%</p>
      </div>
      <div class="weather-summary-card__item wind">
        <img src="/src/assets/icons/wind.svg" />
        <img src="/src/assets/icons/arrow.svg" />
        <p>{{ windDir }} {{ windSpeed }}m/s</p>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/components/_weatherSummaryCard.scss";

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    icon: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    windDir: {
      type: String,
      required: true,
    },
    windSpeed: {
      type: Number,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        "listing-single": true,
      };
    },
  },
};
</script>
