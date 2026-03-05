<script setup>
import {faqItems} from '@/data/faq.js';
import {useAccordion} from '@/composables/useAccordion.js';
import SectionTitle from '@/components/ui/SectionTitle.vue';
import FaqAccordion from '@/components/ui/FaqAccordion.vue';

const {
    isOpen,
    toggle
} = useAccordion(false);
</script>

<template>
    <section id="faq"
             aria-label="Questions fréquentes"
             class="section-padding bg-gray-50">
        <div class="container-custom">
            <SectionTitle label="FREQUENTLY ASKED QUESTIONS"
                          title="Tout ce que vous devez savoir sur"
                          highlight=""
                          :centered="true">
        <span class="block text-3xl md:text-4xl font-display font-bold text-primary-500 mt-2">
          Aerisys
        </span>
            </SectionTitle>

            <div class="mt-12 max-w-3xl mx-auto">
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="divide-y divide-gray-100">
                        <FaqAccordion v-for="item in faqItems"
                                      :key="item.id"
                                      :item="item"
                                      :is-open="isOpen(item.id)"
                                      class="px-6"
                                      @toggle="toggle"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
