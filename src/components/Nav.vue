<template>
  <nav class="nav">
    <ul>
      <li v-for="link in links" :key="link.id">
        <router-link :to="link.url">{{ link.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import "../assets/scss/components/_nav.scss";

export default {
  data() {
    return {
      links: [
        { id: 1, name: "Current", url: "/" },
        { id: 2, name: "Hourly", url: "/hourly" },
        { id: 3, name: "Daily", url: "/daily" },
      ],
    };
  },
};
</script>
