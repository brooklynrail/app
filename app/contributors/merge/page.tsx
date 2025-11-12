import ProtectedContributorsMerge from "@/components/contributors/merge"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNavDataFromAPI } from "@/lib/utils/navData"
import { getPreviewPassword } from "@/lib/utils/preview"
import { MergePageProps } from "@/lib/railTypes"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MERGE Contributors",
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

export default async function ContributorsMergePage() {
  const data = await getData()
  return <ProtectedContributorsMerge {...data} />
}

async function getData(): Promise<MergePageProps> {
  const [navData, previewPassword] = await Promise.all([getNavDataFromAPI(), getPreviewPassword()])

  if (!navData || !previewPassword) {
    return notFound()
  }

  return {
    navData,
    previewPassword,
  }
}
