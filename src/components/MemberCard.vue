<script lang="ts">
import {defineComponent, PropType} from 'vue'

interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

interface Member {
  id: number;
  name: string;
  firstName: string;
  age: number;
  specialty: string;
  contributions: string[];
  presentation: string;
  photo: string;
  socials: SocialMedia[];
}

export default defineComponent({
  name: "MemberCard",
  props: {
    member: {
      type: Object as PropType<Member>,
      required: true
    }
  }
})
</script>

<template>
  <div class="bg-primary-500/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
    <div class="relative h-64">
      <img :src="member.photo" :alt="member.firstName" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-primary-600 to-transparent opacity-60"></div>
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <div class="mb-4">
        <h3 class="text-2xl font-bold text-primary-100">
          {{ member.firstName }} {{ member.name }}
        </h3>
        <p class="text-primary-200">{{ member.age }} ans</p>
      </div>
      <div class="mb-4">
        <h4 class="text-lg font-semibold text-primary-200 mb-2">Spécialité</h4>
        <p class="text-primary-100">{{ member.specialty }}</p>
      </div>
      <div class="mb-4">
        <h4 class="text-lg font-semibold text-primary-200 mb-2">Contributions au projet</h4>
        <ul class="list-disc list-inside text-primary-100 space-y-1">
          <li v-for="(contribution, index) in member.contributions" :key="index">
            {{ contribution }}
          </li>
        </ul>
      </div>
      <div class="mb-4">
        <h4 class="text-lg font-semibold text-primary-200 mb-2">Présentation</h4>
        <p class="text-primary-100">{{ member.presentation }}</p>
      </div>
    </div>
    <div class="mt-auto p-4 bg-primary-500">
      <div class="flex justify-center space-x-4">
        <a v-for="social in member.socials"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-100 hover:text-primary-200 transition-colors">
          <svg class="w-6 h-6" viewBox="0 0 24 24">
            <path class="social-icon-path" :d="social.icon"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.social-icon-path {
  fill: currentColor;
}
</style>