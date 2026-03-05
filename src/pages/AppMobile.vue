<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
import {mobiles} from "@/data/mobiles.js";
import FlipCard from "@/components/ui/FlipCard.vue";
</script>

<template>
    <div>
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
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

        <!--    TODO: Décommenter quand la vidéo de présentation de l'app mobile sera faite-->
        <!--    <section class="section-padding bg-white">-->
        <!--      <div class="container-custom">-->
        <!--        <SectionTitle title="Prenez le contrôle de" highlight="votre drone" />-->
        <!--          <div class="mt-8 mx-auto max-w-4xl">-->
        <!--              <div class="relative w-full aspect-video rounded-lg overflow-hidden shadow">-->
        <!--                  <video-->
        <!--                      class="absolute inset-0 w-full h-full"-->
        <!--                      controls-->
        <!--                      playsinline-->
        <!--                      preload="metadata"-->
        <!--                      crossorigin="anonymous"-->
        <!--                      poster="/logo/black-full.jpg"-->
        <!--                  >-->
        <!--                      <source src="https://cdn.aerisys.fr/medias/videos/test-final.mp4" type="video/mp4" />-->
        <!--                      Votre navigateur ne supporte pas la lecture de vidéos.-->
        <!--                  </video>-->
        <!--              </div>-->
        <!--          </div>-->
        <!--      </div>-->
        <!--    </section>-->

        <section class="section-padding bg-gray-50">
            <div class="container-custom">
                <SectionTitle title="Fonctionnalités" highlight="avancées"/>
                <div class="mt-12 flex justify-center">
                    <div class="grid grid-cols-2 gap-8 max-w-3xl">
                        <FlipCard v-for="mobile in mobiles"
                                  :key="mobile.id"
                                  :title="mobile.title"
                                  :description="mobile.description"
                                  :icon="mobile.icon"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

