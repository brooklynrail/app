"use client"
import { TributePreviewProps } from "@/lib/railTypes"
import { getPermalink, PageType } from "@/lib/utils"
import TributePage from "../../tributePage"
import Password from "../password"

const TributePreview = (props: TributePreviewProps) => {
  const { tributeData, isEnabled, previewPassword, articleData, navData } = props
  const cookieSlug = `rail_preview_${tributeData.slug}`

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
