<template>
  <Header> </Header>
  <Container>
    <router-view></router-view>
  </Container>
</template>

<script>
import Container from "@/layouts/Container.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    Container,
    Header,
  },
};
</script>
