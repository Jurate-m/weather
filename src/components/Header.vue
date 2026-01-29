<template>
  <header class="header">
    <Nav></Nav>
  </header>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  components: {
    Nav,
  },
};
</script>

<style>
.header {
  position: fixed;
  padding: 20px;
  bottom: 0;
  z-index: 10;
  transition: background-color 0.3s ease-in-out;
  width: 100%;

  .container {
    padding: 20px;
  }

  @media only screen and (min-width: 768px) {
    position: sticky;
    top: 0;
    flex: 1;
    padding: 0;
  }
}
</style>
