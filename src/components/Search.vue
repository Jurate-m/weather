<template>
  <div :class="classes" v-click-out="hide">
    <div class="search__trigger" @click="show()">
      <form @submit.prevent="sendData()">
        <div class="search__inner">
          <!-- Maybe add @click.prevent to prevent from submitting??? -->
          <button
            :type="active ? 'submit' : 'button'"
            :aria-label="active ? 'Open Search' : 'Submit'"
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
        </div>
        <!-- <p v-if="error" id="err" class="search__error">
          Please use only alphabetical or numerical values in Location search.
        </p> -->
        <!-- <div
          v-else
          class="search__dropdown"
          :class="dropdownClass"
          v-show="active"
        >
          <div class="searh__dropdown-location">
            <button
              v-if="!locationEnabled"
              @click.prevent="getCurrentLocation"
              type="button"
            >
              Use Current Location
            </button>
          </div>
          <fieldset v-show="locationArr">
            <legend>Locations</legend>
            <div v-for="item in locationArr" class="search__dropdown-item">
              <input
                type="radio"
                :id="item.place_id"
                :value="item"
                v-model="selectedLocation"
                @change.prevent="sendData()"
                :aria-label="item.name"
              />

              <label :for="item.place_id">{{ item.name }}</label>
            </div>
          </fieldset>
        </div> -->
      </form>
    </div>
  </div>
  <!-- <Teleport to="body"
    ><Popup v-if="errorPopup" :message="errorPopup" @popupAction="closePopup"></Popup
  ></Teleport> -->
</template>

<script setup>
import "@/assets/scss/components/_search.scss";

import { ref, computed, reactive, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const regex = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/;

const active = ref(false);
const locationInput = ref(null);
const locationArr = reactive([]);
const selectedLocation = ref(null);
const timer = ref(null);
const place_id = ref(null);
const place_name = ref(null);
const error = ref(false);
const errorPopup = ref(null);
const locationEnabled = ref(false);
const inputError = ref(false);

// CONVERT TO STRING JUST IN CASE

// remove whitespace around locationInput
const trimmedInputValue = computed(() => {
  if (locationInput.value) return locationInput.value.trim();
});

// Check and return a boolena if trimmed input value contains provided regex
const invalidInput = computed(() => {
  return regex.test(trimmedInputValue.value);
});

// maybe write a simple function and call it with an arg
function testingRegex(arg) {
  return regex.test(arg);
}

// watch if invalidInput computed property changes and assign returned value to input error state
watch(invalidInput, (newValue) => {
  // this feels hacky
  // if there is a new Value (which would be TRUE) and that value is TRUE
  if (newValue && newValue === true) inputError.value = newValue;
  // change back inputError to false AFTER something
});

watch(trimmedInputValue, (newValue, oldValue) => {
  if (trimmedInputValue.value) {
    console.log(inputError.value);
    // //jesus christ what a comparison
    // if (
    //   // check if there is no oldValue OR
    //   !oldValue ||
    //   // check if there is an oldValue AND
    //   (oldValue &&
    //     !testingRegex(newValue) &&
    //     testingRegex(oldValue) &&
    //     // if it contains new value, AND
    //     !oldValue.startsWith(newValue) &&
    //     // if the new Value is shorter than the old string
    //     newValue.length > oldValue.length)
    // ) {
    //   renderLocationList();
    //   // !!!!! I need to include error check (inputError.value) if the
    //   // it should fire on every event, right?
    //   // So how do I exclude startsWith and lenght check if on that particular change there was an error and now it is gone...?
    // }
    if (oldValue) {
      console.log();
    }
  }

  // call renderLocations array only if value has changed and
  // if doesn't start the same as old value and length is bigger?
  // (startsWith js function)
  // console.log(!!newVal); to return a bool
});

const classes = computed(() => {
  return {
    search: true,
    "search--active": active.value,
  };
});

const dropdownClass = computed(() => {
  return {
    active: active.value && locationArr.value,
  };
});

function show() {
  active.value = true;
}

function hide() {
  active.value = false;
}

// function closePopup() {
//   errorPopup.value = null;
// }

function getCurrentLocation() {
  store.dispatch("location/getCurrentUserLocation").catch((error) => {
    switch (error.code) {
      case 1:
        errorPopup.value =
          "Please enable location permission to retrieve data for current location.";
        break;
      case 2:
        errorPopup.value = "Location information is unavailable.";
        break;
      case 3:
        errorPopup.value = "The request to get user location timed out.";
        break;
      default:
        errorPopup.value = "Unknown error occured.";
    }
  });
}

async function getLocationList() {
  if (locationInput.value) {
    locationArr.value = [];

    error.value = false;

    try {
      const params = new URLSearchParams({
        endpoint: "find_places_prefix",
        text: locationInput.value.toString(),
        language: "en",
      });

      const resp = await fetch(
        `/.netlify/functions/weather?${params.toString()}`
      );

      const data = await resp.json();

      data.forEach((item) => {
        locationArr.value.push({
          name: item.name,
          admin_area: item.adm_area1,
          place_id: item.place_id,
        });
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    locationArr.value = [];
    error.value = false;
  }
}

function testTimerFunciton() {
  console.log("testing timer");
}

function renderLocationList() {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  timer.value = setTimeout(testTimerFunciton, 1000);
}

function sendData() {
  if (locationInput.value && locationArr.value && !error.value) {
    place_id.value = selectedLocation.value
      ? selectedLocation.value.place_id
      : locationArr[0].value.place_id;
    place_name.value = selectedLocation.value
      ? selectedLocation.value.name
      : locationArr[0].value.name;

    store.dispatch("location/setUserLocationId", place_id.value);
    store.dispatch("location/setUserLocationName", place_name.value);

    hide();
  }
}
</script>

<script>
export default {};
</script>
