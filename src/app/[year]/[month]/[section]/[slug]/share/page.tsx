import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

interface ArticleParams {
  year: string
  month: string
  section: string
  slug: string
}

export default async function ArticlePageController({ params }: { params: ArticleParams }) {
  console.log("ArticlePageController", params)

  const ogImage = `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/?type=article&slug=${params.slug}`

  if (!ogImage) {
    return notFound()
  }

  return (
    <div className="w-full h-full min-h-screen bg-zinc-800 p-6">
      <Image src={ogImage} alt={``} width="600" height="600" />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
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
