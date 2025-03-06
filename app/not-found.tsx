import { notFound } from "next/navigation"
import { getNavData } from "@/lib/utils/homepage"
import NotFound from "@/components/notFound"

export default async function NotFoundPage() {
  const data = await getData()

  return <NotFound {...data} />
}

async function getData() {
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  return {
    navData,
  }
}
