"use client"
import { useState, useEffect } from "react"
import Password from "../password"
import TributePage from "../../tributePage"
import { TributePreviewProps } from "@/app/preview/tribute/[id]/page"
import { getPermalink, PageType } from "@/lib/utils"

const TributePreview = (props: TributePreviewProps) => {
  const { tributeData, isEnabled, previewPassword, articleData, navData } = props
  const [isStudioPreview, setIsStudioPreview] = useState(false)
  const cookieSlug = `rail_preview_${tributeData.slug}`

  useEffect(() => {
    if (window.location.href.includes("draftMode")) {
      setIsStudioPreview(true)
    }
  }, [])

  const permalink = getPermalink({
    tributeSlug: tributeData.slug,
    type: PageType.Tribute,
  })

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/tribute/${tributeData.id}`
  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <TributePage
        navData={navData}
        thisTributeData={tributeData}
        articleData={articleData}
        previewURL={previewURL}
        permalink={permalink}
      />
    </Password>
  )
}

export default TributePreview
