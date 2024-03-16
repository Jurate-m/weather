<template>
  <div class="popup">
    <div class="popup__card">
      <p class="mb-20">{{ message }}</p>
      <button @click="popupAction">Close</button>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/components/_popup.scss";

export default {
  emits: ["popupAction"],
  props: {
    message: {
      type: String,
      required: true,
    },
  },

  methods: {
    popupAction() {
      this.$emit("popupAction");
    },
  },
};
</script>
