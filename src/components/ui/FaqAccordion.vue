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
  <div class="border-b border-gray-200 last:border-b-0">
    <button
      class="w-full py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
      @click="$emit('toggle', item.id)"
    >
      <span class="text-base font-medium text-gray-900 pr-4">{{ item.question }}</span>
      <span 
        class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-transform duration-200"
        :class="{ 'rotate-45': isOpen }"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </span>
    </button>
    
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="isOpen" class="overflow-hidden">
        <p class="pb-5 text-gray-600 leading-relaxed">
          {{ item.answer }}
        </p>
      </div>
    </Transition>
  </div>
</template>
