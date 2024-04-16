<template>
  <div
    class="search"
    :class="activeClass"
    @click="
      {
        active = true;
      }
    "
    v-click-out="clear"
  >
    <form @submit.prevent="sendData()">
      <div class="search__inner">
        <button
          class="search__submit"
          :type="validSubmit ? 'submit' : 'button'"
          :aria-label="validSubmit ? 'Search' : 'Open Search'"
        >
          <img src="/assets/icons/search.svg" alt="search icon" />
        </button>
        <input
          type="text"
          title="Search for location"
          placeholder="Search for location"
          v-model="locationInput"
          aria-errormessage="err"
        />
        <button
          class="search__clear"
          type="button"
          @click="clearInput()"
          aria-label="Clear input"
          v-show="trimmedInput && active"
        ></button>
      </div>
      <div class="search__dropdown" v-show="active">
        <div class="search__current-location">
          <button type="button" @click="useCurrentLocation()">
            Use current location
          </button>
        </div>
        <p v-if="inputErr.invalid" id="err" class="search__error">
          {{ inputErr.message }}
        </p>
        <div v-else>
          <Loader v-if="loading"></Loader>
          <ul v-if="locationArr.length">
            <li
              v-for="item in locationArr"
              class="search__dropdown-item"
              :key="item.place_id"
            >
              <button type="button" @click="selectLocation(item)">
                {{ item.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const selectedLocation = ref(null);
const loading = ref(false);

const inputErr = ref({
  invalid: false,
  message: "",
});

const locationInput = ref(null);
// remove whitespace around locationInput
const trimmedInput = computed(() => {
  if (locationInput.value) return locationInput.value.trim();
});

function testingRegex(arg) {
  return /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/.test(arg);
}

// Check and return a boolena if trimmed input value contains provided regex
const invalidInput = computed(() => {
  return testingRegex(trimmedInput.value);
});

watch(invalidInput, (newVal) => {
  if (newVal === true) {
    return (inputErr.value = {
      invalid: newVal,
      message:
        "Please use only alphabetical or numerical values in Location search.",
    });
  }
  return (inputErr.value = {
    invalid: newVal,
    message: "",
  });
});

// Generating Locations List from user input START----------------------------

const locationArr = ref([]);

// computed property for changing form button properties
const validSubmit = computed(() => {
  return active.value && trimmedInput.value && !inputErr.value.invalid;
});

async function getLocationList() {
  if (!trimmedInput.value || invalidInput.value) return (loading.value = false);

  const params = new URLSearchParams({
    endpoint: "find_places_prefix",
    text: locationInput.value.toString(),
    language: "en",
  });

  return await fetch(`/.netlify/functions/weather?${params.toString()}`)
    .then((response) => response.json())
    .then((response) => {
      loading.value = false;
      if (!response.length) {
        return (inputErr.value = {
          invalid: true,
          message: "No results were found. Please check your spelling",
        });
      }

      response.forEach((item) => {
        locationArr.value.push({
          name: item.name,
          admin_area: item.adm_area1,
          place_id: item.place_id,
        });
      });

      inputErr.value = {
        invalid: false,
        message: "",
      };
    })
    .catch((error) => {
      return (inputErr.value = {
        invalid: true,
        message: "Something went wrong... Please try again later",
      });
    });
}

// Generating Locations List from user input END----------------------------

// Location Input validation START----------------------------

function clear() {
  selectedLocation.value = null;
  locationArr.value = [];
  locationInput.value = null;
  inputErr.value = {
    invalid: false,
    message: "",
  };
  active.value = false;
}

let timer = null;

watch(trimmedInput, (newVal, oldVal) => {
  if (newVal) {
    // variable for checking if values don't have spaecial characters
    let oldValueContainsRegex = testingRegex(oldVal);
    let newValContainsRegex = testingRegex(newVal);

    if (
      (!oldVal && !newValContainsRegex) ||
      (oldVal && !newValContainsRegex) ||
      (oldVal && oldValueContainsRegex && !newValContainsRegex)
    ) {
      locationArr.value = [];
      loading.value = true;
      clearTimeout(timer);
      timer = setTimeout(getLocationList, 1500);
    }
  } else {
    clear();
  }
});

async function useCurrentLocation() {
  await store
    .dispatch("location/getUserLocation", "getIpUserLocation")
    .catch(() => {
      console.error(error);
    });

  clear();
}

function selectLocation(data) {
  selectedLocation.value = data;
  sendData();
}

function sendData() {
  if (
    // there are no errors AND
    !invalidInput.value &&
    // there are generated locations
    locationArr.value.length &&
    // there is no input error
    !inputErr.value.invalid
  ) {
    // define location ID
    let place_id =
      selectedLocation.value?.place_id || locationArr.value[0].place_id;

    // define location name
    let place_name = selectedLocation.value?.name || locationArr.value[0].name;

    if (place_id && place_name) {
      store.dispatch("location/assignLocationId", place_id);
      store.dispatch("location/assignLocationName", place_name);

      clear();
    }
  } else {
    return false;
  }
}

const active = ref(false);

const activeClass = computed(() => {
  return {
    active: active.value,
  };
});

function clearInput() {
  locationInput.value = null;
}
</script>

<script>
import "@/assets/scss/components/_search.scss";

import Loader from "@/components/Loader.vue";

export default {
  components: {
    Loader,
  },
};
</script>
