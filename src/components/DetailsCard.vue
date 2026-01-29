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

<style>
.details-card {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow: hidden;
    padding: 0 20px;

    li {
      display: flex;
      flex-direction: column;
      min-width: 150px;
      text-align: center;
      padding: 20px 10px;

      h3 {
        font-weight: 500;
      }

      p {
        margin-top: auto;
        margin-bottom: 0;
        font-weight: 600;
        white-space: nowrap;
      }

      @media only screen and (min-width: 1000px) {
        width: calc(100% / 3);
      }
    }

    li.separated {
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      margin-bottom: -2px;
      margin-top: 2px;
    }
  }
}
</style>
