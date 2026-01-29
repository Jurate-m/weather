<template>
  <div class="featured-card">
    <div class="featured-card__col" style="margin-right: 20px">
      <h1
        v-if="location"
        style="font-weight: 700; letter-spacing: 1px"
        class="mb-10"
      >
        {{ location }}
      </h1>
      <p v-if="data.date" class="mb-20 c-secondary" style="text-wrap: nowrap">
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
          height="150"
          :src="`/assets/icons/weather/${data.icon}.svg`"
          :alt="'Weather - ' + data.summary"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from "@/utils.js";

export default {
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

<style>
.featured-card {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;

  img {
    width: 100%;
    min-width: 150px;
    object-fit: contain;
  }

  .featured-card__col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (min-width: 600px) {
    .featured-card__col {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
