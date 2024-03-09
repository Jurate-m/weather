<template>
  <div>
    <div class="weather-summary-card">
      <div class="weather-summary-card__item">
        <p>{{ date }}</p>
      </div>

      <div class="weather-summary-card__item icon">
        <img
          :src="`/assets/icons/weather/${icon}.svg`"
          :alt="'Weather summary - ' + weather_summary"
        />
      </div>
      <div class="weather-summary-card__item temp">
        <p>{{ Math.round(temperature) }}°C</p>
      </div>

      <div class="weather-summary-card__item hum">
        <img src="/assets/icons/drop.svg" aria-hidden="true" alt="null" />
        <p>{{ humidity }}%</p>
      </div>
      <div class="weather-summary-card__item wind">
        <img src="/assets/icons/wind.svg" aria-hidden="true" alt="null" />
        <p>{{ wind_dir }} {{ wind_speed }}m/s</p>
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
    weather_summary: {
      type: String,
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
    wind_dir: {
      type: String,
      required: true,
    },
    wind_speed: {
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
