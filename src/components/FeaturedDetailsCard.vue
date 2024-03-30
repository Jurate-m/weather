<template>
  <div class="featured-details">
    <ul>
      <li class="mb-20">
        <h3 class="mb-10">Feels like:</h3>
        <p>{{ Math.round(data.feels_like) }}°C</p>
      </li>
      <li class="mb-20">
        <h3 class="mb-10">Precipitation</h3>
        <p>{{ data.probability.precipitation }}%</p>
      </li>
      <li class="mb-20">
        <h3 class="mb-10">Humidity:</h3>
        <p>{{ data.humidity }}%</p>
      </li>
      <li class="mb-20">
        <h3 class="mb-10">Wind:</h3>
        <p>{{ data.wind.dir }} {{ data.wind.speed }}m/s</p>
      </li>
      <li class="mb-20">
        <h3 class="mb-10">UV index:</h3>
        <p>{{ data.uv_index }} of 11</p>
      </li>
      <li class="mb-20">
        <h3 class="mb-10">Pressure:</h3>
        <p>{{ data.pressure }}hPa</p>
      </li>
    </ul>
  </div>
</template>

<script>
import "@/assets/scss/components/_featuredDetails.scss";

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
