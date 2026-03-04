import { ref } from 'vue'

export function useAccordion(allowMultiple = false) {
  const openItems = ref(new Set())

  const toggle = (id) => {
    if (openItems.value.has(id)) {
      openItems.value.delete(id)
    } else {
      if (!allowMultiple) {
        openItems.value.clear()
      }
      openItems.value.add(id)
    }
    // Force reactivity
    openItems.value = new Set(openItems.value)
  }

  const isOpen = (id) => openItems.value.has(id)

  const openAll = (ids) => {
    openItems.value = new Set(ids)
  }

  const closeAll = () => {
    openItems.value = new Set()
  }

  return {
    openItems,
    toggle,
    isOpen,
    openAll,
    closeAll
  }
}
