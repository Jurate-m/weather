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
import useDataHandling from "@/composables/dataHandling.js";

const { weather, location } = useDataHandling(
  "dailyWeather",
  "lastDailyApiTimeStmp",
  "daily/getDailyWeather"
);

function formatTime(date) {
  return formatDateTime(date, {
    weekday: "short",
    day: "numeric",
  });
}
</script>

<script>
import WeatherDetailsCard from "@/components/WeatherDetailsCard.vue";
import WeatherSummaryCard from "@/components/WeatherSummaryCard.vue";
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    Listing,
    ListingSingle,
    WeatherSummaryCard,
    WeatherDetailsCard,
    Loader,
  },
};
</script>
