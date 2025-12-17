<script setup>
import { features } from '@/data/features.js'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import FeatureCard from '@/components/ui/FeatureCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section class="section-padding bg-white">
    <div class="container-custom">
      <SectionTitle 
        label="TECHNOLOGIES"
        title="Les outils et composants qui font voler"
        highlight=" Aerisys"
        :centered="true"
      />

      <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          v-for="feature in features" 
          :key="feature.id"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
        />
      </div>

      <!-- Documentation CTA -->
      <div class="mt-12 text-center">
        <BaseButton variant="primary" size="lg" href="#">
          Documentation
        </BaseButton>
      </div>
    </div>
  </section>
</template>
