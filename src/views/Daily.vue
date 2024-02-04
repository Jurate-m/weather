<template>
  <h1>Daily</h1>
  <div v-if="dailyWeather">
    <div v-if="dailyWeather">
      <Listing v-for="single in dailyWeather">
        <ListingSingle
          :data="single"
          :date="formatDate(new Date(single.day))"
          :icon="single.icon"
          :temperature="`${single.temperature_min}° / ${single.temperature_max}°`"
          :humidity="single.humidity"
          :windDir="single.wind.dir"
          :windSpeed="single.wind.speed"
          :details="[
            {
              image: '.',
              title: 'Feels like',
              description: `${single.feels_like}°C`,
            },
            {
              image: '.',
              title: 'Wind',
              description: `${single.wind.dir} ${single.wind.speed}m/s`,
            },
            {
              image: '.',
              title: 'Humidity',
              description: `${single.humidity}%`,
            },
            {
              image: '.',
              title: 'Cloud Cover',
              description: `${single.cloud_cover}%`,
            },
            {
              image: `${single.precipitation.total == 'rain' ? './' : './'}`,
              title: 'Precipitation',
              description: `${single.precipitation.total}%`,
            },
          ]"
        >
          <template #summary>{{ single.summary }}</template>
          <template #details> </template>
        </ListingSingle>
      </Listing>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import Row from "@/layouts/Row.vue";
import Column from "@/layouts/Column.vue";
import { formatDate } from "@/utils.js";

export default {
  data() {
    return {
      dailyWeather: null,
      astroData: null,
    };
  },

  components: { Loader, Listing, ListingSingle, Row, Column },

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

    formatDate(date) {
      return formatDate(date, {
        weekday: "short",
        day: "numeric",
      });
    },
  },

  beforeMount() {
    if (sessionStorage.getItem("lastDailyApiTimeStmp")) {
      let sessionTime = new Date(
        sessionStorage.getItem("lastDailyApiTimeStmp")
      );
      let current = new Date();
      if (
        sessionTime.getHours() != current.getHours() ||
        sessionTime.getDate() != current.getDate()
      ) {
        sessionStorage.removeItem("DailyWeather");
      }
    }
  },

  created() {
    this.fetchData();
  },
};
</script>
