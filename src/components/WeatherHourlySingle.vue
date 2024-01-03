<template>
  <li :key="hour.date" v-if="hour">
    <div>
      <p style="display: inline-block; padding-right: 10px">
        {{ hour.date.getUTCHours() }}
      </p>
      <p style="display: inline-block; padding-right: 10px">
        Temperature:{{ hour.temperature }}
      </p>
      <p style="display: inline-block; padding-right: 10px">
        {{ hour.summary }}
      </p>
      <p style="display: inline-block; padding-right: 10px">
        <img :src="`/src/assets/icons/weather/${hour.icon}.png`" />
      </p>
      <p style="display: inline-block; padding-right: 10px">
        Humidity:{{ hour.humidity }}
      </p>
      <p style="display: inline-block; padding-right: 10px">
        Wind: {{ hour.wind.dir }} {{ hour.wind.speed }}
      </p>
    </div>
  </li>
</template>

<script>
export default {
  props: ["hour"],
  data() {
    return {
      show: false,
    };
  },

  methods: {
    toggleDisplay() {},
  },

  computed: {},

  mounted() {},
};
</script>
