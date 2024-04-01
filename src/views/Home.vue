<template>
  <div v-if="weather" class="home">
    <div class="home__lists">
      <Card transparent padded>
        <Listing>
          <TransitionGroup name="fade-in">
            <ListingSingle
              v-for="(item, index) in weather"
              v-show="index === activeIndex"
              :key="new Date()"
            >
              <FeaturedCard :data="item" :location="location"></FeaturedCard>
            </ListingSingle>
          </TransitionGroup>
        </Listing>
      </Card>
      <Card pt padded>
        <Listing>
          <TransitionGroup name="fade-in">
            <ListingSingle
              v-for="(item, index) in weather"
              v-show="index === activeIndex"
              :key="new Date()"
            >
              <DetailsCard :data="item"></DetailsCard>
            </ListingSingle>
          </TransitionGroup>
        </Listing>
      </Card>

      <Card pt padded>
        <SingleLink
          class="mt--20"
          routeName="Hourly"
          text="Hourly weather"
          alignRight
        ></SingleLink>
        <Listing flex>
          <ListingSingle
            v-for="(item, index) in weather"
            :class="{ active: index === activeIndex }"
          >
            <button
              type="button"
              @click="
                setActive(index);
                scrollToTop();
              "
            >
              <FeaturedListCard :data="item"></FeaturedListCard>
            </button>
          </ListingSingle>
        </Listing>
      </Card>
    </div>
  </div>
  <div v-else>
    <Loader light></Loader>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useDataHandling from "@/composables/dataHandling.js";

const weather = ref(null);
const activeIndex = ref(0);
const dataLength = 6;

const assignWeather = function (data) {
  const remainingArray = dataLength - data[0].length;

  if (remainingArray > 0) {
    weather.value = data[0].concat(data[1].slice(0, remainingArray));
    return;
  }

  weather.value = data[0].slice(0, dataLength);
};

function setActive(index) {
  activeIndex.value = index;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const { location } = useDataHandling(
  "hourly",
  "hourly_time_stmp",
  "weather/getWeather",
  {
    endpoint: "hourly",
    commitName_1: "separateDays",
    commitName_2: "setHourlyTimeStamp",
  },
  assignWeather
);
</script>

<script>
import "@/assets/scss/views/_home.scss";
import FeaturedCard from "@/components/FeaturedCard.vue";
import FeaturedListCard from "@/components/FeaturedListCard.vue";
import Listing from "@/components/Listing.vue";
import ListingSingle from "@/components/ListingSingle.vue";
import SingleLink from "@/components/SingleLink.vue";
import Loader from "@/components/Loader.vue";
import DetailsCard from "@/components/DetailsCard.vue";

import { formatDateTime } from "@/utils.js";

import Card from "@/layouts/Card.vue";

export default {
  components: {
    FeaturedCard,
    Listing,
    ListingSingle,
    FeaturedListCard,
    SingleLink,
    Loader,
    DetailsCard,
    Card,
  },

  methods: {
    formatDate(arg, options) {
      return formatDateTime(arg, options);
    },
  },
};
</script>
