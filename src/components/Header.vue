<template>
  <header class="header">
    <Nav></Nav>
  </header>
</template>

<script>
import "@/assets/scss/components/_header.scss";

import Nav from "@/components/Nav.vue";

export default {
  components: {
    Nav,
  },
};
</script>
