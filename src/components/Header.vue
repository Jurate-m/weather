<template>
  <header class="header">
    <div class="header__inner">
      <Nav></Nav>
    </div>
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
