import { notFound } from "next/navigation"
import NotFound from "../app/components/notFound"
import { getBaseUrl, getNavData } from "../../lib/utils"

export default async function NotFoundPage() {
  const data = await getData()

  return <NotFound {...data} />
}

async function getData() {
  const navData = await getNavData()

  return {
    navData,
  }
}
