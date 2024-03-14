<template>
  <div :class="classes" v-click-out="hide">
    <div class="search__trigger" @click="show()">
      <form @submit.prevent="sendData()">
        <div class="search__inner">
          <button
            :type="active ? 'submit' : 'button'"
            :aria-label="active ? 'Open Search' : 'Submit'"
          >
            <img src="/assets/icons/search.svg" alt="search icon" />
          </button>
          <input
            type="text"
            title="Search for location"
            placeholder="Location"
            v-model="locationInput"
            @keyup="renderLocationList()"
            aria-errormessage="err"
          />
        </div>
        <p v-if="error" id="err" class="search__error">
          Please use only alphabetical or numerical values in Location search.
        </p>

        <div
          v-else
          class="search__dropdown"
          :class="dropdownClass"
          v-show="active != false && locationArr"
        >
          <fieldset>
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
      error: false,
    };
  },

  methods: {
    show() {
      return (this.active = true);
    },

    hide() {
      this.active = false;
      this.locationInput = null;
      this.locationArr = null;
      this.active = false;
      this.error = false;
    },

    async getLocationList() {
      if (this.locationInput) {
        this.locationArr = [];
        const regex = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;

        if (regex.test(this.locationInput)) {
          return (this.error = true);
        }

        this.error = false;

        try {
          const params = new URLSearchParams({
            endpoint: "find_places_prefix",
            text: this.locationInput.toString(),
            language: "en",
          });

          const resp = await fetch(
            `/.netlify/functions/weather?${params.toString()}`
          );

          const data = await resp.json();

          data.forEach((item) => {
            this.locationArr.push({
              name: item.name,
              admin_area: item.adm_area1,
              place_id: item.place_id,
            });
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        this.locationArr = null;
        this.error = false;
      }
    },

    renderLocationList() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(this.getLocationList, 1000);
    },

    sendData() {
      if (this.locationInput && this.locationArr && !this.error) {
        this.place_id = this.selectedLocation
          ? this.selectedLocation.place_id
          : this.locationArr[0].place_id;
        this.place_name = this.selectedLocation
          ? this.selectedLocation.name
          : this.locationArr[0].name;

        this.$store.dispatch("location/setUserLocationId", this.place_id);
        this.$store.dispatch("location/setUserLocationName", this.place_name);

        this.hide();
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

    dropdownClass() {
      return {
        active: this.active && this.locationArr,
      };
    },
  },
};
</script>
