import ProtectedContributorsMerge from "@/app/components/contributors/merge"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNavData } from "../../../../lib/utils/homepage"
import { getPreviewPassword } from "../../../../lib/utils/preview"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `MERGE Contributors`,
    description: "",
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

export default async function ContributorsMergeIndex() {
  const data = await getData()

  return <ProtectedContributorsMerge navData={data.navData} previewPassword={data.previewPassword} />
}

async function getData() {
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const previewPassword = await getPreviewPassword()
  if (!previewPassword) {
    return notFound()
  }

  return {
    navData,
    previewPassword,
  }
}
