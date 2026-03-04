<script lang="ts">
import {defineComponent, PropType} from 'vue'

interface Section {
  id: number;
  image: string;
  title: string;
  description?: string;
  link?: string;
  download?: {
    name: string,
    url: string
  }[];
}

export default defineComponent({
  name: "MemberCard",
  props: {
    section: {
      type: Object as PropType<Section>,
      required: true
    }
  },
  methods: {
    downloadFile(file: { name: string; url: string }) {
      const link = document.createElement("a");
      link.href = file.url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
})
</script>

<template>

  <img :src="section.image" :alt="section.title" class="w-full h-64 object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-primary-600 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
  <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
    <h3 class="text-2xl font-bold mb-2">{{ section.title }}</h3>
    <p v-if="section.description"
       class="text-primary-100 mb-4">{{ section.description }}</p>
    <router-link v-if="section.link"
                 :to="section.link"
                 class="bg-primary-200 text-white px-6 py-2 rounded-full hover:bg-primary-300 transition-colors">
      En savoir plus
    </router-link>
    <div v-if="section.download && section.download.length"
         v-for="file in section.download"
         :key="file.name"
         class="inline-block py-2">
      <div class="bg-primary-200 text-white px-6 py-2 rounded-full hover:bg-primary-300 transition-colors"
           @click="downloadFile(file)">
        Télécharger {{ file.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>