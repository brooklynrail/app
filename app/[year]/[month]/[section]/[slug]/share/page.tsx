import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

interface ArticleParams {
  year: string
  month: string
  section: string
  slug: string
}

interface SharePageProps {
  params: ArticleParams
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

export default async function SharePage({ params }: SharePageProps) {
  if (!params.slug) {
    return notFound()
  }

  const ogImage = `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/?type=article&slug=${params.slug}`

  return (
    <div className="w-full h-full min-h-screen bg-zinc-800 p-6">
      <Image
        src={ogImage}
        alt="Article share preview"
        width={600}
        height={600}
        priority // Add priority since this is the main content
      />
    </div>
  )
}
