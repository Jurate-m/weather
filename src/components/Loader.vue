<template>
  <div class="loader" :class="{ 'loader--c-light': light }">
    <span aria-label="loading"></span>
  </div>
</template>

<script>
export default {
  props: {
    light: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.loader {
  padding: 20px;

  span {
    display: block;
    width: 30px;
    height: 30px;
    border: 5px solid var(--c-dark);
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotate 0.8s ease-in infinite;
  }
}

.loader--c-light {
  span {
    border: 5px solid var(--c-light);
    border-bottom-color: transparent;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
