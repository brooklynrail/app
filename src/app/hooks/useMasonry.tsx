import { useEffect, useState, useRef } from "react"

export enum LayoutMode {
  Block = "block",
  Grid = "grid",
  List = "list",
}

const useMasonry = (layoutMode: LayoutMode) => {
  const masonryContainer = useRef<HTMLDivElement | null>(null)
  const [items, setItems] = useState<ChildNode[]>([])

  useEffect(() => {
    if (masonryContainer.current) {
      const masonryItem = Array.from(masonryContainer.current.children)
      setItems(masonryItem)
    }
  }, [])

  useEffect(() => {
    const handleMasonry = () => {
      if (!items || items.length < 1 || layoutMode !== "block") {
        // Reset custom positioning if masonry is off or layout is "list"
        items.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.marginTop = "0" // Reset positioning for grid or list mode
          }
        })
        return
      }

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

    handleMasonry() // Run when layout mode changes
    window.addEventListener("resize", handleMasonry)

    return () => {
      window.removeEventListener("resize", handleMasonry)
    }
  }, [items, layoutMode]) // Add layoutMode as a dependency

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
