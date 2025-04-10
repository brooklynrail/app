import parse from "html-react-parser"
import { Exhibitions, ExhibitionSection } from "@/lib/types"
import Link from "next/link"

interface SectionBlockProps {
  exhibitionData: Exhibitions
  block: ExhibitionSection
}

export const processContent = (htmlContent: string, exhibitionData: Exhibitions) => {
  const parsed = parse(htmlContent, {
    replace: (domNode) => {
      // Check if this is a paragraph node with a shortcode
      if ("children" in domNode && domNode.children?.length === 1 && domNode.children[0].type === "text") {
        const text = domNode.children[0].data.trim()
        const match = text.match(/^{{(\w+)(?:\s+[\w-]+)*}}$/)
        if (match) {
          const [command, ...attributes] = match[1].trim().split(/\s+/)
          switch (command) {
            case "artists":
              return <Artists {...exhibitionData} />
            case "artistsList":
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

const SectionBlock = (props: SectionBlockProps) => {
  const { block, exhibitionData } = props
  const { section_title, section_body } = block
  const sectionId = section_title.toLowerCase().replace(/[^a-z0-9]/g, "-")
  return (
    <section id={sectionId} className="h-entry">
      <div className="flex flex-col space-y-3 tablet-lg:space-y-6">
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl tablet-lg:text-3xl font-bold">{parse(section_title)}</h2>
          <div className="text-lg font-light content">{processContent(section_body, exhibitionData)}</div>
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

export const Artists = (exhibitionData: Exhibitions) => {
  const { artists } = exhibitionData

  return (
    <div className="">
      {artists.map((artist, index) => (
        <span key={artist.people_id.id}>
          {artist.people_id.display_name}
          {index < artists.length - 2 && ", "}
          {index === artists.length - 2 && ", and "}
        </span>
      ))}
    </div>
  )
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
export default SectionBlock
