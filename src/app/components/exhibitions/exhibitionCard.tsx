"use client"
import Image from "next/image"
import Link from "next/link"
import { Exhibitions } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
interface ExhibitionCardProps {
  exhibition: Exhibitions
}
const ExhibitionCard = (props: ExhibitionCardProps) => {
  const { title, end_date, start_date, kicker, featured_image } = props.exhibition

  // Format dates for exhibition
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)

  // Format dates with en dash
  const showDates = `${startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })}–${endDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`

  const permalink = getPermalink({
    type: PageType.Exhibition,
    slug: props.exhibition.slug,
  })

  const featured = featured_image && `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${featured_image.filename_disk}`

  return (
    <section className="relative py-4 tablet:py-8 cursor-pointer">
      <div className="desktop:max-w-screen-desktop-lg mx-auto pb-40 px-3">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-9 tablet-lg:gap-y-16 desktop:gap-y-20">
          <div className="col-span-12 tablet-lg:col-span-6">
            <div className="space-y-9">
              <div className="space-y-0.5">
                {kicker && <p className="text-sm tablet-lg:text-lg font-medium">{kicker}</p>}
                <h2 className="py-3 text-xl tablet-lg:text-6xl font-light">
                  <Link href={permalink} title={title}>
                    {title}
                  </Link>
                </h2>
              </div>

              <div className="space-y-0.5">
                <p className="text-base tablet-lg:text-xl font-light">{showDates}</p>
                <p className="text-base tablet-lg:text-xl font-light">
                  Opening:{" "}
                  {startDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          {featured && (
            <div className="col-span-12 tablet-lg:col-span-6">
              <div className="py-2 tablet:py-0">
                <Link className="block" href={permalink} title={title}>
                  <Image src={featured} alt={title} width={800} height={800} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ExhibitionCard
