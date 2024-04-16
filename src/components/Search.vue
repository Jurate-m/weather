<template>
  <div class="search" :class="activeClass" @click="show()" v-click-out="clear">
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
          @click.prevent="clearInput()"
          aria-label="Clear input"
          v-show="trimmedInput && active"
        ></button>
      </div>
      <p v-if="inputErr.invalid" id="err" class="search__error">
        {{ inputErr.message }}
      </p>
      <div v-else class="search__dropdown" v-show="active">
        <div class="search__current-location">
          <button @click.prevent="useCurrentLocation()">
            Use current location
          </button>
        </div>
        <Loader v-if="loading"></Loader>
        <ul v-if="locationArr.length">
          <li
            v-for="item in locationArr"
            class="search__dropdown-item"
            :key="item.place_id"
          >
            <button type="button" @click.prevent="selectLocation(item)">
              {{ item.name }}
            </button>
          </li>
        </ul>
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
    .then(() => {
      loading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}

// Generating Locations List from user input END----------------------------

// Location Input validation START----------------------------

let timer = null;

watch(trimmedInput, (newVal, oldVal) => {
  if (trimmedInput.value) {
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

function clear() {
  selectedLocation.value = null;
  locationArr.value = [];
  locationInput.value = null;
  active.value = false;
  inputErr.value = {
    invalid: false,
    message: "",
  };
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
    locationArr.value.length
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
  }
}

const active = ref(false);

const activeClass = computed(() => {
  return {
    active: active.value,
  };
});

function show() {
  active.value = true;
}

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
