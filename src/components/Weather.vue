<template>
  <Card>
    <Row>
      <Col class="col-5">
        <Search></Search>
      </Col>
      <Col class="col-5" justifyEnd>
        <h5>Vilnius</h5>
      </Col>
    </Row>
    <Row>
      <Col class="col-4">
        <WeatherCurrent></WeatherCurrent>
      </Col>
    </Row>
  </Card>
</template>

<script>
import Search from "./Search.vue";
import Card from "@/layouts/Card.vue";
import Row from "@/layouts/Row.vue";
import Col from "@/layouts/Col.vue";
import WeatherCurrent from "./WeatherCurrent.vue";

export default {
  props: [],

  components: {
    Card,
    Search,
    Row,
    Col,
    WeatherCurrent,
  },

  data() {
    return {};
  },
};
</script>
