import { useEffect, useRef } from 'react'
import { throttle } from '@/utils'
type MouseLeavePageCallback = () => void

export function useMouseLeavePage(onMouseLeavePage: MouseLeavePageCallback) {
  const callbackRef = useRef<MouseLeavePageCallback>(onMouseLeavePage)
  const callback = throttle(() => {
    callbackRef.current()
  }, 500)
  useEffect(() => {
    callbackRef.current = onMouseLeavePage
  }, [onMouseLeavePage])

  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      if (
        event.clientY <= 0 ||
        event.clientX <= 0 ||
        event.clientX >= window.innerWidth ||
        event.clientY >= window.innerHeight
      ) {
        callback()
      }
    }

    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])
}
