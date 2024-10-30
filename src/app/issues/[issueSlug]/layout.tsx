import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "../../../../styles/globals.scss"
config.autoAddCss = false

const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`
export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : new URL("https://brooklynrail.org"),
  title: {
    template: "%s | The Brooklyn Rail",
    default: "The Brooklyn Rail", // a default is required when creating a template
  },
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
    title: {
      template: "%s | The Brooklyn Rail",
      default: "The Brooklyn Rail - Arts, Culture, Critical Perspectives", // a default is required when creating a template
    },
    description:
      "The Brooklyn Rail is a journal committed to providing an independent forum for visual arts, culture, and politics throughout New York City and beyond.",
    url: "https://brooklynrail.org",
    type: "website",
    image: share_card,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Brooklyn Rail",
    description:
      "The Brooklyn Rail is a journal committed to providing an independent forum for visual arts, culture, and politics throughout New York City and beyond.",
    creator: "@thebrooklynrail",
    images: [share_card],
  },
}

export default function IssueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
