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
  const [selectedContributorIds, setSelectedContributorIds] = useState<string[]>([])
  const [primaryContributorId, setPrimaryContributorId] = useState<string | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<PersonWithMatches | null>(null)
  const { navData, allPeople: people } = props

  const likelyMatches = people.map((person: People) => {
    const matches = props.allContributors.filter((contributor: Contributors) => {
      return contributor.first_name === person.first_name && contributor.last_name === person.last_name
    })
    // Only include matches array if it has entries
    return matches.length > 0 ? { ...person, matches } : person
  })

  const handleContributorToggle = (contributorId: string) => {
    setSelectedContributorIds((prev) =>
      prev.includes(contributorId) ? prev.filter((id) => id !== contributorId) : [...prev, contributorId],
    )
  }

  const handlePersonClick = (person: People) => {
    if (person === selectedPerson) {
      setSelectedPerson(null)
      setSelectedContributorIds([])
      setPrimaryContributorId(null)
    } else {
      setSelectedPerson(person)
      const matches = (person as PersonWithMatches).matches || []
      const matchingContributorIds = matches.map((c) => c.id)
      setSelectedContributorIds(matchingContributorIds)

      // Set primary contributor based on old_id
      if (matches.length > 0) {
        const primaryContributor = matches.reduce((prev, current) => {
          const prevOldId = parseInt(String(prev.old_id || "0"))
          const currentOldId = parseInt(String(current.old_id || "0"))
          return currentOldId > prevOldId ? current : prev
        })
        setPrimaryContributorId(primaryContributor.id)
      }
    }
  }

  const handlePrimarySelect = (contributorId: string) => {
    setPrimaryContributorId(contributorId === primaryContributorId ? null : contributorId)
  }

  const allPeople = (
    <>
      {likelyMatches.map((person: any, i: number) => {
        if ("matches" in person) {
          return (
            <div
              onClick={() => handlePersonClick(person)}
              className={`cursor-pointer ${selectedPerson?.id === person.id ? "bg-amber-200 dark:bg-gray-800" : ""}`}
            >
              <Person key={`${person.id}-${i}`} {...person} showBio={false} />
            </div>
          )
        }
        return null
      })}
    </>
  )

  const selectedContributors = (
    <>
      {selectedPerson?.matches
        ?.sort((a, b) => {
          const aOldId = parseInt(String(a.old_id || "0"))
          const bOldId = parseInt(String(b.old_id || "0"))
          return bOldId - aOldId
        })
        .map((contributor: Contributors, i: number) => {
          const permalink = getPermalink({
            slug: contributor.slug,
            type: PageType.Contributor,
          })

          return (
            <Contributor
              key={`${contributor.id}-${i}`}
              permalink={permalink}
              contributor={contributor}
              isSelected={selectedContributorIds.includes(contributor.id)}
              isPrimary={primaryContributorId === contributor.id}
              onToggleSelect={() => handleContributorToggle(contributor.id)}
              onPrimarySelect={() => handlePrimarySelect(contributor.id)}
            />
          )
        }) || <p className="text-sm text-gray-500">Select a person to see matching contributors</p>}
    </>
  )

  return (
    <Paper pageClass="theme" navData={navData}>
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
          <div className="col-span-4 tablet-lg:col-span-4 space-y-3">
            <div className="">
              <div className="space-y-3">
                <h2 className="text-2xl font-light">People</h2>
              </div>
              <p className="text-sm">
                <strong>{likelyMatches.length} people</strong> have likely contributed to the <em>Rail</em>
              </p>
              <div className="contributors divide-y divide-gray-600 divide-dotted h-screen overflow-y-scroll border-t rail-border">
                {allPeople}
              </div>
            </div>
          </div>
          <div className="col-span-4 tablet-lg:col-span-8 tablet-lg:col-start-5 space-y-9">
            <div className="space-y-12 mt-[4.85rem] border-t rail-border ">
              {selectedPerson && <Person {...(selectedPerson as People)} showBio={true} />}
              <div className="space-y-3 border-t rail-border py-3">
                <p className="text-lg font-light">Select the contributors that match this person</p>
                <div className="py-3 contributors divide-y divide-gray-600 divide-dotted">{selectedContributors}</div>
              </div>
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
  isSelected: boolean
  isPrimary: boolean
  onToggleSelect: () => void
  onPrimarySelect: () => void
}

const Contributor = ({
  permalink,
  contributor,
  isSelected,
  isPrimary,
  onToggleSelect,
  onPrimarySelect,
}: ContributorProps) => {
  return (
    <div className="space-y-1.5 py-3">
      <div className="flex space-x-6 justify-between">
        <div className="flex flex-col w-full space-y-1.5">
          <div className="flex justify-start items-end space-x-3">
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
            <p className="text-xs">#{contributor.old_id}</p>
            <p className="text-xs">{contributor.articles.length} articles</p>
            <p className="text-xs bg-gray-200 px-1 rounded-sm text-red-800">{contributor.slug}</p>
          </div>
          <p className="text-xs">
            <span className="block">{parse(contributor.bio || "---")}</span>
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-3 h-full items-start justify-center">
            <button
              onClick={onPrimarySelect}
              className={`text-xs flex-none px-3 py-1 block rounded-md ${
                isPrimary
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500 line-through"
              }`}
            >
              Short Bio
            </button>
            <button
              onClick={onToggleSelect}
              className={`text-xs flex-none px-3 py-1 block rounded-md ${
                isSelected
                  ? "bg-green-500 dark:bg-green-800"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500 line-through"
              }`}
            >
              Match
            </button>
          </div>
        </div>
      </div>
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
      <div className="flex justify-between items-center pr-1">
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
          <p className="text-xs">{person.events.length} events</p>
        </div>
      </div>
      {person.showBio && <div className="text-sm">{parse(person.bio || "---")}</div>}
    </div>
  )
}

export default ContributorsMerge
