<template>
  <nav :class="parentClass" v-click-out="hide" role="navigation">
    <button
      class="nav-burger"
      @click="toggleDisplay"
      type="button"
      :aria-label="active ? 'Close menu' : 'Open menu'"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
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
    toggleDisplay() {
      this.active = !this.active;
    },

    hide() {
      this.active = false;
    },
  },

  created() {
    for (let i = 0; i < this.$router.options.routes.length; i++) {
      if (this.$router.options.routes[i].name) {
        this.routes.push(this.$router.options.routes[i]);
      }
    }
  },
};
</script>
