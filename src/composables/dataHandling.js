import { ref, computed, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default function useDataHandling(
  sessionStorageName,
  timeStampName,
  storeAction,
  assignDataHandler = null
) {
  const store = useStore();

  const weather = ref(null);
  const location = ref(sessionStorage.getItem("LocationName") || null);

  function fetchData() {
    return store.dispatch(storeAction);
  }

  async function assignData() {
    try {
      await fetchData();
    } catch (error) {
      console.error(error);
    }

    weather.value = JSON.parse(sessionStorage.getItem(sessionStorageName));
    if (assignDataHandler) assignDataHandler(weather.value);
  }

  const locationId = computed(() => {
    return store.state.location.locationId;
  });

  const locationName = computed(() => {
    return store.state.location.locationName;
  });

  watch(locationId, () => {
    sessionStorage.removeItem("DailyWeather");
    sessionStorage.removeItem("HourlyWeather");
    assignData();
  });

  watch(locationName, () => {
    location.value = sessionStorage.getItem("LocationName");
  });

  if (sessionStorage.getItem(sessionStorageName)) {
    weather.value = JSON.parse(sessionStorage.getItem(sessionStorageName));
    if (assignDataHandler) assignDataHandler(weather.value);
  } else {
    assignData();
  }

  onBeforeMount(() => {
    if (sessionStorage.getItem(timeStampName)) {
      let sessionTime = new Date(sessionStorage.getItem(timeStampName));
      let current = new Date();
      if (
        sessionTime.getHours() != current.getHours() ||
        sessionTime.getDate() != current.getDate()
      ) {
        sessionStorage.removeItem(sessionStorageName);
      }
    }
  });

  return { weather, location };
}
