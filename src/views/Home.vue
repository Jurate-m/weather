<template>
  <Listing
    v-if="weather"
    class="home"
    featured
    :data="weather"
    :activeIndex="activeIndex"
  >
    <template #featured="{ item }"
      ><FeaturedCard :data="item"></FeaturedCard></template
  ></Listing>

  <Listing
    :data="weather"
    :activeIndex="activeIndex"
    @set-active="handleSetActive"
  >
    <template #button="{ item }"
      ><FeaturedListCard :data="item"></FeaturedListCard
    ></template>
  </Listing>
</template>

<style>
ul.home:first-child > li {
  display: none;
}
ul.home:first-child > li.active {
  display: block;
}
</style>

<script>
import FeaturedList from "@/components/FeaturedList.vue";
import FeaturedCard from "@/components/FeaturedCard.vue";
import FeaturedListCard from "@/components/FeaturedListCard.vue";
import Listing from "@/components/Listing.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import Card from "@/layouts/Card.vue";
import { modifyString } from "@/utils.js";

export default {
  data() {
    return {
      weather: null,
      location: null,
      astroData: null,
      activeIndex: 0,
      dataLength: 6,
    };
  },

  components: {
    Card,
    WeatherCard,
    FeaturedCard,
    Listing,
    FeaturedList,
    FeaturedListCard,
  },

  methods: {
    async fetchData() {
      if (
        !sessionStorage.getItem("HourlyWeather") ||
        !sessionStorage.getItem("AstroData")
      ) {
        try {
          if (!sessionStorage.getItem("LocationId")) {
            await this.$store.dispatch("loadLocationId");
          }

          await this.$store.dispatch("hourly/getHourlyWeather");
          await this.$store.dispatch("astro/getAstroData");
        } catch (error) {
          console.log(error);
        }
      }

      this.location = modifyString(sessionStorage.getItem("LocationId"));
      const weather = JSON.parse(sessionStorage.getItem("HourlyWeather"));
      this.assignWeather(weather);
      this.astroData = JSON.parse(sessionStorage.getItem("AstroData"));
    },

    assignWeather(data) {
      const remainingArray = this.dataLength - data[0].length;

      if (remainingArray > 0) {
        this.weather = data[0].concat(data[1].slice(0, remainingArray));
        return;
      }

      this.weather = data[0].slice(0, this.dataLength);
    },

    handleSetActive(index) {
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
    this.fetchData();
  },
};
</script>
