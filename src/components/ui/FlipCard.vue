<template>
    <div :class="cn('group h-80 w-72 perspective-[1000px] cursor-pointer', props.class)">
        <div :class="cn('relative h-full rounded-2xl transition-all duration-500 transform-3d', rotation[0])">
            <!-- Front -->
            <div class="absolute size-full overflow-hidden rounded-2xl backface-hidden">
                <slot>
                    <div
                        class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 h-full flex flex-col items-center justify-center gap-5">
                        <!-- Icon -->
                        <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center">
                            <img :src="`/icons/${props.icon}.svg`"
                                 alt=""
                                 class="w-10 h-10 object-contain"/>
                        </div>
                        <!-- Title -->
                        <h3 class="text-xl font-display font-bold text-gray-900 text-center">{{ props.title }}</h3>
                        <!-- Plus button indicator -->
                        <div
                            class="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-primary-500 text-gray-400 group-hover:text-white flex items-center justify-center transition-all duration-300">
                            <svg class="w-5 h-5"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M12 4v16m8-8H4"/>
                            </svg>
                        </div>
                    </div>
                </slot>
            </div>

            <!-- Back -->
            <div :class="cn('absolute h-full w-full overflow-hidden rounded-2xl backface-hidden', rotation[1])">
                <slot name="back">
                    <div
                        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 h-full flex flex-col">
                        <!-- Icon en haut -->
                        <div class="pt-2 flex items-center justify-center">
                            <div class="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                                <img :src="`/icons/${props.icon}.svg`" alt="" class="w-8 h-8 object-contain"/>
                            </div>
                        </div>
                        <!-- Title juste en dessous -->
                        <div class="mt-3 flex items-center justify-center">
                            <h3 class="text-base font-display font-bold text-gray-900 text-center">{{
                                    props.title
                                }}</h3>
                        </div>
                        <!-- Texte centré verticalement et justifié -->
                        <div class="flex-1 flex items-center">
                            <p class="text-gray-600 text-sm leading-relaxed px-2">{{ props.description }}</p>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {cn} from "@/lib/utils";
import {computed} from "vue";

interface FlipCardProps {
    rotate?: "x" | "y";
    class?: string;
    title?: string;
    description?: string;
    icon?: string;
}

const props = withDefaults(defineProps<FlipCardProps>(), {
    rotate: "y",
    title: '',
    description: '',
    icon: 'chip',
});

const rotationClass = {
    x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
    y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
};

const rotation = computed(() => rotationClass[props.rotate]);
</script>
