<template>
  <div v-if="weather">
    <h1 class="mb-60">{{ location }}, <br />Hourly Weather</h1>
    <div v-for="day in weather">
      <h2 class="mb-30">
        {{
          formatDate(new Date(day[0].date), {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        }}
      </h2>
      <Listing full_width class="mb-60">
        <ListingSingle v-for="item in day">
          <template #button
            ><WeatherSummaryCard
              :date="formatTime(new Date(item.date))"
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
              :details="[
                {
                  image: 'termometer',
                  title: 'Feels like',
                  description: `${Math.round(item.feels_like)}°C`,
                },
                {
                  image: 'wind',
                  title: 'Wind',
                  description: `${item.wind.dir} ${item.wind.speed}m/s`,
                },
                {
                  image: 'drop',
                  title: 'Humidity',
                  description: `${item.humidity}%`,
                },
                {
                  image: '.',
                  title: 'Cloud Cover',
                  description: `${item.cloud_cover}%`,
                },
                {
                  image: `drop`,
                  title: 'Precipitation',
                  description: `${item.precipitation.total}%`,
                },
              ]"
            ></WeatherDetailsCard>
          </template>
        </ListingSingle>
      </Listing>
    </div>
  </div>
  <div v-else>
    <Loader light></Loader>
  </div>
</template>

<script setup>
import { formatDateTime } from "@/utils";
import useDataHandling from "@/composables/dataHandling.js";

import { ref } from "vue";

const weather = ref(null);
const dataLength = 3;

function formatDate(date, options) {
  return formatDateTime(date, options);
}

function formatTime(time) {
  return formatDateTime(time, {
    hour: "numeric",
    minute: "numeric",
  });
}

function assignHourlyWeather(data) {
  weather.value = data.slice(0, dataLength);
}

const { location } = useDataHandling(
  "HourlyWeather",
  "hourly/getHourlyWeather",
  assignHourlyWeather
);

//   beforeMount() {
//     if (sessionStorage.getItem("lastHourlyApiTimeStmp")) {
//       let sessionTime = new Date(
//         sessionStorage.getItem("lastHourlyApiTimeStmp")
//       );
//       let current = new Date();
//       if (
//         sessionTime.getHours() != current.getHours() ||
//         sessionTime.getDate() != current.getDate()
//       ) {
//         sessionStorage.removeItem("HourlyWeather");
//       }
//     }
//   },
</script>

<script>
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import WeatherDetailsCard from "@/components/WeatherDetailsCard.vue";
import WeatherSummaryCard from "@/components/WeatherSummaryCard.vue";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    Listing,
    ListingSingle,
    WeatherDetailsCard,
    WeatherSummaryCard,
    Loader,
  },
};
</script>
