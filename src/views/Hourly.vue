<template>
  <div v-if="hourlyWeather">
    <div v-for="(day, dayIndex) in hourlyWeather" class="py-30" :key="dayIndex">
      {{
        formatDate(new Date(day[0].date), {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      }}
      <ul class="listing listing--full-w">
        <li
          v-for="(item, itemIndex) in day"
          :class="{
            'listing-single': true,
            active: activeIndex[dayIndex] === itemIndex,
          }"
          :key="itemIndex"
        >
          <button @click="setActive(dayIndex, itemIndex)">
            <WeatherSummaryCard
              :date="formatTime(new Date(item.date))"
              :icon="item.icon"
              :temperature="item.temperature"
              :humidity="item.humidity"
              :windDir="item.wind.dir"
              :windSpeed="item.wind.speed"
            ></WeatherSummaryCard>
          </button>
          <WeatherDetailsCard
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
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Listing from "@/components/Listing.vue";
import WeatherDetailsCard from "@/components/WeatherDetailsCard.vue";
import WeatherSummaryCard from "@/components/WeatherSummaryCard.vue";
import { formatDateTime } from "@/utils";

export default {
  data() {
    return {
      hourlyWeather: null,
      activeIndex: {},
      dataLength: 3,
    };
  },

  components: { Listing, WeatherDetailsCard, WeatherSummaryCard },

  methods: {
    async fetchData() {
      if (!sessionStorage.getItem("HourlyWeather")) {
        try {
          if (!sessionStorage.getItem("LocationId")) {
            await this.$store.dispatch("loadLocationId");
          }
          await this.$store.dispatch("hourly/getHourlyWeather");
        } catch (error) {
          console.log(error);
        }
      }

      const hourlyWeather = JSON.parse(sessionStorage.getItem("HourlyWeather"));

      this.assignDailyWeather(hourlyWeather);
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

    assignDailyWeather(data) {
      this.hourlyWeather = data.slice(0, this.dataLength);
    },

    setActive(dayIndex, hourIndex) {
      this.activeIndex[dayIndex] = hourIndex;
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
