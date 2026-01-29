<template>
  <div :class="`theme--${timeOfDay} theme`"><slot></slot></div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const timeOfDay = ref(null);

if (!sessionStorage.getItem("astro_today")) {
  store.dispatch("astro/getAstro");
}

const storeAstro = computed(() => {
  return (
    store.state.astro.astro || JSON.parse(sessionStorage.getItem("astro_today"))
  );
});

if (storeAstro.value) {
  checkDayTime();
}

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
    return (timeOfDay.value = "daytime");
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

<style>
.theme {
  height: 100%;

  background: var(--bg-1);

  background: linear-gradient(45deg, var(--bg-1) 0%, var(--bg-2) 100%);

  background: -moz-linear-gradient(45deg, var(--bg-1) 0%, var(--bg-2) 100%);

  background: -webkit-linear-gradient(45deg, var(--bg-1) 0%, var(--bg-2) 100%);

  background-attachment: fixed;
}
.theme--morning,
.theme--theme {
  --bg-primary: 255, 255, 255;

  color: black;

  .c-secondary {
    color: #252424;
  }
}

.theme--morning {
  --bg-1: rgb(0, 97, 255);
  --bg-2: rgb(96, 239, 255);
}

.theme--daytime {
  --bg-1: rgb(255, 147, 15);
  --bg-2: rgb(255, 249, 91);
}

.theme--evening,
.theme--night {
  --bg-primary: 0, 0, 0;
  color: #fff;

  .c-secondary {
    color: #cfcfcf;
  }
}

.theme--evening {
  --bg-1: rgb(0, 3, 40);
  --bg-2: rgb(255, 147, 15);
}

.theme--night {
  --bg-1: rgb(0, 3, 40);
  --bg-2: rgb(0, 69, 142);
}
</style>
