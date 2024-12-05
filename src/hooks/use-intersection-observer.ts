import { useEffect, useState, RefObject } from 'react'

interface UseIntersectionObserverProps {
  ref: RefObject<Element>
  threshold?: number
  rootMargin?: string
}

export function useIntersectionObserver({
  ref,
  threshold = 0.1,
  rootMargin = "0px",
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
        threshold,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, threshold, rootMargin])

  return isIntersecting
}

