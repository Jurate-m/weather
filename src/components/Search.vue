<template>
  <div :class="classes" v-click-out="hide">
    <div class="search__trigger" @click="show()">
      <form @submit.prevent="sendData()">
        <div class="search__inner">
          <!-- Have simple button and then transition to a submit when form is active -->
          <button type="submit">
            <img src="@/assets/icons/search.svg" />
          </button>
          <input
            type="text"
            placeholder="Location"
            v-model="locationInput"
            @keyup="renderLocationList()"
          />
        </div>
        <div class="search__dropdown" v-if="locationArr" v-show="active">
          <div
            v-for="item in locationArr"
            tabindex="0"
            class="search__dropdown-item"
          >
            <input
              type="radio"
              :id="item.place_id"
              :value="item"
              v-model="selectedLocation"
              @change="sendData()"
            />
            <label :for="item.place_id">{{ item.name }}</label>
          </div>
        </div>
      </form>
    </div>
    <!-- <div class="search__dropdown" v-show="this.active">
      <button
        v-if="!locationEnabled"
        @click="getCurrentLocation()"
        type="button"
      >
        <p>Use current location</p>
      </button>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import "@/assets/scss/components/_search.scss";

export default {
  data() {
    return {
      active: false,
      locationInput: null,
      locationArr: null,
      selectedLocation: null,
      timer: null,
      place_id: null,
      place_name: null,
    };
  },

  methods: {
    show() {
      return (this.active = true);
    },

    hide() {
      return (this.active = false);
    },

    getLocationList() {
      this.locationArr = [];
      if (this.locationInput) {
        axios
          .get(
            "https://ai-weather-by-meteosource.p.rapidapi.com/find_places_prefix",
            {
              params: {
                text: this.locationInput.toString(),
                language: "en",
              },
              headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
                "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
              },
            }
          )
          .then((result) => {
            result.data.forEach((item) => {
              this.locationArr.push({
                name: item.name,
                admin_area: item.adm_area1,
                place_id: item.place_id,
              });
            });
          })
          .catch((error) => console.error(error));
      }
    },
    // Sort this out^^^

    renderLocationList() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(this.getLocationList, 1500);
    },

    sendData() {
      if (this.locationInput && this.locationArr) {
        this.place_id = this.selectedLocation
          ? this.selectedLocation.place_id
          : this.locationArr[0].place_id;
        this.place_name = this.selectedLocation
          ? this.selectedLocation.name
          : this.locationArr[0].name;

        this.$store.dispatch("location/setUserLocationId", this.place_id);
        this.$store.dispatch("location/setUserLocationName", this.place_name);
        this.locationInput = null;
        this.locationArr = null;
        this.active = false;
      }
    },
  },

  computed: {
    classes() {
      return {
        search: true,
        "search--active": this.active,
      };
    },

    locationEnabled() {},
  },
};
</script>
