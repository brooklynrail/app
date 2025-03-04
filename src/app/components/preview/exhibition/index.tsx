"use client"
import { ExhibitionPreviewProps } from "@/app/preview/exhibition/[id]/page"
import { useState } from "react"
import ExhibitionPage from "../../exhibition"
import Password from "../password"

const ExhibitionPreview = (props: ExhibitionPreviewProps) => {
  const { exhibitionData, isEnabled, previewPassword, previewURL } = props

  // cookieSlug is the cookie that gets set after you enter the password
  const cookieSlug = `rail_preview_${exhibitionData.slug}`
  const [isStudioPreview, setIsStudioPreview] = useState(false)

  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <ExhibitionPage {...props} previewURL={previewURL} />
    </Password>
  )
}

export default ExhibitionPreview
