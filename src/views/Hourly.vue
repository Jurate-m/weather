<template>
  <div v-if="hourlyWeather">
    <h1 class="mb-60">{{ location }}, <br />Hourly Weather</h1>
    <div v-for="day in hourlyWeather">
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

<script>
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import WeatherDetailsCard from "@/components/WeatherDetailsCard.vue";
import WeatherSummaryCard from "@/components/WeatherSummaryCard.vue";
import Loader from "@/components/Loader.vue";
import { formatDateTime } from "@/utils";

export default {
  components: {
    Listing,
    ListingSingle,
    WeatherDetailsCard,
    WeatherSummaryCard,
    Loader,
  },

  data() {
    return {
      hourlyWeather: null,
      dataLength: 3,
      location: sessionStorage.getItem("LocationName"),
    };
  },

  watch: {
    locationId() {
      sessionStorage.removeItem("DailyWeather");
      sessionStorage.removeItem("HourlyWeather");
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
      return this.$store.dispatch("hourly/getHourlyWeather");
    },

    async assignData() {
      try {
        await this.fetchData();
      } catch (error) {
        console.error(error);
      }

      let hourlyWeather = JSON.parse(sessionStorage.getItem("HourlyWeather"));
      this.assignHourlyWeather(hourlyWeather);
    },

    formatDate(date, options) {
      return formatDateTime(date, options);
    },

    formatTime(time) {
      return formatDateTime(time, {
        hour: "numeric",
        minute: "numeric",
      });
    },

    assignHourlyWeather(data) {
      this.hourlyWeather = data.slice(0, this.dataLength);
    },
  },

  beforeMount() {
    if (sessionStorage.getItem("lastHourlyApiTimeStmp")) {
      let sessionTime = new Date(
        sessionStorage.getItem("lastHourlyApiTimeStmp")
      );
      let current = new Date();
      if (
        sessionTime.getHours() != current.getHours() ||
        sessionTime.getDate() != current.getDate()
      ) {
        sessionStorage.removeItem("HourlyWeather");
      }
    }
  },

  created() {
    if (sessionStorage.getItem("HourlyWeather")) {
      let hourlyWeather = JSON.parse(sessionStorage.getItem("HourlyWeather"));
      this.assignHourlyWeather(hourlyWeather);
    } else {
      this.assignData();
    }
  },
};
</script>
