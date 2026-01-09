<template>
  <nav :class="parentClass" v-click-out="hide" role="navigation">
    <ul class="nav-list">
      <li v-for="route in routes" :key="route.name">
        <router-link v-if="route.name" :to="route.path" @click="hide()">{{
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
      routes: [],
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
    hide() {
      this.active = false;
    },
  },

  created() {
    for (const route of this.$router.options.routes) {
      if (route.name) {
        this.routes.push(route);
      }
    }

    return this.routes;
  },
};
</script>
