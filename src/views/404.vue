<template>
  <div class="not-found">
    <h1 class="mb-60">
      Oh no!<br /><br />
      The page You were looking for does not exist!
    </h1>
    <router-link :to="{ name: 'Home' }">Get back to Home</router-link>
  </div>
</template>

<script>
import "@/assets/scss/views/_404.scss";
</script>
