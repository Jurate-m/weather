<template>
  <div class="featured-card">
    <!-- <div class="featured-card__col"> -->
    <div class="featured-card__col" style="margin-right: 20px">
      <h1 v-if="location" style="font-weight: 700; letter-spacing: 1px">
        {{ location }}
      </h1>
      <p v-if="data.date" class="mb-20" style="text-wrap: nowrap">
        {{ formatDate(new Date(data.date), { weekday: "long" }) }},
        {{
          formatDate(new Date(data.date), {
            hour: "numeric",
            minute: "numeric",
          })
        }}
      </p>

      <div style="margin-top: auto">
        <h2 style="font-weight: 700; letter-spacing: 1px">
          {{ Math.round(data.temperature) }}°C
        </h2>
      </div>
    </div>
    <div class="featured-card__col">
      <div class="mt-20 mb-20">
        <img
          style="display: block; margin-left: auto"
          :src="`/assets/icons/weather/${data.icon}.svg`"
          :alt="'Weather - ' + data.summary"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/components/_featuredCard.scss";
import { formatDateTime } from "@/utils.js";

import FeaturedDetailsCard from "@/components/FeaturedDetailsCard.vue";

export default {
  components: { FeaturedDetailsCard },
  props: {
    location: {
      type: String,
      required: true,
    },

    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    formatDate(arg, options) {
      return formatDateTime(arg, options);
    },
  },
};
</script>
