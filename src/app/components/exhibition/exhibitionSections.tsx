"use client"
import parse from "html-react-parser"
import { Exhibitions, ExhibitionSection } from "../../../../lib/types"
import SectionBlock from "./sectionBlock"
import styles from "./exhibition.module.scss"
import Image from "next/image"
interface ExhibitionSectionsProps {
  exhibitionData: Exhibitions
}

const ExhibitionSections = (props: ExhibitionSectionsProps) => {
  const { exhibitionData } = props
  const { section, summary, featured_image, title, exhibition_images } = exhibitionData

  if (!section) {
    return null
  }

  const featured = featured_image && `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${featured_image.filename_disk}`

  return (
    <div className="desktop:max-w-screen-desktop-lg mx-auto pb-40 px-3">
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
          <div className={`flex flex-col space-y-14 tablet-lg:space-y-20 pt-6 ${styles.content}`}>
            <div className={`text-2xl tablet-lg:text-3xl desktop-lg:text-4xl font-light`}>{parse(summary)}</div>
            {exhibition_images && exhibition_images.length === 0 && featured && (
              <Image src={featured} alt={title} width={1000} height={1000} />
            )}
            {section.map((block: ExhibitionSection) => (
              <SectionBlock block={block} exhibitionData={exhibitionData} key={block.section_nav} />
            ))}
          </div>
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
