"use client"
import Paper from "../paper"
import { ExhibitionProps } from "@/app/exhibition/[slug]/page"
import Head from "./head"
import ExhibitionSections from "./exhibitionSections"
import styles from "./exhibition.module.scss"
import { useMemo } from "react"

const ExhibitionPage = (props: ExhibitionProps) => {
  const { exhibitionData, navData } = props
  const { end_date } = exhibitionData

  const {
    background_color_primary: backgroundColorPrimary,
    background_color_secondary: backgroundColorSecondary,
    background_color_primary_darkmode: backgroundColorPrimaryDarkmode,
    background_color_secondary_darkmode: backgroundColorSecondaryDarkmode,
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

    return style
  }, [
    backgroundColorPrimary,
    backgroundColorSecondary,
    backgroundColorPrimaryDarkmode,
    backgroundColorSecondaryDarkmode,
  ])

  // It is in the future if the end date is greater than the current date
  const isFutureEvent = new Date(end_date) > new Date()

  // Combine the class and style into one object for Paper
  const combinedStyles = {
    className: styles["theme-exhibitions"],
    style: {
      "--exhibition-bg-primary": cleanValue(backgroundColorPrimary),
      "--exhibition-bg-secondary": cleanValue(backgroundColorSecondary),
      "--exhibition-bg-primary-dark": cleanValue(backgroundColorPrimaryDarkmode),
      "--exhibition-bg-secondary-dark": cleanValue(backgroundColorSecondaryDarkmode),
    } as React.CSSProperties,
  }

  return (
    <Paper pageClass={combinedStyles.className} pageStyle={combinedStyles.style} navData={navData}>
      <main className="px-3 desktop:max-w-screen-widescreen mx-auto space-y-16 h-event">
        <Head exhibitionData={exhibitionData} />
        <ExhibitionSections exhibitionData={exhibitionData} />
      </main>
    </Paper>
  )
}

export default ExhibitionPage
