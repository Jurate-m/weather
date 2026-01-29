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

const dialog = useTemplateRef("dialog");

const handleDialog = () => {
  dialog.value.close();
};

onMounted(() => {
  dialog.value.showModal();
});
</script>

<style scoped>
.notice-banner {
  position: fixed;
  top: 0;
  bottom: auto;
  width: 100%;
  right: 0;
  left: auto;
  padding: 10px 20px;
  background-color: white;
  max-width: 100%;
  font-weight: 600;
  z-index: 10;
  border: none;
}

.notice-banner__inner {
  align-items: flex-end;
  justify-content: center;

  p {
    padding-bottom: 10px;
  }

  @media only screen and (min-width: 500px) {
    display: flex;

    p {
      padding-right: 10px;
    }
  }
}

.notice-banner__btn {
  padding: 5px 10px;
  color: inherit;
  border-radius: 8px;
  background-color: white;
}

.notice-banner__btn:hover {
  background-color: green;
  color: white;
}
</style>
