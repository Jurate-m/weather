<template>
  <div class="single-link" :class="{ 'single-link--right': this.alignRight }">
    <router-link :to="{ name: routeName }">{{ text }}</router-link>
  </div>
</template>

<script>
export default {
  props: {
    routeName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    alignRight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.single-link {
  padding: 0 0 30px;

  a {
    display: inline-block;
    padding: 10px 30px;
    font-weight: 600;
    border-radius: 12px;
    font-size: 1.4rem;
    background-color: rgba(var(--bg-primary), 0.2);
  }

  a:hover {
    background-color: rgba(var(--bg-primary), 0.5);
  }
}

.single-link--right {
  text-align: right;
}
</style>
