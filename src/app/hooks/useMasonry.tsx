import { useEffect, useState, useRef } from "react"

const useMasonry = () => {
  const masonryContainer = useRef<HTMLDivElement | null>(null)
  const [items, setItems] = useState<ChildNode[]>([])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (masonryContainer.current) {
        const masonryItems = Array.from(masonryContainer.current.children)
        setItems(masonryItems)
      }
    })

    if (masonryContainer.current) {
      observer.observe(masonryContainer.current, {
        childList: true, // Observe changes to child nodes
      })

      // Initial setup of items
      const masonryItems = Array.from(masonryContainer.current.children)
      setItems(masonryItems)
    }

    return () => {
      observer.disconnect() // Clean up the observer when unmounting
    }
  }, [])

  useEffect(() => {
    const handleMasonry = () => {
      if (!items || items.length < 1) return
      console.log("items", items)

      let gapSize = 0
      if (masonryContainer.current) {
        gapSize = parseInt(window.getComputedStyle(masonryContainer.current).getPropertyValue("grid-row-gap"))
      }

      items.forEach((el) => {
        if (!(el instanceof HTMLElement)) return
        let previous = el.previousSibling
        while (previous) {
          if (previous.nodeType === 1) {
            el.style.marginTop = "0"
            if (previous instanceof HTMLElement && elementLeft(previous) === elementLeft(el)) {
              el.style.marginTop = -(elementTop(el) - elementBottom(previous) - gapSize) + "px"
              break
            }
          }
          previous = previous.previousSibling
        }
      })
    }

    handleMasonry() // Initial call to handle masonry
    window.addEventListener("resize", handleMasonry)

    return () => {
      window.removeEventListener("resize", handleMasonry)
    }
  }, [items])

  const elementLeft = (el: HTMLElement) => {
    return el.getBoundingClientRect().left
  }

  const elementTop = (el: HTMLElement) => {
    return el.getBoundingClientRect().top + window.scrollY
  }

  const elementBottom = (el: HTMLElement) => {
    return el.getBoundingClientRect().bottom + window.scrollY
  }

  return masonryContainer
}

export default useMasonry
