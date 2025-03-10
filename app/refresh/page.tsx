import { Metadata } from "next"
import Refresh from "@/components/refresh"

// Force dynamic rendering, no caching
export const dynamic = "force-dynamic"
export const revalidate = 0

// Metadata Generation
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Refresh Controller",
    description: "Bust the cache on any page on the site.",
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

// Main Page Component
export default async function RefreshController() {
  return <Refresh />
}
