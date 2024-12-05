"use client"
import Image from "next/image"
import Link from "next/link"
import parse from "html-react-parser"
import { Contributors, Homepage, Issues, People } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Paper from "../paper"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { mergePeople } from "../../../../lib/utils/people"

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
  const [selectedContributors, setSelectedContributors] = useState<Contributors[]>([])
  const [primaryContributorId, setPrimaryContributorId] = useState<string | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<PersonWithMatches | null>(null)
  const [showOnlyMatches, setShowOnlyMatches] = useState(true)
  const [showAllContributors, setShowAllContributors] = useState(false)
  const { navData, allPeople: people } = props

  const likelyMatches = people
    .map((person: People) => {
      const matches = props.allContributors.filter((contributor: Contributors) => {
        return contributor.first_name === person.first_name && contributor.last_name === person.last_name
      })
      if (matches.length > 0) {
        return { ...person, matches } as PersonWithMatches
      }
      return null
    })
    .filter((person): person is NonNullable<PersonWithMatches> => person !== null)

  const displayedPeople = showOnlyMatches ? likelyMatches : props.allPeople

  const handleContributorToggle = (contributor: Contributors) => {
    setSelectedContributors((prev) =>
      prev.includes(contributor) ? prev.filter((c) => c.id !== contributor.id) : [...prev, contributor],
    )
  }

  const handlePersonClick = (person: People) => {
    if (person === selectedPerson) {
      setSelectedPerson(null)
      setSelectedContributors([])
      setPrimaryContributorId(null)
    } else {
      setSelectedPerson(person)
      const matches = (person as PersonWithMatches).matches || []
      setSelectedContributors(matches)

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
    if (contributorId !== primaryContributorId) {
      const contributor = props.allContributors.find((c) => c.id === contributorId)
      if (contributor && !selectedContributors.includes(contributor)) {
        handleContributorToggle(contributor)
      }
    }
    setPrimaryContributorId(contributorId === primaryContributorId ? null : contributorId)
  }

  const handleMerge = async () => {
    if (!selectedPerson || !primaryContributorId || selectedContributors.length === 0) {
      return
    }

    try {
      await mergePeople({
        selectedPerson: selectedPerson,
        allContributors: selectedContributors,
      })

      // Reset selections after successful merge
      setSelectedPerson(null)
      setSelectedContributors([])
      setPrimaryContributorId(null)

      // Optionally refresh the page or data
      router.refresh()
    } catch (error) {
      console.error("Error merging people:", error)
      // You might want to add error handling UI here
    }
  }

  const allPeople = (
    <>
      {displayedPeople.map((person: any, i: number) => (
        <div
          key={`${person.id}-${i}`}
          onClick={() => handlePersonClick(person)}
          className={`cursor-pointer ${selectedPerson?.id === person.id ? "bg-amber-200 dark:bg-gray-800" : ""}`}
        >
          <Person {...person} showBio={false} />
        </div>
      ))}
    </>
  )

  const matchedContributors = (
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
              isSelected={selectedContributors.some((c) => c.id === contributor.id)}
              isPrimary={primaryContributorId === contributor.id}
              onToggleSelect={() => handleContributorToggle(contributor)}
              onPrimarySelect={() => handlePrimarySelect(contributor.id)}
            />
          )
        }) || <p className="text-sm text-gray-500">Select a person to see matching contributors</p>}
    </>
  )

  const firstNameMatches = (
    <>
      {(selectedPerson &&
        props.allContributors
          .filter(
            (contributor) =>
              contributor.first_name === selectedPerson.first_name &&
              !selectedPerson.matches?.some((match) => match.id === contributor.id),
          )
          .sort((a, b) => {
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
                key={`first-${contributor.id}-${i}`}
                permalink={permalink}
                contributor={contributor}
                isSelected={selectedContributors.some((c) => c.id === contributor.id)}
                isPrimary={primaryContributorId === contributor.id}
                onToggleSelect={() => handleContributorToggle(contributor)}
                onPrimarySelect={() => handlePrimarySelect(contributor.id)}
              />
            )
          })) ||
        null}
    </>
  )

  const lastNameMatches = (
    <>
      {(selectedPerson &&
        props.allContributors
          .filter(
            (contributor) =>
              contributor.last_name === selectedPerson.last_name &&
              !selectedPerson.matches?.some((match) => match.id === contributor.id) &&
              contributor.first_name !== selectedPerson.first_name,
          )
          .sort((a, b) => {
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
                key={`last-${contributor.id}-${i}`}
                permalink={permalink}
                contributor={contributor}
                isSelected={selectedContributors.some((c) => c.id === contributor.id)}
                isPrimary={primaryContributorId === contributor.id}
                onToggleSelect={() => handleContributorToggle(contributor)}
                onPrimarySelect={() => handlePrimarySelect(contributor.id)}
              />
            )
          })) ||
        null}
    </>
  )

  const allContributors = (
    <>
      {props.allContributors.map((contributor: Contributors, i: number) => {
        const permalink = getPermalink({
          slug: contributor.slug,
          type: PageType.Contributor,
        })
        return (
          <Contributor
            key={`${contributor.id}-${i}`}
            permalink={permalink}
            contributor={contributor}
            isSelected={false}
            isPrimary={false}
            onToggleSelect={() => {}}
            onPrimarySelect={() => {}}
          />
        )
      })}
    </>
  )

  const description = showOnlyMatches ? (
    <p className="text-xs">
      These <strong>{likelyMatches.length} people</strong> have the same first_name and last_name as one or more
      contributors.
      <span
        onClick={() => setShowOnlyMatches(!showOnlyMatches)}
        className="pl-1 underline decoration-1 underline-offset-4 decoration-dotted cursor-pointer text-blue-600 dark:dark-blue-300"
      >
        Show all
      </span>
    </p>
  ) : (
    <p className="text-xs">
      These are all <strong>{props.allPeople.length} people</strong>{" "}
      <span
        onClick={() => setShowOnlyMatches(showOnlyMatches)}
        className="underline decoration-1 underline-offset-4 decoration-dotted cursor-pointer text-blue-600 dark:dark-blue-300"
      >
        Show matched
      </span>
    </p>
  )

  const hasLastNameMatches =
    selectedPerson &&
    props.allContributors.some(
      (contributor) =>
        contributor.last_name === selectedPerson.last_name &&
        !selectedPerson.matches?.some((match) => match.id === contributor.id) &&
        contributor.first_name !== selectedPerson.first_name,
    )

  console.log("Has last name matches:", hasLastNameMatches)

  return (
    <Paper pageClass="theme" navData={navData}>
      <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
            <div className="">
              <header className="py-6">
                <h1 className="font-light text-5xl">Contributors</h1>
              </header>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-12">
            <div className="pb-3">
              <p>
                Match and merge the <strong>{props.allContributors.length} Contributors</strong> with the{" "}
                <strong>{props.allPeople.length} People</strong>. There are{" "}
                <strong>{likelyMatches.length} likely matches</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-4 space-y-3 relative">
            <div className="sticky top-16">
              <div className="flex flex-col items-start py-1.5">{description}</div>
              <div className="contributors divide-y divide-gray-600 divide-dotted h-screen overflow-y-scroll border-t rail-border">
                {allPeople}
              </div>
            </div>
          </div>
          {selectedPerson && (
            <div className="col-span-4 tablet-lg:col-span-8 tablet-lg:col-start-5 space-y-6">
              <div className="flex justify-end items-center space-x-3">
                <p>
                  Merge {selectedContributors.length}{" "}
                  {selectedContributors.length === 1 ? "contributor" : "contributors"}
                </p>
                <button
                  onClick={handleMerge}
                  disabled={!primaryContributorId || selectedContributors.length === 0}
                  className="text-md bg-emerald-500 dark:bg-gray-700 text-white dark:text-gray-300 px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Merge
                </button>
              </div>

              <div className="space-y-12 border-t rail-border py-3">
                <Person {...selectedPerson} showBio={true} />

                {showOnlyMatches && (
                  <div className="space-y-3 border-t rail-border py-3">
                    <p className="text-lg font-light">
                      <strong className="font-medium">
                        {selectedContributors.length}{" "}
                        {selectedContributors.length === 1 ? "contributor" : "contributors"}
                      </strong>{" "}
                      matched{" "}
                      <span>
                        {selectedPerson.first_name} {selectedPerson.last_name}
                      </span>
                    </p>
                    <div className="py-3 contributors divide-y divide-gray-600 divide-dotted">
                      {matchedContributors}
                    </div>
                  </div>
                )}

                {showOnlyMatches && (
                  <>
                    {firstNameMatches && (
                      <div className="space-y-3 border-t rail-border py-3">
                        <p className="text-lg font-light">Same First Name</p>
                        <div className="py-3 contributors divide-y divide-gray-600 divide-dotted">
                          {firstNameMatches}
                        </div>
                      </div>
                    )}

                    {hasLastNameMatches && (
                      <div className="space-y-3 border-t rail-border py-3">
                        <p className="text-lg font-light">Same Last Name</p>
                        <div className="py-3 contributors divide-y divide-gray-600 divide-dotted">
                          {lastNameMatches}
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="space-y-3 border-t rail-border py-3">
                  {showOnlyMatches && (
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-light">All contributors</p>
                      <button
                        onClick={() => setShowAllContributors(!showAllContributors)}
                        className="text-xs px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        {showAllContributors ? "Hide All" : "Load All"}
                      </button>
                    </div>
                  )}
                  {showAllContributors && (
                    <div className="py-3 contributors divide-y divide-gray-600 divide-dotted">{allContributors}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
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
            <p className="text-xs">Old ID: #{contributor.old_id}</p>
            <p className="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded-sm text-red-800 dark:text-red-300">
              {contributor.slug}
            </p>
            <p className="text-xs">{contributor.articles.length} articles</p>
          </div>
          <p className="text-xs">
            <span className="block">{parse(contributor.bio || "---")}</span>
          </p>
          <div className="text-xs">{contributor.id}</div>
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-3 h-full items-start justify-center">
            <button
              onClick={onPrimarySelect}
              className={`text-xs flex-none px-3 py-1 block rounded-md ${
                isPrimary
                  ? "bg-blue-500 text-white dark:bg-blue-500"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 line-through"
              }`}
            >
              Short Bio
            </button>
            <button
              onClick={onToggleSelect}
              className={`text-xs flex-none px-3 py-1 block rounded-md ${
                isSelected
                  ? "bg-green-500 dark:bg-green-500 text-white"
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
        {person.showBio && (
          <div>
            <p className="text-xs">
              {person.articles && (
                <span>
                  {person.articles.length} {person.articles.length === 1 ? "article" : "articles"}
                </span>
              )}{" "}
              |{" "}
              <span>
                {person.events.length} {person.events.length === 1 ? "event" : "events"}
              </span>
            </p>
          </div>
        )}
      </div>
      {person.showBio && <div className="text-sm">{parse(person.bio || "---")}</div>}
    </div>
  )
}

export default ContributorsMerge
