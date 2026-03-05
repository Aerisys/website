<script setup>
defineProps({
    item: {
        type: Object,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: false
    }
})

defineEmits(['toggle'])
</script>

<template>
    <div class="border-b border-gray-200 last:border-b-0 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-50"
         @click="$emit('toggle', item.id)">
        <div class="w-full py-5 flex items-center justify-between text-left">
            <span class="text-base font-medium text-gray-900 pr-4">{{ item.question }}</span>
            <span class="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-transform duration-300 ease-in-out"
                  :class="{ 'rotate-45': isOpen }">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
            </span>
        </div>

        <div class="grid transition-[grid-template-rows] duration-300 ease-in-out"
             :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
            <div class="overflow-hidden">
                <p class="pt-2 pb-5 text-gray-600 leading-relaxed">
                    {{ item.answer }}
                </p>
            </div>
        </div>
    </div>
</template>
