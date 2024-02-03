<template>
  <div :class="classes">
    <h2>
      <slot name="header"></slot>
    </h2>
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    toggleDisplay() {},
  },

  computed: {
    classes() {
      return {
        listing: true,
      };
    },
  },
};
</script>
