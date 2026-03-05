<script setup>
import {galleryImages} from '@/data/gallery.js'
import SectionTitle from '@/components/ui/SectionTitle.vue'
</script>

<template>
    <section class="section-padding bg-gray-50">
        <div class="container-custom">
            <SectionTitle label="GALERIE"
                          title=""
                          :centered="true"/>
            <div class="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div v-for="(image, index) in galleryImages"
                     :key="image.id"
                     class="group relative aspect-4/3 bg-gray-200 rounded-2xl overflow-hidden cursor-pointer"
                     :class="{ 'md:col-span-2 md:row-span-2': index === 0 }">
                    <!-- Placeholder -->
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                        <svg class="w-16 h-16 text-gray-300" viewBox="0 0 100 100" fill="currentColor">
                            <ellipse cx="50" cy="50" rx="30" ry="12" opacity="0.3"/>
                            <rect x="38" y="44" width="24" height="12" rx="3"/>
                            <circle cx="30" cy="38" r="6"/>
                            <circle cx="70" cy="38" r="6"/>
                            <circle cx="30" cy="62" r="6"/>
                            <circle cx="70" cy="62" r="6"/>
                        </svg>
                    </div>
                    <!-- Actual image if available -->
                    <img :src="image.src"
                         :alt="image.alt"
                         class="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                         loading="lazy"
                         @error="$event.target.style.display = 'none'"/>
                    <!-- Overlay -->
                    <div
                        class="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"/>

                    <!-- Icon on hover -->
                    <div
                        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <div class="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
