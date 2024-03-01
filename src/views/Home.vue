<!-- Side note :
  1. get astro data
  2. compare time
  3. if past sunrise, but not sunset yet -light bg
  4. else - dark bg
-->

<template>
  <div v-if="weather" class="home">
    <h1 v-if="location" class="mb-20">{{ location }}, <br />Current Weather</h1>
    <div class="home__lists">
      <Listing>
        <ListingSingle
          v-for="(item, index) in weather"
          featured
          v-show="index === activeIndex"
          :key="new Date()"
        >
          <template #featured>
            <FeaturedCard :data="item"></FeaturedCard>
          </template>
        </ListingSingle>
      </Listing>
      <Listing>
        <ListingSingle
          v-for="(item, index) in weather"
          customEvent
          @set-active="setActive(index)"
          :class="{ active: index === activeIndex }"
        >
          <template #button
            ><FeaturedListCard :data="item"></FeaturedListCard></template
        ></ListingSingle>
      </Listing>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/views/_home.scss";
import FeaturedCard from "@/components/FeaturedCard.vue";
import FeaturedListCard from "@/components/FeaturedListCard.vue";
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";

export default {
  components: {
    FeaturedCard,
    Listing,
    ListingSingle,
    FeaturedListCard,
  },

  data() {
    return {
      weather: null,
      // astroData: null,
      activeIndex: 0,
      dataLength: 8,
      location: sessionStorage.getItem("LocationName"),
    };
  },

  watch: {
    locationId() {
      this.assignData();
    },

    locationName() {
      this.location = sessionStorage.getItem("LocationName");
    },
  },

  computed: {
    locationId() {
      return this.$store.state.location.locationId;
    },

    locationName() {
      return this.$store.state.location.locationName;
    },

    routeStuff() {
      console.log(this.$route);
    },
  },

  methods: {
    fetchData() {
      return this.$store.dispatch("hourly/getHourlyWeather");
    },

    async assignData() {
      if (sessionStorage.getItem("HourlyWeather")) {
        sessionStorage.removeItem("HourlyWeather");
      }

      try {
        await this.fetchData();
      } catch (error) {
        console.error(error);
      }

      let weather = JSON.parse(sessionStorage.getItem("HourlyWeather"));
      this.assignWeather(weather);
    },

    assignWeather(data) {
      const remainingArray = this.dataLength - data[0].length;

      if (remainingArray > 0) {
        this.weather = data[0].concat(data[1].slice(0, remainingArray));
        return;
      }

      this.weather = data[0].slice(0, this.dataLength);
    },

    setActive(index) {
      this.activeIndex = index;
    },
  },

  // beforeMount() {
  //   if (sessionStorage.getItem("lastHourlyApiTimeStmp")) {
  //     let sessionTime = new Date(
  //       sessionStorage.getItem("lastHourlyApiTimeStmp")
  //     );
  //     let current = new Date();
  //     if (
  //       sessionTime.getHours() != current.getHours() ||
  //       sessionTime.getDate() != current.getDate()
  //     ) {
  //       sessionStorage.removeItem("HourlyWeather");
  //     }
  //   }
  // },

  created() {
    this.assignData();
  },
};
</script>
