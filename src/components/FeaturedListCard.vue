<template>
  <span>{{
    formatTime(new Date(data.date), {
      hour: "numeric",
      minute: "numeric",
    })
  }}</span>
  <div><img :src="`/src/assets/icons/weather/${data.icon}.svg`" /></div>
  <span>{{ Math.round(data.temperature) }}°</span>
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
