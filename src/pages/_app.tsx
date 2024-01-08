// pages/_app.js
import type { AppProps } from "next/app"
import "../../styles/uswds/styles.scss"

function RailApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default RailApp
