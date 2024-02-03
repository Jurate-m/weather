<template>
  <li :key="date" v-if="data" :class="classes" @click="toggleDisplay()">
    <div class="listing-single__header">
      <Row class="space-between">
        <h3>{{ date }}</h3>

        <div>
          <img :src="`/src/assets/icons/weather/${icon}.png`" />
        </div>
        <h3>{{ temperature }}</h3>

        <h3>{{ humidity }}</h3>
        <h3>{{ windDir }}{{ windSpeed }}</h3>
      </Row>
    </div>
    <Transition>
      <div
        v-if="active"
        class="listing-single__details"
        :class="{ 'listing-single__details': extended }"
      >
        <div>
          <p>
            <slot name="summary"></slot>
          </p>
          <Row>
            <Column v-for="item in details" class="col-4">
              <div>
                {{ item.title }}
                {{ item.description }}
              </div>
            </Column>
          </Row>
        </div>
      </div>
    </Transition>
  </li>
</template>

<script>
import Row from "@/layouts/Row.vue";
import Column from "@/layouts/Column.vue";
import "@/assets/scss/components/_listingSingle.scss";

export default {
  props: {
    data: {
      required: true,
    },
    date: {
      required: true,
    },
    icon: {
      required: true,
    },
    temperature: {
      required: true,
    },
    humidity: {
      required: true,
    },
    windDir: {
      required: true,
    },
    windSpeed: {
      required: true,
    },
    extended: {
      default: false,
    },
    astro: {
      default: false,
    },
    details: {
      required: true,
    },
  },

  components: {
    Row,
    Column,
  },

  data() {
    return {
      active: false,
    };
  },

  methods: {
    toggleDisplay() {
      this.active = !this.active;
    },
  },

  computed: {
    classes() {
      return {
        active: this.active,
        "listing-single": true,
      };
    },
  },
};
</script>
