<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
</script>

<template>
    <section aria-label="Présentation Aerisys" class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0 h-full w-full z-10">
            <div class="absolute inset-0 bg-[url('/images/home/hero-bg.png')] bg-cover bg-center bg-no-repeat"/>
        </div>

        <!-- Content -->
        <div class="relative z-20 container-custom text-center px-4 py-8 min-h-screen flex flex-col justify-between">
            <!-- Titre en haut -->
            <div class="pt-16">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                    Technologie accessible pour tous !
                </h1>
            </div>

            <!-- Texte centré -->
            <div class="grow flex  justify-center">
                <p class="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
                    Aerisys propose des kits, composants et tutoriels pour construire et maîtriser votre propre
                    drone DRPF à impression 3D. Systèmes embarqués et projet open-source.
                </p>
            </div>

            <!-- Boutons en bas -->
            <div class="pt-6 pb-6 flex items-center justify-center">
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
                    <BaseButton variant="primary"
                                size="lg"
                                href="#projet"
                                class="w-full sm:w-auto">
                        Découvrir le Kit
                    </BaseButton>

                    <BaseButton variant="outline"
                                size="lg"
                                href="#"
                                class="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                        En savoir plus
                    </BaseButton>
                </div>
            </div>
        </div>
    </section>
</template>
