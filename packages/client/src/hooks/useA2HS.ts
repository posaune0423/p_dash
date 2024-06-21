// NOTE: written by @kodai3 in https://github.com/kodai3/react-use-a2hs/blob/main/src/useA2HS.ts
import { useEffect, useState } from 'react'

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

interface Config {
  onAccepted?: () => void
  onDismissed?: () => void
}

/**
 * prompt A2HS if available.
 * Only Chrome and Edge is supported. (https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent)
 */
export const useA2HS = (config?: Config) => {
  const [promptEvent, setPromptEvent] = useState<IBeforeInstallPromptEvent | null>(null)

  const promptToInstall = () => {
    console.log(promptEvent)
    if (promptEvent) promptEvent.prompt()
  }

  useEffect(() => {
    const listener = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault()
      setPromptEvent(e)
      e.userChoice
        .then((result) => {
          if (result.outcome === 'accepted') {
            if (config?.onAccepted) config.onAccepted()
          } else {
            if (config?.onDismissed) config.onDismissed()
          }
          return
        })
        .catch(console.error)
    }

    window.addEventListener('beforeinstallprompt', listener as EventListener)
    return () => {
      window.removeEventListener('beforeinstallprompt', listener as EventListener)
    }
  }, [config])

  return { promptEvent, promptToInstall }
}
