import { ref, computed } from 'vue'

const token = ref(localStorage.getItem('admin_token'))
const loading = ref(false)

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  async function login(email, password) {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Erreur de connexion')
    }
    const { token: jwt } = await res.json()
    token.value = jwt
    localStorage.setItem('admin_token', jwt)
  }

  function logout() {
    token.value = null
    localStorage.removeItem('admin_token')
  }

  async function authFetch(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
    if (res.status === 401) {
      logout()
      if (typeof window !== 'undefined' && !window.location.pathname.endsWith('/admin')) {
        window.location.href = '/boutique/admin'
      }
    }
    return res
  }

  return { token, loading, isAuthenticated, login, logout, authFetch }
}
