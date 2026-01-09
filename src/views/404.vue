<template>
  <div class="not-found">
    <h1 class="mb-60">
      Oh no!<br /><br />
      The page You were looking for does not exist!
    </h1>

    <SingleLink
      routeName="Current"
      text="Get back to Current weather"
    ></SingleLink>
  </div>
</template>

<script>
import "@/assets/scss/views/_404.scss";

import SingleLink from "@/components/SingleLink.vue";

export default {
  components: { SingleLink },
};
</script>
