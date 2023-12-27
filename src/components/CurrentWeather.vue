<template>
  <Card>
    <Row>
      <Col class="col-6">
        <Search></Search>
      </Col>
      <Col class="col-6">
        <h5>Vilnius</h5>
      </Col>
    </Row>
    <h3 style="text-align: center">Thursday, 11:47</h3>
    <div style="margin-bottom: 4em">
      <img style="display: block; margin: 0 auto" src="@/assets/icons/2.png" />
    </div>
    <h4 style="text-align: center">Sunny</h4>
    <h3 style="text-align: center">25<button>°C</button><button>°F</button></h3>
    <h5 style="text-align: center">Feels like +29</h5>
  </Card>
</template>

<script>
import Search from "./Search.vue";
import Card from "@/layouts/Card.vue";
import Row from "@/layouts/Row.vue";

import Col from "@/layouts/Col.vue";

export default {
  props: [],

  components: {
    Card,
    Search,
    Row,
    Col,
  },

  data() {
    return {};
  },
};
</script>
