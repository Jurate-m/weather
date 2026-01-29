<template>
  <div v-if="weather" class="wrapper">
    <h1 style="font-weight: 700; letter-spacing: 1px">
      {{ location }}
    </h1>
    <Card>
      <Listing>
        <ListingSingle
          v-for="(item, itemIndex) in weather"
          accordion
          :index="itemIndex"
        >
          <template #button>
            <WeatherSummaryCard
              :date="formatTime(new Date(item.day))"
              :icon="item.icon"
              :weather_summary="item.weather"
              :temperature="`${Math.round(item.temperature_max)} / ${Math.round(
                item.temperature_min,
              )}`"
            ></WeatherSummaryCard>
          </template>
          <template #details>
            <div>
              <div style="padding: 20px 30px 0">
                <p style="font-size: 1.4rem">{{ item.summary }}</p>
              </div>
              <Card bordered>
                <DetailsCard
                  separator
                  :details="[
                    {
                      title: 'Feels like (Day)',
                      value: `${Math.round(item.feels_like_max)}°C`,
                    },
                    {
                      title: 'Feels like (Night)',
                      value: `${Math.round(item.feels_like_min)}°C`,
                    },

                    {
                      title: 'Precipitation',
                      value: `${Math.round(item.precipitation.total)}mm/h`,
                    },
                    {
                      title: 'Humidity',
                      value: `${item.humidity}%`,
                    },
                    {
                      title: 'Wind',
                      value: `${item.wind.dir} ${Math.round(
                        item.wind.speed,
                      )}m/s`,
                    },
                    {
                      title: 'Pressure',
                      value: `${item.pressure}hPa`,
                    },
                  ]"
                ></DetailsCard>
              </Card>
            </div>
          </template>
        </ListingSingle>
      </Listing>
    </Card>
  </div>
  <div v-else>
    <Loader light></Loader>
  </div>
</template>

<script setup>
import { formatDateTime } from "@/utils";
import useDataHandling from "@/composables/dataHandling.js";

const { weather, location } = useDataHandling(
  "daily",
  "daily_time_stmp",
  "weather/getWeather",
  {
    endpoint: "daily",
    commitName_1: "assignDailyWeather",
    commitName_2: "setDailyTimeStamp",
  },
);

function formatTime(date) {
  return formatDateTime(date, {
    weekday: "short",
    day: "numeric",
  });
}
</script>

<script>
import WeatherSummaryCard from "@/components/WeatherSummaryCard.vue";
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import Loader from "@/components/Loader.vue";
import Card from "@/components/layouts/Card.vue";
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

<style></style>
