<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue';
</script>

<template>
    <section class="section-padding bg-linear-to-br from-primary-50 via-blue-50 to-sky-50">
        <div class="container-custom">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <!-- Content -->
                <div>
                    <SectionTitle label="LE CONCEPT"
                                  title="Du Rêve au"
                                  highlight=" Vol"
                                  :centered="false"/>
                    <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-4">
                        Découvrez comment nous avons construit un drone de zéro
                    </h3>

                    <p class="text-gray-600 leading-relaxed mb-6">
                        Aerisys transforme une ambition simple en réalité technologique: créer un drone entièrement
                        pensé et développé par une équipe étudiante.
                        De la conception 3D du châssis à la programmation ESP32, en passant par le développement de la
                        radiocommande sur-mesure et l'application obile, chaque étape est maîtrisée en interne.
                        <br/>
                        Le résultat ? Un système modulable, personnalisable et écologique, conçu pour les passionnés,
                        les makers et les usages éducatifs.
                    </p>

                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5 text-primary-600"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">Conception modulaire</h4>
                                <p class="text-sm text-gray-600">Structure adaptable et évolutive</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5 text-primary-600"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">Code open source</h4>
                                <p class="text-sm text-gray-600">Entièrement accessible et modifiable</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5 text-primary-600"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">Documentation complète</h4>
                                <p class="text-sm text-gray-600">Guides détaillés pour l'assemblage</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Image -->
                <div class="relative">
                    <div class="relative">
                        <!-- Drone placeholder -->
                        <div class="rounded-3xl overflow-hidden shadow-2xl">
                            <img src="/images/home/drone-concept.png"
                                 alt="Drone Aerisys concept"
                                 class="w-full h-full object-contain relative z-10"
                                 loading="lazy"
                                 @error="$event.target.style.display = 'none'"/>
                        </div>

                        <!-- Decorative elements -->
                        <div class="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-200 rounded-2xl -z-10"/>
                        <div class="absolute -top-4 -right-4 w-16 h-16 bg-sky-200 rounded-full -z-10"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
