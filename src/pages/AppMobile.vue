<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
import {mobiles} from "@/data/mobiles.js";
import FlipCard from "@/components/ui/FlipCard.vue";
import {galleryMobiles} from '@/data/gallery.js'
</script>

<template>
    <main>
        <section aria-label="Application mobile Aerisys" class="relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0 h-full w-full z-10">
                <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
                     :style="{ backgroundImage: `url(/images/drones/drone-rock.png)` }"/>
            </div>
            <div class="absolute inset-0 z-20 pointer-events-none">
                <div class="h-full w-full bg-linear-to-r from-[#4E92CE] to-transparent"></div>
            </div>
            <div class="relative z-20 h-full">
                <div class="grid grid-cols-1 lg:grid-cols-2 h-full">
                    <!-- Colonne gauche (contenu centré) -->
                    <div class="flex items-center justify-center px-4">
                        <div class="max-w-3xl">
                            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                                Votre drone, contrôlé du bout des doigts
                            </h1>

                            <p class="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
                                L’application mobile Aerisys est conçue pour offrir une interface simple,
                                puissante et intuitive pour piloter, configurer et analyser votre drone DIY.
                                Que vous soyez débutant ou maker expérimenté, tout est pensé pour
                                vous permettre d’explorer, apprendre et personnaliser votre plateforme volante.
                            </p>
                            <div class="mt-6 flex gap-4">
                                <a href="#"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   aria-label="Télécharger sur l’App Store">
                                    <img class="h-12 w-auto"
                                         src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                         alt="Télécharger sur l’App Store"/>
                                </a>
                                <a href="#"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   aria-label="Disponible sur Google Play">
                                    <img class="h-12 w-auto"
                                         src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                         alt="Disponible sur Google Play"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-padding bg-white">
            <div class="container-custom">
                <SectionTitle title="Prenez le contrôle de" highlight="votre drone" />
                <div class="mt-8 mx-auto max-w-4xl">
                    <div class="relative w-full aspect-video rounded-lg overflow-hidden shadow">
                        <video class="absolute inset-0 w-full h-full"
                               controls
                               playsinline
                               preload="metadata"
                               crossorigin="anonymous"
                               poster="/logo/black-full.jpg">
                            <source src="https://cdn.aerisys.fr/medias/videos/demo-mobile-final.mov" type="video/mp4" />
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    </div>
                </div>
            </div>
            <div class="container-custom mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <button v-for="(image, index) in galleryMobiles"
                        :key="image.id"
                        type="button"
                        @click="openLightbox(index)"
                        :aria-label="`Agrandir : ${image.alt}`"
                        class="group relative aspect-4/3 bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        :class="{ 'md:col-span-2 md:row-span-2': index === 0 }">
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
                        <svg class="w-16 h-16 text-gray-300" viewBox="0 0 100 100" fill="currentColor">
                            <ellipse cx="50" cy="50" rx="30" ry="12" opacity="0.3"/>
                            <rect x="38" y="44" width="24" height="12" rx="3"/>
                            <circle cx="30" cy="38" r="6"/>
                            <circle cx="70" cy="38" r="6"/>
                            <circle cx="30" cy="62" r="6"/>
                            <circle cx="70" cy="62" r="6"/>
                        </svg>
                    </div>
                    <img :src="image.src"
                         :alt="image.alt"
                         class="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105 p-2"
                         loading="lazy"
                         @error="$event.target.style.display = 'none'"/>
                    <div
                        class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"/>

                    <div
                        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <div class="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
        </section>

        <section aria-label="Fonctionnalités de l'application" class="section-padding bg-gray-50">
            <div class="container-custom">
                <SectionTitle title="Fonctionnalités" highlight="avancées"/>
                <div class="mt-12 flex justify-center">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
                        <FlipCard v-for="mobile in mobiles"
                                  :key="mobile.id"
                                  :title="mobile.title"
                                  :description="mobile.description"
                                  :icon="mobile.icon"/>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

