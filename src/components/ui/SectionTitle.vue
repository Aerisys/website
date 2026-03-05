<script setup>
defineProps({
    label: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        default: ''
    },
    centered: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div :class="{ 'text-center': centered }">
    <span v-if="label"
          class="inline-block text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
      {{ label }}
    </span>
        <h2 class="text-3xl md:text-4xl font-display font-bold text-gray-900">
            {{ title }}
            <span v-if="highlight"
                  class="text-primary-500">{{ highlight }}</span>
        </h2>
        <slot/>
    </div>
</template>
