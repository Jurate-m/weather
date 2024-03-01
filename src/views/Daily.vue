<template>
  <div v-if="dailyWeather">
    <h1 class="mb-60">{{ location }}, <br />Daily Weather</h1>

    <Listing full_width class="mb-30">
      <ListingSingle v-for="item in dailyWeather">
        <template #button
          ><WeatherSummaryCard
            :date="formatDateTime(new Date(item.day))"
            :icon="item.icon"
            :temperature="item.temperature"
            :humidity="item.humidity"
            :windDir="item.wind.dir"
            :windSpeed="item.wind.speed"
          ></WeatherSummaryCard
        ></template>
        <template #details>
          <WeatherDetailsCard
            class="listing-single__details"
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
          ></WeatherDetailsCard>
        </template>
      </ListingSingle>
    </Listing>
  </div>
</template>

<script>
import WeatherDetailsCard from "@/components/WeatherDetailsCard.vue";
import WeatherSummaryCard from "@/components/WeatherSummaryCard.vue";
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import { formatDateTime } from "@/utils";

export default {
  components: {
    Listing,
    ListingSingle,
    WeatherSummaryCard,
    WeatherDetailsCard,
  },

  data() {
    return {
      dailyWeather: null,
      astroData: null,
      details: null,
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
  },

  methods: {
    fetchData() {
      return this.$store.dispatch("daily/getDailyWeather");
    },

    async assignData() {
      if (sessionStorage.getItem("DailyWeather")) {
        sessionStorage.removeItem("DailyWeather");
      }

      try {
        await this.fetchData();
      } catch (error) {
        console.error(error);
      }

      this.dailyWeather = JSON.parse(sessionStorage.getItem("DailyWeather"));
    },

    formatDateTime(date) {
      return formatDateTime(date, {
        weekday: "short",
        day: "numeric",
      });
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
    this.assignData();
  },
};
</script>
