"use client"
import CoversPopup from "../issueRail/coversPopup"
import Ad970 from "../ads/ad970"
import { Ads, Articles } from "../../../../lib/types"
import { useEffect, useState } from "react"
import { getAds } from "../../../../lib/utils"
import { PopupProvider } from "../issueRail/popupProvider"
import PreviewHeader from "../preview/previewHead"
import Footer from "../footer"
import { EventPageProps } from "@/app/events/[year]/[month]/[day]/[slug]/page"

export interface PaperProps {
  pageClass: string
  children: React.ReactNode
}

const Paper = (props: PaperProps) => {
  const { pageClass, children } = props

  return (
    <>
      <div className={`paper ${pageClass}`}>{children}</div>
    </>
  )
}

export default Paper
