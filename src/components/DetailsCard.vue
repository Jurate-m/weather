<template>
  <div class="details-card">
    <ul>
      <li class="mb-30">
        <h3 class="mb-10 c-secondary">Feels like:</h3>
        <p>{{ Math.round(data.feels_like) }}°C</p>
      </li>
      <li class="mb-30">
        <h3 class="mb-10 c-secondary">Precipitation</h3>
        <p>{{ data.probability.precipitation }}%</p>
      </li>
      <li class="mb-30">
        <h3 class="mb-10 c-secondary">Humidity:</h3>
        <p>{{ data.humidity }}%</p>
      </li>
      <li class="mb-30">
        <h3 class="mb-10 c-secondary">Wind:</h3>
        <p>{{ data.wind.dir }} {{ data.wind.speed }}m/s</p>
      </li>
      <li class="mb-30">
        <h3 class="mb-10 c-secondary">UV index:</h3>
        <p>{{ data.uv_index }} of 11</p>
      </li>
      <li class="mb-30">
        <h3 class="mb-10 c-secondary">Pressure:</h3>
        <p>{{ data.pressure }}hPa</p>
      </li>
    </ul>
  </div>
</template>

<script>
import "@/assets/scss/components/_detailsCard.scss";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed() {},
};
</script>
