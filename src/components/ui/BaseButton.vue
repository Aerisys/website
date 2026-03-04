<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline', 'white', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  href: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const variantClasses = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  white: 'bg-white text-primary-600 hover:bg-gray-100 focus:ring-white shadow-sm',
  ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base'
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :disabled="disabled"
    class="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[variantClasses[variant], sizeClasses[size]]"
  >
    <slot />
  </component>
</template>
