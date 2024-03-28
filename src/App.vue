<template>
  <ThemeWrapper>
    <Header> </Header>
    <Container>
      <router-view></router-view>
    </Container>
  </ThemeWrapper>
</template>

<script>
import ThemeWrapper from "@/components/ThemeWrapper.vue";
import Container from "@/layouts/Container.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    ThemeWrapper,
    Container,
    Header,
  },
};
</script>
