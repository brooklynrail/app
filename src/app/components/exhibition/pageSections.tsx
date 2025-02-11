"use client"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import parse from "html-react-parser"
import { ExhibitionProps } from "@/app/exhibition/[slug]/page"
import { Exhibitions, ExhibitionSection, ExhibitionsPeople2 } from "../../../../lib/types"

const ExhibitionSections = (props: ExhibitionProps) => {
  const { exhibitionData } = props
  const { start_date, end_date, section } = exhibitionData

  const isFutureExhibition = new Date(end_date) > new Date()

  // Format dates for exhibition
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)

  if (!section) {
    return null
  }

  return (
    <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-y-9 tablet-lg:gap-y-16 desktop:gap-y-20">
      <div className="col-span-4 tablet-lg:col-span-3 desktop-lg:col-span-2">
        <div className="sticky top-16 pt-6">
          <ul className="space-y-3">
            {section.map((block: ExhibitionSection) => (
              <SectionNav {...block} key={block.section_nav} />
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-8">
        <div className="flex flex-col space-y-3 tablet-lg:space-y-20">
          {section.map((block: ExhibitionSection) => (
            <SectionBlock block={block} exhibitionData={exhibitionData} key={block.section_nav} />
          ))}
        </div>
      </div>
    </div>
  )
}

const SectionNav = (block: ExhibitionSection) => {
  const { section_nav, section_title } = block
  const sectionId = section_title.toLowerCase().replace(/[^a-z0-9]/g, "-")

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <li className="text-lg font-normal block">
      <a href={`#${sectionId}`} onClick={scrollToSection} className="hover:underline">
        {parse(section_nav)}
      </a>
    </li>
  )
}

interface SectionBlockProps {
  exhibitionData: Exhibitions
  block: ExhibitionSection
}
const SectionBlock = (props: SectionBlockProps) => {
  const { block, exhibitionData } = props
  const { section_title, section_body } = block
  const sectionId = section_title.toLowerCase().replace(/[^a-z0-9]/g, "-")

  const processContent = (htmlContent: string) => {
    const parsed = parse(htmlContent, {
      replace: (domNode) => {
        if ("children" in domNode && domNode.children?.[0]?.type === "text") {
          const text = domNode.children[0].data
          // Updated regex to capture attributes
          const match = text.match(/{{(.*?)}}/)
          if (match) {
            const [command, ...attributes] = match[1].trim().split(" ")
            // Replace with appropriate component based on variable
            switch (command) {
              case "artists":
                return (
                  <ArtistsList
                    exhibitionData={exhibitionData}
                    showBio={attributes.includes("bio")}
                    showLink={attributes.includes("link")}
                  />
                )
              default:
                return null
            }
          }
        }
        return domNode
      },
    })
    return parsed
  }

  return (
    <section id={sectionId} className="h-entry">
      <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl tablet-lg:text-3xl font-medium">{parse(section_title)}</h2>
          <div className="text-lg font-light content">{processContent(section_body)}</div>
        </div>
      </div>
    </section>
  )
}

interface ArtistsListProps {
  exhibitionData: Exhibitions
  showBio?: boolean
  showLink?: boolean
}

const ArtistsList = (props: ArtistsListProps) => {
  const { exhibitionData, showBio = false, showLink = false } = props
  const { artists } = exhibitionData

  return (
    <div className="space-y-6 pb-9">
      {artists.map((artist) => (
        <div key={artist.people_id.id} className="artist space-y-1.5">
          <h4 className="">
            {showLink ? (
              <Link href={`#`} className="">
                {artist.people_id.display_name}
              </Link>
            ) : (
              artist.people_id.display_name
            )}
          </h4>
          {showBio && artist.people_id.bio && <p className="bio">{parse(artist.people_id.bio)}</p>}
        </div>
      ))}
    </div>
  )
}

export default ExhibitionSections
