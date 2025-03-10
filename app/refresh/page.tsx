import Metadata from "next"
import Refresh from "@/components/refresh"

export default function RefreshController() {
  return <Refresh />
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Refresh`,
    description: `Bust the cache on any page on the site.`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  }
}
