import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

// pass in sessionStorage name for weather

export default function useDataHandling(sessionStorageName) {
  const store = useStore();

  const weather = ref(null);
  const location = ref(sessionStorage.getItem("LocationName") || null);

  // pass in an arg if additional function is used
  async function assignData() {
    try {
      await fetchData();
    } catch (error) {
      console.error(error);
    }

    // let weather = JSON.parse(sessionStorage.getItem(sessionStorageName));
    // assignWeather(weather); not used on all components
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
    let weather = JSON.parse(sessionStorage.getItem(sessionStorageName));
    assignWeather(weather);
  } else {
    assignData();
  }
}
