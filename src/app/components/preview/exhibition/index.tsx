"use client"
import { ExhibitionPreviewProps } from "@/app/preview/exhibition/[id]/page"
import { useExhibitionStyles } from "../../exhibition"
import ExhibitionSections from "../../exhibition/exhibitionSections"
import Head from "../../exhibition/head"
import Paper from "../../paper"
import Password from "../password"
import PreviewInfo from "./previewInfo"

const ExhibitionPreview = (props: ExhibitionPreviewProps) => {
  const { exhibitionData, navData, isEnabled, previewPassword, previewURL, directusUrl } = props

  // cookieSlug is the cookie that gets set after you enter the password
  const cookieSlug = `rail_preview_${exhibitionData.slug}`

  const combinedStyles = useExhibitionStyles(exhibitionData)

  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <Paper
        previewURL={previewURL}
        pageClass={combinedStyles.className}
        pageStyle={combinedStyles.style}
        navData={navData}
      >
        {previewURL && (
          <div className="py-2 flex flex-col space-y-6">
            <PreviewInfo exhibitionData={exhibitionData} directusUrl={directusUrl} />
          </div>
        )}
        <main className="space-y-16 h-event">
          <Head exhibitionData={exhibitionData} />
          <ExhibitionSections exhibitionData={exhibitionData} />
        </main>
      </Paper>
    </Password>
  )
}

export default ExhibitionPreview
