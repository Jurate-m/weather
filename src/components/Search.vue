<!-- NTH -->

<!-- 
  Trigger request after timeout after typing (example 3s);
  Check items length
-->

<template>
  <div :class="classes" v-click-out="hide">
    <div class="search__trigger" @click="show()">
      <form>
        <button type="button">
          <img src="@/assets/icons/search.png" height="20" width="20" />
        </button>
        <input type="text" name="location-query" placeholder="Location" />
      </form>
    </div>
    <Transition>
      <div class="search__dropdown" v-show="this.active">
        <button
          v-if="!locationEnabled"
          @click="getCurrentLocation"
          type="button"
        >
          <img src="@/assets/icons/location.png" height="20" width="20" />
          <p>Use current location</p>
        </button>
        <!-- Show list if there are recent searches -->
        <ul></ul>
        <div>
          <!-- Display recent searches -->
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import "../assets/scss/components/_search.scss";

export default {
  data() {
    return {
      active: false,
    };
  },

  methods: {
    show() {
      return (this.active = true);
    },

    hide() {
      return (this.active = false);
    },

    getCurrentLocation() {
      this.$store.dispatch("setClientLocation");
    },
  },

  computed: {
    classes() {
      return {
        search: true,
        "search--active": this.active,
      };
    },

    locationEnabled() {
      return this.$store.getters.checkIfLocationEnabled;
    },
  },
};
</script>
