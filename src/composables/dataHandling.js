import { ref, computed, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default function useDataHandling(
  sessionStorageName,
  timeStampName,
  storeAction,
  storeArgs,
  assignDataHandler = null
) {
  const store = useStore();
  const weather = ref(null);

  async function assignData() {
    try {
      await store.dispatch(storeAction, storeArgs);
    } catch (error) {
      console.error(error);
    }

    weather.value = JSON.parse(sessionStorage.getItem(sessionStorageName));

    if (assignDataHandler) assignDataHandler(weather.value);
  }

  const locationId = computed(() => {
    return (
      store.state.location.locationId || sessionStorage.getItem("location")
    );
  });

  const location = computed(() => {
    return (
      store.state.location.locationName || sessionStorage.getItem("location")
    );
  });

  watch(locationId, (newVal, oldVal) => {
    sessionStorage.removeItem("daily");
    sessionStorage.removeItem("hourly");

    if (oldVal !== null) assignData();
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
