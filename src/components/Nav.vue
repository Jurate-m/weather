<template>
  <nav :class="parentClass" v-click-out="hide">
    <button class="nav-burger" @click="toggleDisplay" type="button">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="nav-list">
      <li v-for="route in routes" :key="route.name">
        <router-link :to="route.path" @click="hide()">{{
          route.name
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import "@/assets/scss/components/_nav.scss";

export default {
  data() {
    return {
      routes: this.$router.options.routes,
      active: false,
    };
  },

  computed: {
    parentClass() {
      return {
        nav: true,
        active: this.active,
      };
    },
  },

  methods: {
    toggleDisplay() {
      this.active = !this.active;
    },

    hide() {
      this.active = false;
    },
  },
};
</script>
