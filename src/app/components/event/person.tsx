"use client"
import Link from "next/link"
import parse from "html-react-parser"
import { People, RelatedLinks } from "../../../../lib/types"
import PortraitImage from "../portraitImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"

interface PersonProps {
  person: People
  index: number
}

const Person = (props: PersonProps) => {
  const { person, index } = props
  const { bio, instagram, portrait, display_name, website, related_links } = person

  // If instagram is present, remove any leading @ and trim any spaces before or after the string
  const cleanedInstagram = instagram ? instagram.replace(/^@/, "").trim() : ""
  const instagram_url = `https://www.instagram.com/${cleanedInstagram}`

  return (
    <div key={index} className="flex flex-col space-y-3 pt-3">
      <div className="space-y-3">
        <div className="space-y-6">
          <h3 className="font-bold text-xl p-name">{display_name}</h3>
          <div className="text-md tablet-lg:text-lg content-bio p-note tablet-lg:flex tablet-lg:flex-row-reverse gap-x-9">
            {portrait ? <PortraitImage image={portrait} title={display_name} /> : null}
            <p>{parse(bio)}</p>
          </div>
        </div>
        <div>
          <ul className="text-sm list-disc space-y-0.5">
            {website && (
              <li className="space-x-1 flex items-center">
                <FontAwesomeIcon className="relative top-[1px] no-underline" icon={faGlobeAmericas} />
                <Link href={website} target="_blank" rel="noopener noreferrer u-url">
                  {person.website}
                </Link>
              </li>
            )}
            {instagram && (
              <li className="space-x-1 flex items-center">
                <FontAwesomeIcon className="relative top-[1px] no-underline" icon={faInstagram} />
                <Link href={instagram_url} target="_blank" rel="noopener noreferrer u-url">
                  {instagram}
                </Link>
              </li>
            )}
            {related_links &&
              related_links.map((link: RelatedLinks, index) => (
                <li key={index} className="ml-4">
                  <Link href={link.url}>{parse(link.text)}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Person
