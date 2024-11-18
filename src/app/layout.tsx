import localFont from "next/font/local"
import "../../styles/globals.scss"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from "@next/third-parties/google"
import { ThemeProvider } from "./components/theme"
import { RailPostHogProvider } from "./providers/posthog"
import PostHogPageView from "./providers/postHogPageView"
import { Suspense } from "react"

const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

// FONTS ==============================================
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts

// Untitled Sans Font Configuration
const untitledSans = localFont({
  src: [
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/untitled-sans/UntitledSansWeb-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-family-sans",
  display: "swap",
})

// Untitled Serif Font Configuration
const untitledSerif = localFont({
  src: [
    {
      path: "./fonts/untitled-serif/UntitledSerifWeb-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/untitled-serif/UntitledSerifWeb-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/untitled-serif/UntitledSerifWeb-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/untitled-serif/UntitledSerifWeb-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/untitled-serif/UntitledSerifWeb-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/untitled-serif/UntitledSerifWeb-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-family-serif",
  display: "swap",
})

// ==============================================

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : new URL("https://brooklynrail.org"),
  title: {
    template: "%s - The Brooklyn Rail",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${untitledSans.variable} ${untitledSerif.variable}`}>
      <meta name="theme-color" content="#EF4444" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <RailPostHogProvider>
        <body>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <ThemeProvider>{children}</ThemeProvider>
          <GoogleAnalytics gaId="G-P4BEY1BZ04" />
          <Analytics />
          <SpeedInsights />
        </body>
      </RailPostHogProvider>
    </html>
  )
}
