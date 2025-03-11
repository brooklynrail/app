import NotFound from "@/components/notFound"
import { NotFoundProps } from "@/lib/railTypes"
import { getNavData } from "@/lib/utils/homepage"

// Force dynamic rendering, no caching
export const dynamic = "force-dynamic"
export const revalidate = 0

// Main Page Component
export default async function NotFoundPage() {
  const data = await getData()

  if (!data) {
    // If we can't get nav data, fall back to a basic 404
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl">404 - Page Not Found</h1>
      </div>
    )
  }

  return <NotFound {...data} />
}

// Data Fetching
async function getData(): Promise<NotFoundProps | undefined> {
  try {
    const navData = await getNavData()
    if (!navData) {
      return undefined
    }

    return {
      navData,
    }
  } catch (error) {
    console.error("Error fetching navigation data for 404 page:", error)
    return undefined
  }
}
