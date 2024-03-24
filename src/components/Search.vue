<template>
  <div class="search" :class="activeClass" @click="show()" v-click-out="clear">
    <div class="search__trigger">
      <form @submit.prevent="sendData()">
        <div class="search__inner">
          <button
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
        <p v-if="inputError" id="err" class="search__error">
          Please use only alphabetical or numerical values in Location search.
        </p>
        <div
          v-else
          class="search__dropdown"
          v-show="active && (locationArr.length || !currentLocationPermission)"
        >
          <div
            v-if="!currentLocationPermission"
            class="search__current-location"
          >
            <button @click.prevent="useCurrentLocation()">
              Use current location
            </button>
          </div>
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
    <Popup
      v-show="activePopup && !!currentLocationError"
      :message="currentLocationError"
      @popupAction="closePopup()"
    >
    </Popup>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const selectedLocation = ref(null);

// Generating Locations List from user input START----------------------------
const locationInput = ref(null);
const locationArr = ref([]);

// remove whitespace around locationInput
const trimmedInput = computed(() => {
  if (locationInput.value) return locationInput.value.trim();
});

// computed property for changing form button properties
const validSubmit = computed(() => {
  return active.value && trimmedInput.value && !inputError.value;
});

async function getLocationList() {
  if (!trimmedInput.value) return;

  const params = new URLSearchParams({
    endpoint: "find_places_prefix",
    text: locationInput.value.toString(),
    language: "en",
  });

  return await fetch(`/.netlify/functions/weather?${params.toString()}`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((item) => {
        locationArr.value.push({
          name: item.name,
          admin_area: item.adm_area1,
          place_id: item.place_id,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

const timer = ref(null);

function renderLocationList() {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  timer.value = setTimeout(getLocationList, 1000);
}

// Generating Locations List from user input END----------------------------

// Location Input validation START----------------------------
const regex = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/;
const inputError = ref(false);

function testingRegex(arg) {
  return regex.test(arg);
}

// Check and return a boolena if trimmed input value contains provided regex
const invalidInput = computed(() => {
  return testingRegex(trimmedInput.value);
});

// watch if invalidInput computed property changes and assign returned value to input error state
watch(invalidInput, (newValue) => {
  inputError.value = newValue;
});

watch(trimmedInput, (newValue, oldValue) => {
  if (trimmedInput.value) {
    // variable for checking if oldValue exists AND if it starts with a newValue
    let oldValueStartsWithNewValue = oldValue && oldValue.startsWith(newValue);

    // variable for checking if oldValue does have spaecial characters
    let oldValueContainsRegex = testingRegex(oldValue);

    // comparison variable for:
    let passCondition_1 =
      // checking IF oldValue exists AND
      oldValue &&
      // oldValue starts with newValue AND
      oldValueStartsWithNewValue &&
      // olValue has special characters AND
      oldValueContainsRegex &&
      // if there is no special charakters in current input value
      !inputError.value;

    let passCondition_2 =
      oldValue && !oldValueStartsWithNewValue && !inputError.value;

    let passCondition_3 =
      oldValue &&
      // oldValue starts with newValue AND
      oldValueStartsWithNewValue &&
      // there is no input error AND
      !inputError.value &&
      // there are no available locations
      !locationArr.value.length;

    if (
      // there is no oldValue and input value doesn't contain error OR
      (!oldValue && !inputError.value) ||
      // there is no oldValue and input value doesn't contain error OR
      passCondition_1 ||
      passCondition_2 ||
      passCondition_3
    ) {
      locationArr.value = [];
      renderLocationList();
    }
  } else {
    locationArr.value = [];
  }
});

// Location Input validation END----------------------------

// Current location START ----------------------------------
const currentLocationPermission = ref(false);
const activePopup = ref(true);

function geolocationStateHandler(state) {
  currentLocationPermission.value = state === "granted";
}

// Event listener for permissions change
navigator.permissions
  .query({ name: "geolocation" })
  .then((permissionStatus) => {
    geolocationStateHandler(permissionStatus.state);

    permissionStatus.onchange = () => {
      geolocationStateHandler(permissionStatus.state);
    };
  });

const currentLocationError = computed(() => {
  return store.state.location.error;
});

async function useCurrentLocation() {
  await store
    .dispatch("location/getUserLocation", "getCurrentUserPosition")
    .catch(() => {
      activePopup.value = true;
    });
}

function closePopup() {
  if (activePopup.value) {
    activePopup.value = false;
  } else {
    return;
  }
}

// Current location END ----------------------------------

function clear() {
  selectedLocation.value = null;
  locationArr.value = [];
  locationInput.value = null;
  active.value = false;
}

function selectLocation(data) {
  selectedLocation.value = data;
  sendData();
}

function sendData() {
  if (
    // there is a value in the input AND
    trimmedInput.value &&
    // there are no errors AND
    !inputError.value &&
    // there are generated locations
    locationArr.value.length
  ) {
    // define location ID
    let place_id = selectedLocation.value
      ? selectedLocation.value.place_id
      : locationArr.value[0].place_id;

    // define location name
    let place_name = selectedLocation.value
      ? selectedLocation.value.name
      : locationArr.value[0].name;

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

import Popup from "@/components/Popup.vue";

export default {
  components: { Popup },
};
</script>
