<template>
  <ThemeWrapper>
    <Container>
      <Header> </Header>
      <Container>
        <Search></Search>
        <router-view></router-view>
      </Container>
    </Container>
  </ThemeWrapper>
</template>

<script>
import ThemeWrapper from "@/layouts/ThemeWrapper.vue";
import Container from "@/layouts/Container.vue";
import Header from "@/components/Header.vue";
import Search from "./components/Search.vue";

export default {
  components: {
    ThemeWrapper,
    Container,
    Header,
    Search,
  },
};
</script>
