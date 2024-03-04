<template>
  <header class="header" :class="{ active: isActive }">
    <Container>
      <div class="header__inner">
        <Nav></Nav>
        <Search></Search>
      </div>
    </Container>
  </header>
</template>

<script>
import "@/assets/scss/components/_header.scss";

import Container from "@/layouts/Container.vue";
import Nav from "@/components/Nav.vue";
import Search from "./Search.vue";

export default {
  components: {
    Container,
    Nav,
    Search,
  },

  data() {
    return {
      isActive: false,
    };
  },

  created() {
    window.addEventListener("scroll", this.setActive);
  },

  methods: {
    setActive() {
      this.isActive = window.scrollY > 0;
    },
  },
};
</script>
