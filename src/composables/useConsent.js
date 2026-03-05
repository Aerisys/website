import { ref, computed } from 'vue'

const STORAGE_KEY = 'aerisys-consent'

function loadConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const consentStatus = ref(loadConsent())

export function useConsent() {
  const hasConsented = computed(() => consentStatus.value !== null)

  function acceptConsent() {
    consentStatus.value = 'accepted'
    localStorage.setItem(STORAGE_KEY, 'accepted')
  }

  function refuseConsent() {
    consentStatus.value = 'refused'
    localStorage.setItem(STORAGE_KEY, 'refused')
  }

  return {
    consentStatus,
    hasConsented,
    acceptConsent,
    refuseConsent
  }
}
