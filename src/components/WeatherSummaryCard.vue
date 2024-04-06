<template>
  <div class="weather-summary-card">
    <div class="weather-summary-card__item date">
      <p>{{ date }}</p>
    </div>
    <div class="weather-summary-card__item icon">
      <img
        :src="`/assets/icons/weather/${icon}.svg`"
        :alt="'Weather summary - ' + weather_summary"
      />
    </div>
    <div class="weather-summary-card__item temp">
      <p>{{ temperature }}°C</p>
    </div>
    <div class="weather-summary-card__item arrow"></div>
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
      required: true,
    },
  },
};
</script>
