import "../../styles/uswds/styles.scss"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "The Brooklyn Rail",
  description:
    "The Brooklyn Rail is a journal committed to providing an independent forum for visual arts, culture, and politics throughout New York City and beyond.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body>{children}</body>
      </html>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
