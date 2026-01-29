<template>
  <ThemeWrapper>
    <Container>
      <Header> </Header>
      <Container>
        <Search></Search>
        <router-view></router-view>
      </Container>
    </Container>
    <NoticeBanner />
  </ThemeWrapper>
</template>

<script>
import "@/assets/main.css";
import ThemeWrapper from "@/layouts/ThemeWrapper.vue";
import Container from "@/layouts/Container.vue";
import Header from "@/components/Header.vue";
import Search from "./components/Search.vue";
import NoticeBanner from "@/components/NoticeBanner.vue";

export default {
  components: {
    ThemeWrapper,
    Container,
    Header,
    Search,
    NoticeBanner,
  },
};
</script>
