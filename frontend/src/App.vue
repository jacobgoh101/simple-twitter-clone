<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({ components: { NavBar } });
</script>

<style lang="scss">
html,
body {
  overflow-x: hidden;
}
</style>
