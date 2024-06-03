<template>
  <div class="headerDiv">
    <span class="header-title">Vue News Search & Bookmark</span>
    <ul class="routes">
      <router-link to="/" exact class="route-label">Top News</router-link>
      <router-link to="/bookmarks" class="route-label">Bookmarks</router-link>
    </ul>
  </div>
</template>

<script>
import '@/assets/base.css';

export default {
  name: "HeaderComponent",
};
</script>
