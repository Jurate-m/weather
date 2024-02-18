<template>
  <header>
    <Container>
      <Nav></Nav>
    </Container>
  </header>
  <Container>
    <router-view></router-view>
  </Container>
</template>

<script>
import Container from "@/layouts/Container.vue";
import Nav from "@/components/Nav.vue";
import "@/assets/scss/components/_header.scss";

export default {
  components: {
    Container,
    Nav,
  },
};
</script>
