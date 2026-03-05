<script setup>
import {features} from '@/data/features.js';
import SectionTitle from '@/components/ui/SectionTitle.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import FlipCard from '@/components/ui/FlipCard.vue';
</script>

<template>
    <section aria-label="Technologies utilisées" class="section-padding bg-white">
        <div class="container-custom">
            <SectionTitle label="TECHNOLOGIES"
                          title="Les outils et composants qui font voler"
                          highlight=" Aerisys"
                          :centered="true"/>
            <div class="mt-12 flex justify-center">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
                    <FlipCard v-for="feature in features"
                              :key="feature.id"
                              :title="feature.title"
                              :description="feature.description"
                              :icon="feature.icon"/>
                </div>
            </div>
            <!-- Documentation CTA -->
            <div class="mt-12 text-center">
                <BaseButton variant="primary"
                            size="lg"
                            href="https://wiki.aerisys.fr/"
                            target="_blank"
                            rel="noopener noreferrer">
                    Documentation
                </BaseButton>
            </div>
        </div>
    </section>
</template>
