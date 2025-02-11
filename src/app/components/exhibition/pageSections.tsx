"use client"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../lib/utils"
import parse from "html-react-parser"
import { ExhibitionProps } from "@/app/exhibition/[slug]/page"
import { ExhibitionSection } from "../../../../lib/types"

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
        {section.map((block: ExhibitionSection) => (
          <SectionBlock {...block} key={block.section_nav} />
        ))}
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

const SectionBlock = (block: ExhibitionSection) => {
  const { section_title, section_body } = block
  // Use the same ID generation logic as in SectionNav
  const sectionId = section_title.toLowerCase().replace(/[^a-z0-9]/g, "-")
  return (
    <section id={sectionId} className="h-entry py-6 tablet-lg:py-12">
      <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
        <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
          <h2 className="text-3xl mobile-lg:text-4xl font-normal">{parse(section_title)}</h2>
          <div className="text-xl font-light content">{parse(section_body)}</div>
        </div>
      </div>
    </section>
  )
}

export default ExhibitionSections
