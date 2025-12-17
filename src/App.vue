<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectSection from '@/components/sections/ProjectSection.vue'
import ConceptSection from '@/components/sections/ConceptSection.vue'
import TechnologiesSection from '@/components/sections/TechnologiesSection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import TeamSection from '@/components/sections/TeamSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />
    
    <main>
      <HeroSection />
      <ProjectSection />
      <ConceptSection />
      <TechnologiesSection />
      <GallerySection />
      <TeamSection />
      <FaqSection />
    </main>
    
    <AppFooter />
  </div>
</template>
