<template>
  <div class="weather-summary-card">
    <div class="weather-summary-card__item date">
      <p>{{ date }}</p>
    </div>
    <div class="weather-summary-card__item icon">
      <img
        width="50"
        height="50"
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

<style>
.weather-summary-card {
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
}

.weather-summary-card__item {
  p {
    font-weight: 500;
    margin-bottom: 0;
  }

  img {
    object-fit: contain;
  }

  @media only screen and (min-width: 768px) {
    flex: 1;
    flex-basis: calc(100% / 3);
  }
}

.weather-summary-card__item.date {
  text-align: left;
  padding-left: 10px;
}

.weather-summary-card__item.temp {
  text-align: right;
  padding-right: 10px;
}

.weather-summary-card__item.arrow {
  flex-basis: 20px;
  position: relative;
  justify-content: flex-end;
  align-items: center;
}

.weather-summary-card__item.arrow::before {
  content: url("/assets/icons/arrow.svg");
  position: relative;
  display: block;
  width: 20px;
  margin-left: auto;
  transform: scale(0.5);
  transition: all 0.2s ease-in-out;
}
</style>
