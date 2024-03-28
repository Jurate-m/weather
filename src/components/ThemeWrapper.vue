<template>
  <div :class="`theme theme--${timeOfDay}`"><slot></slot></div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const timeOfDay = ref(null);

if (!sessionStorage.getItem("astro_today")) {
  store.dispatch("astro/getAstro");
}

if (storeAstro.value) {
  checkDayTime();
}

const storeAstro = computed(() => {
  return (
    store.state.astro.astro || JSON.parse(sessionStorage.getItem("astro_today"))
  );
});

function checkDayTime() {
  const currentDate = new Date();
  const current = {
    hours: currentDate.getHours(),
    minutes: currentDate.getMinutes(),
  };
  const sunrise = storeAstro.value.sunrise;
  const sunset = storeAstro.value.sunset;

  if (current.hours >= 21 || current.hours < sunrise.hours) {
    return (timeOfDay.value = "night");
  } else if (current.hours >= sunrise.hours && current.hours < 12) {
    return (timeOfDay.value = "morning");
  } else if (current.hours >= 12 && current.hours < sunset.hours) {
    return (timeOfDay.value = "day");
  } else if (current.hours >= sunset.hours && current.hours < 21) {
    return (timeOfDay.value = "evening");
  }
}

watch(storeAstro, (newVal, oldVal) => {
  if (!oldVal) {
    checkDayTime();
  }
});
</script>

<script>
import "@/assets/scss/_themes.scss";
</script>
