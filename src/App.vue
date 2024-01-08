<template>
  <Layout dark>
    <Nav></Nav>
    <router-view></router-view>
  </Layout>
</template>

<script>
import Layout from "./layouts/base.vue";
import Nav from "./components/Nav.vue";

export default {
  components: {
    Layout,
    Nav,
  },
};
</script>
