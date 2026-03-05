<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue';
</script>

<template>
    <section id="projet"
             aria-label="Le projet Aerisys"
             class="section-padding bg-white">
        <div class="container-custom">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <!-- Image -->
                <div class="relative order-2 lg:order-1">
                    <div class="relative">
                        <div
                            class="aspect-square max-w-md mx-auto bg-linear-to-br from-aerisys-blue to-aerisys-blue-light rounded-3xl overflow-hidden shadow-xl">
                            <img src="/images/home/drone-projet.png"
                                 alt="Drone Aerisys"
                                 class="w-full h-full object-contain relative z-10"
                                 loading="lazy"
                                 @error="$event.target.style.display = 'none'"/>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="order-1 lg:order-2">
                    <SectionTitle label="LE PROJET"
                                  title="Conçu pour"
                                  highlight=""
                                  :centered="false">
                        <span class="block text-3xl md:text-4xl font-display font-bold">
                            <span class="italic text-primary-500">apprendre et innover</span>
                        </span>
                    </SectionTitle>

                    <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-4">
                        Pour les étudiants, makers et passionnés de robotique.
                    </h3>

                    <p class="text-gray-600 leading-relaxed mb-6">
                        Aerisys propose un drone open-source modulaire destiné à l'apprentissage pratique de
                        l'électronique, de la robotique et de l'aéronautique.
                        <br/>
                        Notre objectif : rendre la technologie des drones accessible à tous, permettant aux étudiants et
                        makers de construire, programmer et personnaliser leur propre plateforme volante.
                    </p>

                    <div class="flex flex-wrap gap-3">
                        <span class="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                            Open Source
                        </span>
                        <span class="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                            Modulaire
                        </span>
                        <span class="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                            Éducatif
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
