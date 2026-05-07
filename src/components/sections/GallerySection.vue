<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { galleryImages } from '@/data/gallery.js'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const lightboxIndex = ref(-1)
const isOpen = computed(() => lightboxIndex.value >= 0)
const currentImage = computed(() =>
    isOpen.value ? galleryImages[lightboxIndex.value] : null
)

function openLightbox(index) {
    lightboxIndex.value = index
}

function closeLightbox() {
    lightboxIndex.value = -1
}

function showPrev() {
    if (!isOpen.value) return
    lightboxIndex.value =
        (lightboxIndex.value - 1 + galleryImages.length) % galleryImages.length
}

function showNext() {
    if (!isOpen.value) return
    lightboxIndex.value = (lightboxIndex.value + 1) % galleryImages.length
}

function onKeydown(e) {
    if (!isOpen.value) return
    if (e.key === 'Escape') closeLightbox()
    else if (e.key === 'ArrowLeft') showPrev()
    else if (e.key === 'ArrowRight') showNext()
}

watch(isOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
})
</script>

<template>
    <section aria-label="Galerie photos" class="section-padding bg-gray-50">
        <div class="container-custom">
            <SectionTitle label="GALERIE"
                          title=""
                          :centered="true"/>
            <div class="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <button v-for="(image, index) in galleryImages"
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
        </div>

        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <div v-if="isOpen"
                     role="dialog"
                     aria-modal="true"
                     :aria-label="currentImage?.alt"
                     class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                     @click.self="closeLightbox">
                    <button type="button"
                            @click="closeLightbox"
                            aria-label="Fermer"
                            class="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>

                    <button type="button"
                            @click="showPrev"
                            aria-label="Image precedente"
                            class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>

                    <button type="button"
                            @click="showNext"
                            aria-label="Image suivante"
                            class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>

                    <figure class="max-w-[92vw] max-h-[88vh] flex flex-col items-center gap-4">
                        <img :src="currentImage.src"
                             :alt="currentImage.alt"
                             class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"/>
                        <figcaption v-if="currentImage.alt"
                                    class="text-sm text-white/80 text-center">
                            {{ currentImage.alt }}
                            <span class="ml-2 text-white/50">
                                {{ lightboxIndex + 1 }} / {{ galleryImages.length }}
                            </span>
                        </figcaption>
                    </figure>
                </div>
            </Transition>
        </Teleport>
    </section>
</template>
