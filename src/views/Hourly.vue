<template>
  <h1>Hourly</h1>

  <!-- <h5>
    <pre>{{ hourlyWeather }}</pre>
  </h5> -->

  <div v-if="hourlyWeather">
    <Listing v-for="item in hourlyWeather">
      <template #header>{{ formatDate(new Date(item[0].date)) }} </template>
      <ListingSingle
        v-for="single in item"
        :data="single"
        :date="String(new Date(single.date).getHours()).padStart(2, '0')"
        :icon="single.icon"
        :temperature="`${single.temperature}°`"
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
      </ListingSingle>
    </Listing>
  </div>
  <div else>
    <Loader />
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import { formatDate } from "@/utils.js";

export default {
  data() {
    return {
      hourlyWeather: null,
    };
  },

  components: { Loader, Listing, ListingSingle },

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

      this.hourlyWeather = JSON.parse(sessionStorage.getItem("HourlyWeather"));
    },

    formatDate(date) {
      return formatDate(date, {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    },
  },

  created() {
    this.fetchData();
  },
};
</script>
