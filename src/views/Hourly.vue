<template>
  <div v-if="weather">
    <h1
      v-if="location"
      style="font-weight: 700; letter-spacing: 1px"
      class="mb-30"
    >
      {{ location }}
    </h1>
    <div v-for="(day, index) in weather" class="mb-60">
      <h3 class="mb-10">
        {{
          formatDate(new Date(day[0].date), {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        }}
      </h3>
      <Card>
        <Listing>
          <ListingSingle
            v-for="(item, itemIndex) in day"
            accordion
            :index="index + itemIndex"
          >
            <template #button>
              <WeatherSummaryCard
                :date="formatTime(new Date(item.date))"
                :icon="item.icon"
                :weather_summary="item.weather"
                :temperature="item.temperature"
              ></WeatherSummaryCard>
            </template>
            <template #details>
              <DetailsCard :data="item"></DetailsCard>
            </template>
          </ListingSingle>
        </Listing>
      </Card>
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
  "hourly",
  "hourly_time_stmp",
  "weather/getWeather",
  {
    endpoint: "hourly",
    commitName_1: "separateDays",
    commitName_2: "setHourlyTimeStamp",
  },
  assignHourlyWeather
);
</script>

<script>
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import WeatherSummaryCard from "@/components/WeatherSummaryCard.vue";
import Loader from "@/components/Loader.vue";
import Card from "@/layouts/Card.vue";
import DetailsCard from "@/components/DetailsCard.vue";

export default {
  components: {
    Listing,
    ListingSingle,
    WeatherSummaryCard,
    Loader,
    Card,
    DetailsCard,
  },
};
</script>
