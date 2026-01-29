<template>
  <dialog class="notice-banner" ref="dialog">
    <div class="notice-banner__inner">
      <p>
        This site uses your approximate location (based on IP address) to
        display local weather.
      </p>
      <button @click="handleDialog" class="notice-banner__btn">OK</button>
    </div>
  </dialog>
</template>

<script setup>
import { useTemplateRef, onMounted } from "vue";
import "@/assets/scss/components/_noticeBanner.scss";

const dialog = useTemplateRef("dialog");

const handleDialog = () => {
  dialog.value.close();
};

onMounted(() => {
  dialog.value.showModal();
});
</script>
