import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current
    if (!node || isVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [isVisible])

  return { ref, isVisible }
}
