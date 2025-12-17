<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";

const tabs = ["Home", "Apps", "About", "My"];
const activeTab = ref(tabs[0]);
</script>

<template>
        <MorphingTabs
            :tabs="tabs"
            :active-tab="activeTab"
            @update:active-tab="activeTab = $event"
        />
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
