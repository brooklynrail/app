import "../../styles/issue/styles.scss"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("https://brooklynrail.org"),
  title: "The Brooklyn Rail",
  description:
    "The Brooklyn Rail is a journal committed to providing an independent forum for visual arts, culture, and politics throughout New York City and beyond.",
  keywords: [
    "Art",
    "Contemporary Art",
    "Artists",
    "Art Critic",
    "Art Books",
    "Culture",
    "Art Reviews",
    "Phong Bui",
    "Brooklyn Art",
    "Brooklyn Culture",
    "New York Art Scene",
    "Poetry",
    "Film",
    "Dance",
    "Theater",
    "Books",
    "Music",
    "Fiction",
  ],
  generator: "Next.js",
  applicationName: "The Brooklyn Rail",
  publisher: "The Brooklyn Rail",
  openGraph: {
    title: "The Brooklyn Rail",
    description:
      "The Brooklyn Rail is a journal committed to providing an independent forum for visual arts, culture, and politics throughout New York City and beyond.",
    url: "https://brooklynrail.org",
    type: "website",
    image: "https://brooklynrail.org/material/img/brooklynrail-card-3.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Brooklyn Rail",
    description:
      "The Brooklyn Rail is a journal committed to providing an independent forum for visual arts, culture, and politics throughout New York City and beyond.",
    creator: "@thebrooklynrail",
    images: ["https://brooklynrail.org/material/img/brooklynrail-card-3.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
