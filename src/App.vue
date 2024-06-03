<template>
    <div class="container">
      <header-component />
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
</template>

<script>
import HeaderComponent from "@/screens/Header.vue";

export default {
  components: {
    HeaderComponent,
  },
};
</script>