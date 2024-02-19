<template>
  <Listing v-if="weather" featured :data="weather" :activeIndex="activeIndex">
    <template #featured="{ item, index }">
      <FeaturedCard :data="item" v-show="index === activeIndex"></FeaturedCard>
    </template>
  </Listing>

  <Listing
    v-if="weather"
    :data="weather"
    :activeIndex="activeIndex"
    @set-active="handleSetActive"
  >
    <template #button="{ item }"
      ><FeaturedListCard :data="item"></FeaturedListCard
    ></template>
  </Listing>
</template>

<script>
import FeaturedCard from "@/components/FeaturedCard.vue";
import FeaturedListCard from "@/components/FeaturedListCard.vue";
import Listing from "@/components/Listing.vue";
import { modifyString } from "@/utils.js";

export default {
  data() {
    return {
      weather: null,
      location: null,
      astroData: null,
      activeIndex: 0,
      index: null,
      dataLength: 6,
    };
  },

  components: {
    FeaturedCard,
    Listing,
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
