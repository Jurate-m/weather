<template>
  <Card>
    <Row>
      <Column class="col-5">
        <Search></Search>
      </Column>
      <Column class="col-5" justifyEnd>
        <h5>Vilnius</h5>
      </Column>
    </Row>
    <Row>
      <Column class="col-4">
        <WeatherCurrent></WeatherCurrent>
      </Column>
      <Column>
        <!-- <WeatherHourly :data="days[1]"></WeatherHourly> -->
      </Column>
    </Row>
  </Card>
</template>

<script>
import Search from "./Search.vue";
import Card from "@/layouts/Card.vue";
import Row from "@/layouts/Row.vue";
import Column from "@/layouts/Column.vue";
import WeatherCurrent from "./WeatherCurrent.vue";
import WeatherHourly from "./WeatherHourly.vue";

export default {
  props: [],

  components: {
    Card,
    Search,
    Row,
    Column,
    WeatherCurrent,
    WeatherHourly,
  },

  data() {
    return {
      days: null,
    };
  },

  beforeMount() {},
};
</script>
