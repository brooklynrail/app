import { useEffect, useState, useRef } from "react"

export enum LayoutMode {
  Grid = "grid",
  List = "list",
}

const useLayout = (initialLayoutMode: LayoutMode = LayoutMode.Grid) => {
  const layoutContainer = useRef<HTMLDivElement | null>(null)
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(initialLayoutMode)

  useEffect(() => {
    if (layoutContainer.current) {
      layoutContainer.current.style.display = layoutMode === LayoutMode.List ? "block" : "grid"
    }
  }, [layoutMode])

  const toggleLayoutMode = (mode: LayoutMode) => {
    setLayoutMode(mode)
  }

  return { layoutContainer, layoutMode, toggleLayoutMode }
}

export default useLayout
