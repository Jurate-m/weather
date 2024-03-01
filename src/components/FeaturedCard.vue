<template>
  <div :class="classes">
    <div class="featured-card__col">
      <h2 style="text-align: center" v-if="data.date" class="mb-30">
        {{ formatDate(new Date(data.date), { weekday: "long" }) }},
        {{
          formatDate(new Date(data.date), {
            hour: "numeric",
            minute: "numeric",
          })
        }}
      </h2>
      <div class="mb-30">
        <img
          style="display: block; margin: 0 auto"
          :src="`/src/assets/icons/weather/${data.icon}.svg`"
        />
      </div>
      <div class="mb-30">
        <h3 style="text-align: center" class="mb-10">{{ data.summary }}</h3>
        <h4 style="text-align: center">{{ Math.round(data.temperature) }}°C</h4>
      </div>
    </div>
    <div class="featured-card__col featured-card__details mb-30">
      <ul>
        <li>
          <p>Feels like:</p>
          <p>{{ Math.round(data.feels_like) }}°C</p>
        </li>
        <li>
          <p>Humidity:</p>
          <p>{{ data.humidity }}%</p>
        </li>
        <li>
          <p>Pressure:</p>
          <p>{{ data.pressure }}hPa</p>
        </li>

        <li>
          <p>Wind:</p>
          <p>{{ data.wind.dir }} {{ data.wind.speed }}m/s</p>
        </li>
        <li>
          <p>Wind gust:</p>
          <p>{{ data.wind.gusts }} m/s</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/components/_featuredCard.scss";
import { formatDateTime } from "@/utils.js";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        "featured-card": true,
      };
    },
  },

  methods: {
    formatDate(arg, options) {
      return formatDateTime(arg, options);
    },
  },
};
</script>
