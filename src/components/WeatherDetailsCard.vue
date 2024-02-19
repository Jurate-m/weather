<template>
  <div class="weather-details-card">
    <div v-if="summary" class="weather-details-card__summary">
      <p>{{ summary }}</p>
    </div>
    <div v-if="details" class="weather-details-card__items">
      <div v-for="item in details" class="item">
        <div class="item__inner">
          <p class="title">{{ item.title }}</p>
          <p class="description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/components/_weatherDetailsCard.scss";

export default {
  props: {
    details: {
      type: Object,
      required: false,
    },
    summary: {
      type: String,
      required: false,
    },
  },
};
</script>
