<template>
  <Card :class="classes">
    <Row>
      <Column>
        <h3 style="text-align: center" v-if="data.date">
          {{ formatDate(new Date(data.date), { weekday: "long" }) }},
          {{
            formatDate(new Date(data.date), {
              hour: "numeric",
              minute: "numeric",
            })
          }}
        </h3>
        <div style="margin-bottom: 4em">
          <img
            style="display: block; margin: 0 auto"
            :src="`/src/assets/icons/weather/${data.icon}.svg`"
          />
        </div>
        <h4 style="text-align: center">{{ data.summary }}</h4>
        <h3 style="text-align: center">{{ Math.round(data.temperature) }}°C</h3>
      </Column>
      <Column>
        <div class="featured-card__details">
          <ul>
            <li>
              <p>Feels like:</p>
              <p>{{ Math.round(data.feels_like) }}°C</p>
            </li>
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
              <p>{{ data.wind.gusts }} m/s</p>
            </li>
          </ul>
        </div>
      </Column>
    </Row>
  </Card>
</template>

<script>
import Card from "@/layouts/Card.vue";
import Row from "@/layouts/Row.vue";
import Column from "@/layouts/Column.vue";
import "@/assets/scss/components/_featuredCard.scss";
import { formatDateTime } from "@/utils.js";

export default {
  components: {
    Card,
    Row,
    Column,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        "featured-card": true,
      };
    },
  },

  methods: {
    formatDate(arg, options) {
      return formatDateTime(arg, options);
    },
  },
};
</script>
