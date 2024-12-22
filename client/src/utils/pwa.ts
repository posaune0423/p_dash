// export const registerServiceWorker = async () => {
//   return navigator.serviceWorker.register('/sw.js')
// }

// export const unregisterServiceWorkers = async () => {
//   const registrations = await navigator.serviceWorker.getRegistrations()
//   await Promise.all(registrations.map((r) => r.unregister()))
// }

export const notificationsSupported = () => {
  if (window === undefined) {
    console.error('window is undefined')
    return false
  }
  if (!window.Notification) {
    console.error('window.Notification is undefined')
    return false
  }
  if (!window.PushManager) {
    console.error('window.PushManager is undefined')
    return false
  }
  if (typeof navigator === 'undefined' || !navigator) {
    console.error('navigator is undefined')
    return false
  }
  if (!navigator.serviceWorker) {
    console.error('navigator.serviceWorker is undefined')
    return false
  }

  return true
}

export const isPWA = () => {
  if (import.meta.env.VITE_PUBLIC_DEBUG === 'true') {
    return true
  }

  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(display-mode: standalone)').matches
}
