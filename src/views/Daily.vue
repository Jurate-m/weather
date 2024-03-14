<template>
  <div v-if="weather">
    <h1 class="mb-60">{{ location }}, <br />Daily Weather</h1>

    <Listing full_width class="mb-30">
      <ListingSingle v-for="item in weather">
        <template #button
          ><WeatherSummaryCard
            :date="formatTime(new Date(item.day))"
            :icon="item.icon"
            :weather_summary="item.weather"
            :temperature="item.temperature"
            :humidity="item.humidity"
            :wind_dir="item.wind.dir"
            :wind_speed="item.wind.speed"
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
                description: `${Math.round(item.feels_like)}°C`,
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
  <div v-else>
    <Loader light></Loader>
  </div>
</template>

<script setup>
import { formatDateTime } from "@/utils";

import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const weather = ref(null);
const location = ref(sessionStorage.getItem("LocationName") || null);

function fetchData() {
  return store.dispatch("daily/getDailyWeather");
}

async function assignData() {
  try {
    await fetchData();
  } catch (error) {
    console.error(error);
  }

  weather.value = JSON.parse(sessionStorage.getItem("DailyWeather"));
}

function formatTime(date) {
  return formatDateTime(date, {
    weekday: "short",
    day: "numeric",
  });
}

const locationId = computed(() => {
  return store.state.location.locationId;
});

const locationName = computed(() => {
  return store.state.location.locationName;
});

watch(locationId, () => {
  sessionStorage.removeItem("DailyWeather");
  sessionStorage.removeItem("HourlyWeather");
  assignData();
});

watch(locationName, () => {
  location.value = sessionStorage.getItem("LocationName");
});

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

if (sessionStorage.getItem("DailyWeather")) {
  weather.value = JSON.parse(sessionStorage.getItem("DailyWeather"));
} else {
  assignData();
}
</script>

<script>
import WeatherDetailsCard from "@/components/WeatherDetailsCard.vue";
import WeatherSummaryCard from "@/components/WeatherSummaryCard.vue";
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import Loader from "@/components/Loader.vue";
// import { formatDateTime } from "@/utils";

export default {
  components: {
    Listing,
    ListingSingle,
    WeatherSummaryCard,
    WeatherDetailsCard,
    Loader,
  },

  // data() {
  //   return {
  //     dailyWeather: null,
  //     details: null,
  //     location: sessionStorage.getItem("LocationName"),
  //   };
  // },

  // watch: {
  //   locationId() {
  //     sessionStorage.removeItem("DailyWeather");
  //     sessionStorage.removeItem("HourlyWeather");
  //     this.assignData();
  //   },

  //   locationName() {
  //     this.location = sessionStorage.getItem("LocationName");
  //   },
  // },

  // computed: {
  //   locationId() {
  //     return this.$store.state.location.locationId;
  //   },

  //   locationName() {
  //     return this.$store.state.location.locationName;
  //   },
  // },

  // methods: {
  //   fetchData() {
  //     return this.$store.dispatch("daily/getDailyWeather");
  //   },

  //   async assignData() {
  //     try {
  //       await this.fetchData();
  //     } catch (error) {
  //       console.error(error);
  //     }

  //     this.dailyWeather = JSON.parse(sessionStorage.getItem("DailyWeather"));
  //   },

  //   formatDateTime(date) {
  //     return formatDateTime(date, {
  //       weekday: "short",
  //       day: "numeric",
  //     });
  //   },
  // },

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

  // created() {
  //   if (sessionStorage.getItem("DailyWeather")) {
  //     this.dailyWeather = JSON.parse(sessionStorage.getItem("DailyWeather"));
  //   } else {
  //     this.assignData();
  //   }
  // },
};
</script>
