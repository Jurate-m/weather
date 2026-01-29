<template>
  <div class="featured-list-card">
    <p class="mb-10 c-secondary">
      {{
        formatTime(new Date(data.date), {
          hour: "numeric",
          minute: "numeric",
        })
      }}
    </p>
    <div class="mb-10">
      <img
        height="50"
        width="50"
        :src="`/assets/icons/weather/${data.icon}.svg`"
        :alt="'Weather icon - ' + data.summary"
      />
    </div>
    <p class="lg">{{ Math.round(data.temperature) }}°C</p>
  </div>
</template>

<script>
import { formatDateTime } from "@/utils.js";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    formatTime(time, options) {
      return formatDateTime(time, options);
    },
  },

  computed: {
    parentClasses() {
      return {
        "featured-listing-item": true,
      };
    },
  },
};
</script>

<style>
.featured-list-card {
  img {
    object-fit: contain;
    display: block;
    margin: 0 auto;
  }

  p {
    &:first-child {
      font-weight: 500;
    }
  }
}
</style>
