<template>
  <div v-if="dailyWeather">
    <Listing
      :data="dailyWeather"
      :activeIndex="activeIndex"
      @set-active="setActive"
      extended
    >
      <template #button="{ item }"
        ><WeatherSummaryCard
          :date="formatDateTime(new Date(item.day))"
          :icon="item.icon"
          :temperature="item.temperature"
          :humidity="item.humidity"
          :windDir="item.wind.dir"
          :windSpeed="item.wind.speed"
        ></WeatherSummaryCard
      ></template>
      <template #details="{ item, index }">
        <!-- <Transition name="slide-down"> -->
        <WeatherDetailsCard
          v-show="index === activeIndex"
          :summary="item.summary"
          :details="[
            {
              image: '.',
              title: 'Feels like',
              description: `${item.feels_like}°C`,
            },
            {
              image: '.',
              title: 'Wind',
              description: `${item.wind.dir} ${item.wind.speed}m/s`,
            },
            {
              image: '.',
              title: 'Humidity',
              description: `${item.humidity}%`,
            },
            {
              image: '.',
              title: 'Cloud Cover',
              description: `${item.cloud_cover}%`,
            },
            {
              image: `${item.precipitation.total == 'rain' ? './' : './'}`,
              title: 'Precipitation',
              description: `${item.precipitation.total}%`,
            },
          ]"
        >
          ></WeatherDetailsCard
        >
        <!-- </Transition> -->
      </template>
    </Listing>
  </div>
</template>

<script>
import WeatherDetailsCard from "@/components/WeatherDetailsCard.vue";
import WeatherSummaryCard from "@/components/WeatherSummaryCard.vue";
import Listing from "@/components/Listing.vue";
import { formatDateTime } from "@/utils";

export default {
  data() {
    return {
      dailyWeather: null,
      astroData: null,
      details: null,
      activeIndex: 0,
    };
  },

  components: {
    Listing,
    WeatherSummaryCard,
    WeatherDetailsCard,
  },

  methods: {
    async fetchData() {
      if (
        !sessionStorage.getItem("DailyWeather") ||
        !sessionStorage.getItem("AstroData")
      ) {
        try {
          if (!sessionStorage.getItem("LocationId")) {
            await this.$store.dispatch("loadLocationId");
          }
          await this.$store.dispatch("daily/getDailyWeather");
          await this.$store.dispatch("astro/getAstroData");
        } catch (error) {
          console.log(error);
        }
      }

      this.dailyWeather = JSON.parse(sessionStorage.getItem("DailyWeather"));
      this.astroData = JSON.parse(sessionStorage.getItem("AstroData"));
    },

    formatDateTime(date) {
      return formatDateTime(date, {
        weekday: "short",
        day: "numeric",
      });
    },

    setActive(index) {
      this.activeIndex = index;
    },
  },

  // beforeMount() {
  //   if (sessionStorage.getItem("lastDailyApiTimeStmp")) {
  //     let sessionTime = new Date(
  //       sessionStorage.getItem("lastDailyApiTimeStmp")
  //     );
  //     let current = new Date();
  //     if (
  //       sessionTime.getHours() != current.getHours() ||
  //       sessionTime.getDate() != current.getDate()
  //     ) {
  //       sessionStorage.removeItem("DailyWeather");
  //     }
  //   }
  // },

  created() {
    this.fetchData();
  },
};
</script>
