"use client"
import parse from "html-react-parser"
import { Exhibitions, ExhibitionSection } from "../../../../lib/types"
import SectionBlock from "./sectionBlock"

interface ExhibitionSectionsProps {
  exhibitionData: Exhibitions
}

const ExhibitionSections = (props: ExhibitionSectionsProps) => {
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
        <div className="flex flex-col space-y-3 tablet-lg:space-y-20 pt-6">
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

export default ExhibitionSections
