<template>
  <div :class="classes" v-if="data && astro">
    <Row>
      <Column class="col-4">
        <div>
          <h3 style="text-align: center">
            {{ currentWeekday }}, {{ currentTime }}
          </h3>
          <div style="margin-bottom: 4em">
            <img
              style="display: block; margin: 0 auto"
              :src="`/src/assets/icons/weather/${data.icon_num}.png`"
            />
          </div>
          <h4 style="text-align: center">{{ data.summary }}</h4>
          <h3 style="text-align: center">{{ data.temperature }}°C</h3>
          <h5 style="text-align: center">Feels like {{ data.feels_like }}°C</h5>
        </div>
      </Column>
      <Column class="col-8">
        <div class="current-weather__details">
          <ul>
            <li>
              <p>Humidity:</p>
              <p>{{ data.humidity }}%</p>
            </li>
            <li>
              <p>Pressure:</p>
              <p>{{ data.pressure }}hPa</p>
            </li>

            <li>
              <p>Wind:</p>
              <p>{{ data.wind.dir }} {{ data.wind.speed }}m/s</p>
            </li>
            <li>
              <p>Wind gust:</p>
              <p>{{ data.wind.gust }} m/s</p>
            </li>
            <li>
              <p>Sunrise:</p>
              <p>
                {{
                  new Date(astro.sun.rise)
                    .getHours()
                    .toString()
                    .padStart(2, "0")
                }}:{{
                  new Date(astro.sun.rise)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")
                }}
              </p>
            </li>
            <li>
              <p>Sunset:</p>
              <p>
                {{
                  new Date(astro.sun.set)
                    .getHours()
                    .toString()
                    .padStart(2, "0")
                }}:{{
                  new Date(astro.sun.set)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")
                }}
              </p>
            </li>
            <li>
              <p>Moonphase:</p>
              <p>{{ modifyString(astro.moon.phase) }}</p>
            </li>
          </ul>
        </div>
      </Column>
    </Row>
  </div>
  <div v-else>
    <Loader></Loader>
    <p>Loading Current Weather</p>
  </div>
</template>

<script>
import Loader from "./Loader.vue";
import Row from "@/layouts/Row.vue";
import Column from "@/layouts/Column.vue";
import "@/assets/scss/components/_currentWeather.scss";
import { modifyString, formatDate } from "@/utils.js";

export default {
  props: ["data", "astro"],

  components: {
    Loader,
    Row,
    Column,
  },

  computed: {
    currentWeekday() {
      return formatDate(new Date(), { weekday: "long" });
    },

    currentTime() {
      return `${new Date().getHours()}:${new Date().getMinutes()}`;
    },

    classes() {
      return {
        "current-weather": true,
      };
    },
  },

  methods: {
    modifyString(arg) {
      return modifyString(arg);
    },
  },
};
</script>
