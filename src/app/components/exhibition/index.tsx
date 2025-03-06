"use client"
import { ExhibitionProps } from "@/app/exhibition/[slug]/page"
import { useMemo } from "react"
import { Exhibitions } from "../../../../lib/types"
import Paper from "../paper"
import styles from "./exhibition.module.scss"
import ExhibitionSections from "./exhibitionSections"
import Head from "./head"
import ExhibitionSlideshow from "./ExhibitionSlideshow"

const ExhibitionPage = (props: ExhibitionProps) => {
  const { exhibitionData, navData } = props

  const combinedStyles = useExhibitionStyles(exhibitionData)

  return (
    <Paper pageClass={styles["theme-exhibition"]} pageStyle={combinedStyles.style} navData={navData}>
      <main className="space-y-16 h-event">
        <Head exhibitionData={exhibitionData} />
        <ExhibitionSlideshow exhibitionData={exhibitionData} />
        <ExhibitionSections exhibitionData={exhibitionData} />
      </main>
    </Paper>
  )
}

export const useExhibitionStyles = (exhibitionData: Exhibitions) => {
  const {
    background_color_primary: backgroundColorPrimary,
    background_color_secondary: backgroundColorSecondary,
    background_color_primary_darkmode: backgroundColorPrimaryDarkmode,
    background_color_secondary_darkmode: backgroundColorSecondaryDarkmode,
    text_color_primary: textColorPrimary,
    text_color_primary_darkmode: textColorPrimaryDarkmode,
  } = exhibitionData

  // Clean the values by removing any quotes, with proper type checking
  const cleanValue = (value: string | null | undefined): string => {
    if (!value) return ""
    return value.replace(/['"]/g, "")
  }

  const customStyles = useMemo(() => {
    const style: Record<string, string> = {}

    if (backgroundColorPrimary) {
      style["--exhibition-bg-primary"] = backgroundColorPrimary
    }
    if (backgroundColorSecondary) {
      style["--exhibition-bg-secondary"] = backgroundColorSecondary
    }
    if (backgroundColorPrimaryDarkmode) {
      style["--exhibition-bg-primary-dark"] = backgroundColorPrimaryDarkmode
    }
    if (backgroundColorSecondaryDarkmode) {
      style["--exhibition-bg-secondary-dark"] = backgroundColorSecondaryDarkmode
    }
    if (textColorPrimary) {
      style["--exhibition-text-primary"] = textColorPrimary
    }
    if (textColorPrimaryDarkmode) {
      style["--exhibition-text-primary-dark"] = textColorPrimaryDarkmode
    }
    if (textColorPrimary) {
      style["--exhibition-text-gradient"] =
        `linear-gradient(to bottom, ${cleanValue(textColorPrimary)} 0%, ${cleanValue(textColorPrimary)}99 100%)`
    }
    if (textColorPrimary) {
      style["--subhead-fill"] =
        `linear-gradient(to bottom, ${cleanValue(textColorPrimary)} 0%, ${cleanValue(textColorPrimary)}99 100%)`
    }
    if (textColorPrimaryDarkmode) {
      style["--exhibition-text-gradient-dark"] =
        `linear-gradient(to bottom, ${cleanValue(textColorPrimaryDarkmode)} 0%, ${cleanValue(textColorPrimaryDarkmode)}99 100%)`
    }

    return style
  }, [
    backgroundColorPrimary,
    backgroundColorSecondary,
    backgroundColorPrimaryDarkmode,
    backgroundColorSecondaryDarkmode,
    textColorPrimary,
    textColorPrimaryDarkmode,
  ])

  // Combine the class and style into one object for Paper
  const combinedStyles = {
    style: {
      "--exhibition-bg-primary": cleanValue(backgroundColorPrimary),
      "--exhibition-bg-secondary": cleanValue(backgroundColorSecondary),
      "--exhibition-bg-primary-dark": cleanValue(backgroundColorPrimaryDarkmode),
      "--exhibition-bg-secondary-dark": cleanValue(backgroundColorSecondaryDarkmode),
      "--exhibition-text-primary": cleanValue(textColorPrimary),
      "--exhibition-text-primary-dark": cleanValue(textColorPrimaryDarkmode),
    } as React.CSSProperties,
  }

  return {
    style: combinedStyles.style,
  }
}

export default ExhibitionPage
