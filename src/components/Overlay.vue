<template>
  <div :class="classes"></div>
</template>

<script>
export default {
  props: ["active"],

  computed: {
    classes() {
      return {
        overlay: true,
        "overlay--active": this.active,
      };
    },
  },
};
</script>

<style scoped>
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 1;
}

.overlay--active {
  display: block;
}
</style>
