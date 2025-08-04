<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from "./components/TheFooter.vue";
// import { ref, onMounted, onBeforeUnmount } from 'vue';

// const showEasterEgg = ref(false);
// let timer: any = null;
//
// const startInactivityTimer = () => {
//   clearTimeout(timer);
//   timer = setTimeout(() => {
//     showEasterEgg.value = true;
//   }, 300000);
// };
//
// const resetTimer = () => {
//   showEasterEgg.value = false;
//   startInactivityTimer();
// };
//
// onMounted(() => {
//   startInactivityTimer();
//   window.addEventListener('mousemove', resetTimer);
//   window.addEventListener('keydown', resetTimer);
//   window.addEventListener('click', resetTimer);
//   window.addEventListener('scroll', resetTimer);
// });
//
// onBeforeUnmount(() => {
//   clearTimeout(timer);
//   window.removeEventListener('mousemove', resetTimer);
//   window.removeEventListener('keydown', resetTimer);
//   window.removeEventListener('click', resetTimer);
//   window.removeEventListener('scroll', resetTimer);
// });
</script>

<template>
  <div class="min-h-screen bg-primary-600">
    <TheNavbar />
<!--    <div>-->
<!--      <div v-if="showEasterEgg" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">-->
<!--        <div class="bg-white rounded-2xl p-6 shadow-lg relative max-w-sm w-full">-->
<!--          <button @click="showEasterEgg = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>-->
<!--          <video-->
<!--              controls-->
<!--              autoplay-->
<!--              loop-->
<!--              preload="metadata"-->
<!--              src="https://media.tenor.com/yEG23sxXIVQAAAPo/shrek-shrek-meme.mp4"-->
<!--              class="rounded-lg shadow-lg w-full h-64 object-cover" />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <RouterView />
    <TheFooter />
  </div>
</template>