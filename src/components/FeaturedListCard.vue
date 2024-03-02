<template>
  <div class="featured-list-card">
    <p class="mb-10">
      {{
        formatTime(new Date(data.date), {
          hour: "numeric",
          minute: "numeric",
        })
      }}
    </p>
    <div class="mb-10">
      <img :src="`/src/assets/icons/weather/${data.icon}.svg`" />
    </div>
    <p>{{ Math.round(data.temperature) }}°C</p>
  </div>
</template>

<script>
import "@/assets/scss/components/_featuredListCard.scss";
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
