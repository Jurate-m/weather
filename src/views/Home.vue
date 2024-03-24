<template>
  <div v-if="weather" class="home">
    <h1 v-if="location" class="mb-20">{{ location }}, <br />Current Weather</h1>
    <div class="home__lists">
      <Listing>
        <TransitionGroup name="fade-in">
          <ListingSingle
            v-for="(item, index) in weather"
            featured
            v-show="index === activeIndex"
            :key="new Date()"
          >
            <template #featured>
              <FeaturedCard :data="item"></FeaturedCard>
            </template>
          </ListingSingle>
        </TransitionGroup>
      </Listing>
      <SingleLink
        class="mb-30"
        routeName="Hourly weather"
        text="View Hourly weather"
        alignRight
      ></SingleLink>
      <Listing>
        <ListingSingle
          v-for="(item, index) in weather"
          customEvent
          @set-active="
            setActive(index);
            scrollToTop();
          "
          :class="{ active: index === activeIndex }"
        >
          <template #button
            ><FeaturedListCard :data="item"></FeaturedListCard></template
        ></ListingSingle>
      </Listing>
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
const dataLength = 8;

function assignWeather(data) {
  const remainingArray = dataLength - data[0].length;

  if (remainingArray > 0) {
    weather.value = data[0].concat(data[1].slice(0, remainingArray));
    return;
  }

  weather.value = data[0].slice(0, dataLength);
}

function setActive(index) {
  activeIndex.value = index;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const { location } = useDataHandling(
  "hourlyWeather",
  "lastHourlyApiTimeStmp",
  "hourly/getHourlyWeather",
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

export default {
  components: {
    FeaturedCard,
    Listing,
    ListingSingle,
    FeaturedListCard,
    SingleLink,
    Loader,
  },
};
</script>
