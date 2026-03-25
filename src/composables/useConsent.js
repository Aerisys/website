import { ref, computed } from 'vue'
import { initAnalytics } from './useAnalytics'

const STORAGE_KEY = 'aerisys-consent'

function loadConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const consentStatus = ref(loadConsent())

// Si l'utilisateur a déjà accepté lors d'une session précédente, charger analytics
if (consentStatus.value === 'accepted') {
  initAnalytics()
}

export function useConsent() {
  const hasConsented = computed(() => consentStatus.value !== null)

  function acceptConsent() {
    consentStatus.value = 'accepted'
    localStorage.setItem(STORAGE_KEY, 'accepted')
    initAnalytics()
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
