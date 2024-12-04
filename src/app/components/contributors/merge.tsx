"use client"
import Image from "next/image"
import Link from "next/link"
import parse from "html-react-parser"
import { Contributors, Homepage, Issues, People } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Paper from "../paper"
import { useState } from "react"
import { useRouter } from "next/navigation"
import PortraitImage from "../portraitImage"

interface ContributorsMergeProps {
  thisIssueData: Issues
  allContributors: Contributors[]
  allPeople: People[]
  navData: Homepage
}

interface PersonWithMatches extends People {
  matches?: Contributors[]
}

const ContributorsMerge = (props: ContributorsMergeProps) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<PersonWithMatches | null>(null)
  const { navData, allPeople: people } = props

  console.log("selectedPerson", selectedPerson)

  // for each person, check if they also exist as a contributor
  // using the first_name and last_name from the people record
  // and the first_name and last_name from the contributor record
  // there also might be multiple contributors with the same name, which is fine
  // we need to end up with a list of people and for each person, an array of contributor objects that match
  const twins = people.map((person: People) => {
    const matches = props.allContributors.filter((contributor: Contributors) => {
      return contributor.first_name === person.first_name && contributor.last_name === person.last_name
    })
    // Only include matches array if it has entries
    return matches.length > 0 ? { ...person, matches } : person
  })

  const handlePersonClick = (person: People) => {
    setSelectedPerson(person === selectedPerson ? null : person)
  }

  const allTwins = (
    <>
      {twins.map((twin: any, i: number) => {
        if ("matches" in twin) {
          return (
            <div
              onClick={() => handlePersonClick(twin)}
              className={`cursor-pointer ${selectedPerson?.id === twin.id ? "bg-gray-100 dark:bg-gray-800" : ""}`}
            >
              <Person key={`${twin.id}-${i}`} {...twin} showBio={false} />
            </div>
          )
        }
        return null
      })}
    </>
  )

  const selectedContributors = (
    <>
      {selectedPerson?.matches?.map((contributor: Contributors, i: number) => {
        const permalink = getPermalink({
          slug: contributor.slug,
          type: PageType.Contributor,
        })
        return <Contributor key={`${contributor.id}-${i}`} permalink={permalink} contributor={contributor} />
      }) || <p className="text-sm text-gray-500">Select a person to see matching contributors</p>}
    </>
  )

  return (
    <Paper pageClass="theme-people" navData={navData}>
      <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
            <div className="pb-12">
              <header className="py-12">
                <h1 className="font-light text-5xl">Contributors</h1>
              </header>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-5">
            <h2 className="text-2xl font-light">People</h2>
            <p className="text-sm">{twins.length} People likely have a Contributor record</p>
            <div className="py-3 contributors divide-y divide-gray-600 divide-dotted">{allTwins}</div>
          </div>
          <div className="col-span-4 tablet-lg:col-span-5 tablet-lg:col-start-8 space-y-9">
            {selectedPerson && <Person {...(selectedPerson as People)} showBio={true} />}
            <div className="space-y-3 border-t rail-border py-3">
              <p className="text-lg font-light">Select the contributors that match this person</p>
              <div className="py-3 contributors divide-y divide-gray-600 divide-dotted">{selectedContributors}</div>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-5">
            <h2 className="text-2xl font-light">People</h2>
            <div className="contributors divide-y divide-gray-600 divide-dotted">{allPeople}</div>
          </div>
          <div className="col-span-4 tablet-lg:col-span-5 tablet-lg:col-start-8">
            <h2 className="text-2xl font-light">Contributors</h2>
            <div className="contributors divide-y divide-gray-600 divide-dotted">{allContributors}</div>
          </div>
        </div> */}
      </main>
    </Paper>
  )
}

interface ContributorProps {
  permalink: string
  contributor: Contributors
}

const Contributor = ({ permalink, contributor }: ContributorProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <p className="font-light text-lg">
          <Link
            target="_blank"
            className="underline decoration-1 underline-offset-4 decoration-dotted"
            href={permalink}
            title={`${contributor.first_name} ${contributor.last_name}`}
          >
            {contributor.first_name} {contributor.last_name}
          </Link>
        </p>
        <p className="text-xs">{contributor.articles.length} articles</p>
      </div>
      <p className="text-xs">
        <span className="block">{parse(contributor.bio || "---")}</span>
      </p>
    </div>
  )
}

const Person = (person: People & { showBio: boolean }) => {
  if (person.id === "4d146d30-7c6a-4b7c-b0be-4f18639fead1") {
    console.log("Dao Strom", person)
  }
  const src =
    person.portrait &&
    `${process.env.NEXT_PUBLIC_IMAGE_PATH}${person.portrait.filename_disk}?fit=cover&width=400&height=400&quality=85&modified_on=${person.portrait.modified_on}`
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <div className="py-1.5 flex items-center space-x-3">
          <div className="w-9 h-9 flex-none">
            {person.portrait && src && (
              <Image
                sizes={`10vw`}
                className="object-cover rounded-full"
                src={src}
                width={100}
                height={100}
                alt={`${person.first_name} ${person.last_name}`}
              />
            )}
          </div>
          <div>
            <p>
              {person.first_name} {person.last_name}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs">{person.events.length}</p>
        </div>
      </div>
      {person.showBio && <div className="text-sm">{parse(person.bio || "---")}</div>}
    </div>
  )
}

export default ContributorsMerge
