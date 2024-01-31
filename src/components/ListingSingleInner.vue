<template>
  <div>
    <slot name="day"></slot>
    <slot name="night"></slot>
    <slot name="overview"></slot>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>
