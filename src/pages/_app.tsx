// pages/_app.js
import type { AppProps } from "next/app"
import "../../styles/uswds/styles.scss"
import { PopupProvider } from "@/components/issueRail/popupProvider"
import { DefaultSeo } from "next-seo"

function RailApp({ Component, pageProps }: AppProps) {
  return (
    <PopupProvider>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
          description:
            "The Brooklyn Rail is a journal committed to providing an independent forum for visual arts, culture, and politics throughout New York City and beyond.",
          url: "https://brooklynrail.org/",
          siteName: "The Brooklyn Rail",
        }}
        twitter={{
          handle: "@thebrooklynrail",
          site: "@brooklynrail",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </PopupProvider>
  )
}

export default RailApp
