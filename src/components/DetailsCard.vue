<template>
  <div class="details-card">
    <ul>
      <li
        v-for="{ title, value } in details"
        :class="{ separated: separator }"
        :key="new Date()"
      >
        <h3 class="mb-10 c-secondary">{{ title }}:</h3>
        <p>{{ value }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import "@/assets/scss/components/_detailsCard.scss";

export default {
  props: {
    details: {
      type: Object,
      required: true,
    },

    separator: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
