// pages/_app.js
import type { AppProps } from "next/app"
import "../../styles/uswds/styles.scss"
import { PopupProvider } from "@/components/issueRail/popupProvider"

function RailApp({ Component, pageProps }: AppProps) {
  return (
    <PopupProvider>
      <Component {...pageProps} />
    </PopupProvider>
  )
}

export default RailApp
