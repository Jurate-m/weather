<template>
  <div class="popup">
    <div class="popup__card" v-click-out="popupAction">
      <p class="mb-20">{{ message }}</p>
      <button @click="popupAction">Close</button>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/components/_popup.scss";

export default {
  emits: ["popupAction"],
  props: ["message"],

  methods: {
    popupAction() {
      this.$emit("popupAction");
    },
  },
};
</script>
