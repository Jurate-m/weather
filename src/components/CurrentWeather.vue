<template>
  <Card>
    <Row>
      <Column class="col-5">
        <!-- NTH -->
        <!-- <Search></Search> -->
      </Column>
      <Column class="col-5" justifyEnd>
        <h5>{{ location }}</h5>
      </Column>
    </Row>
    <Row>
      <Column class="col-4">
        <div>
          <h3 style="text-align: center">Thursday, 11:47</h3>
          <div style="margin-bottom: 4em">
            <img
              style="display: block; margin: 0 auto"
              src="@/assets/icons/weather/2.png"
            />
          </div>
          <h4 style="text-align: center">Sunny</h4>
          <h3 style="text-align: center">
            25<button>°C</button><button>°F</button>
          </h3>
          <h5 style="text-align: center">Feels like +29</h5>
        </div>
      </Column>
      <!-- <Column>
        <pre>{{ days }}</pre>
        <Listing :data="days[0]"> </Listing>
      </Column> -->
    </Row>
  </Card>
</template>

<script>
import Search from "./Search.vue";
import Card from "@/layouts/Card.vue";
import Row from "@/layouts/Row.vue";
import Column from "@/layouts/Column.vue";
import Listing from "./Listing.vue";

export default {
  // props: ["days", "location", "current"],

  components: {
    Card,
    Search,
    Row,
    Column,
    Listing,
  },

  computed: {
    days() {
      return this.$store.state.hourly.days;
    },

    location() {
      return this.$store.state.locationId;
    },

    currentWeather() {
      return this.$store.state.current.currentWeather;
    },
  },
};
</script>
