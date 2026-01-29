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

<style scoped>
.nav {
  max-width: 100%;

  .router-link-active {
    font-weight: 600;
    background-color: rgba(var(--bg-primary), 0.5);
  }

  @media only screen and (min-width: 768px) {
    width: 100%;
  }
}

.nav-list {
  display: flex;
  justify-content: center;
  z-index: 2;

  @media only screen and (min-width: 768px) {
    display: block;
    width: 100%;
    position: relative;
    visibility: visible;
    left: 0;
    padding: 60px 20px;
    height: 100vh;
    margin: 0;
  }

  li {
    text-align: center;

    a {
      display: inline-block;
      font-weight: 500;
      padding: 5px 15px;
      border-radius: 12px;
      border: 2px solid transparent;
      transition: all 0.1s ease-in;
    }

    a:hover {
      background-color: rgba(var(--bg-primary), 0.2);
    }
  }

  @media only screen and (min-width: 768px) {
    li {
      text-align: right;
      padding: 0;
    }

    li:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}

.nav-list::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(40px);
  background-color: rgba(var(--background-2), 0.2);
  box-shadow: 0px 0px 2px -1px #000;
  z-index: -1;

  @media only screen and (min-width: 768px) {
    width: 50vw;
    background-color: rgba(var(--background-1), 0.1);
  }
}
</style>
