import { useEffect, useRef, RefObject } from 'react'

type EventHandler = (event: MouseEvent) => void

export const useClickOutside = (handler: EventHandler): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [handler])

  return ref
}
