<template>
  <header :class="{ active: active }">
    <Container>
      <Nav></Nav>
    </Container>
  </header>
</template>

<script>
import "@/assets/scss/components/_header.scss";

import Container from "@/layouts/Container.vue";
import Nav from "@/components/Nav.vue";

export default {
  components: {
    Container,
    Nav,
  },

  data() {
    return {
      active: false,
    };
  },

  created() {
    window.addEventListener("scroll", this.setActive);
  },

  methods: {
    setActive() {
      this.active = window.scrollY > 0 ? true : false;
    },
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.setActive);
  },
};
</script>
