"use client"
import Image from "next/image"
import Link from "next/link"
import parse from "html-react-parser"
import { Contributors, Homepage, Issues, People } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Paper from "../paper"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { mergePeople, getAllContributorsMerge } from "../../../../lib/utils/people"

interface ContributorsMergeProps {
  thisIssueData: Issues
  allPeople: People[]
  allContributors: Contributors[]
  navData: Homepage
}

interface PersonWithMatches extends People {
  matches?: Contributors[]
}

interface MergeMessage {
  status: "success" | "merging" | "error"
  text: string
  details?: string
}

enum MergeState {
  Ready = "ready",
  Merging = "merging",
  Merged = "merged",
  Error = "error",
}

const ContributorsMerge = (props: ContributorsMergeProps) => {
  const router = useRouter()
  const [selectedContributors, setSelectedContributors] = useState<Contributors[]>([])
  const [primaryContributor, setPrimaryContributor] = useState<Contributors | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<PersonWithMatches | null>(null)
  const [showOnlyMatches, setShowOnlyMatches] = useState(true)
  const [showAllContributors, setShowAllContributors] = useState(false)
  const [message, setMessage] = useState<MergeMessage | null>(null)
  const [mergeState, setMergeState] = useState<MergeState>(MergeState.Ready)
  const { navData, allPeople: people } = props

  useEffect(() => {
    setMergeState(MergeState.Ready)
    setMessage(null)
  }, [selectedPerson])

  useEffect(() => {
    const fetchContributors = async () => {
      if (selectedPerson && selectedPerson.first_name && selectedPerson.last_name) {
        const queryParams = new URLSearchParams({
          firstName: selectedPerson.first_name,
          lastName: selectedPerson.last_name,
        }).toString()

        const response = await fetch(`/api/contributors?${queryParams}`)
        if (response.ok) {
          const contributors = await response.json()
          console.log("Fetched contributors from API:", contributors)

          // Filter out contributors whose articles are already in selectedPerson.articles
          const filteredContributors = contributors.filter((contributor: Contributors) => {
            const contributorArticleIds = contributor.articles
              .map((article) => article.articles_contributors_id?.id)
              .filter((id): id is string => id !== undefined)
            const personArticleIds = selectedPerson.articles
              .map((article) => article.articles_id?.id)
              .filter((id): id is string => id !== undefined)

            console.log("====================")
            console.log("ID:", contributor.old_id)
            console.log("Contributor article IDs:", contributorArticleIds)
            console.log("Person article IDs:", personArticleIds)
            return !contributorArticleIds.some((id) => personArticleIds.includes(id))
          })

          setSelectedContributors(filteredContributors)
        } else {
          console.error("Failed to fetch contributors")
        }
      }
    }

    fetchContributors()
  }, [selectedPerson])

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
      // setSelectedContributors([])
      setPrimaryContributor(null)
    } else {
      setSelectedPerson(person)
      const matches = (person as PersonWithMatches).matches || []
      // setSelectedContributors(matches)

      // Set primary contributor based on old_id
      if (matches.length > 0) {
        const primaryContributor = matches.reduce((prev, current) => {
          const prevOldId = parseInt(String(prev.old_id || "0"))
          const currentOldId = parseInt(String(current.old_id || "0"))
          return currentOldId > prevOldId ? current : prev
        })
        setPrimaryContributor(primaryContributor)
      }
    }
  }

  const handlePrimarySelect = (contributor: Contributors) => {
    if (contributor.id !== primaryContributor?.id) {
      if (!selectedContributors.includes(contributor)) {
        handleContributorToggle(contributor)
      }
    }
    setPrimaryContributor(contributor.id === primaryContributor?.id ? null : contributor)
  }

  const handleMerge = async () => {
    if (!selectedPerson || selectedContributors.length === 0 || !primaryContributor) {
      return
    }
    setMessage({
      status: "merging",
      text: "Merging contributors...",
      details: `Merging ${selectedContributors.length} contributors...`,
    })
    setMergeState(MergeState.Merging)

    try {
      const result = await mergePeople({
        selectedPerson: selectedPerson,
        allContributors: selectedContributors,
        shortBio: primaryContributor.bio,
      })

      setMessage({
        status: "success",
        text: "Successfully merged contributors",
        details: `Merged ${selectedContributors.length} contributors into ${selectedPerson.first_name} ${selectedPerson.last_name}`,
      })
      setMergeState(MergeState.Merged)
      router.refresh()
    } catch (error) {
      setMergeState(MergeState.Error)
      setMessage({
        status: "error",
        text: "Failed to merge contributors",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      })
      console.error("Error merging people:", error)
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
        ?.filter(
          (contributor, index, self) =>
            // Remove duplicates by checking if this is the first occurrence of this ID
            self.findIndex((c) => c.id === contributor.id) === index,
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
              key={`${contributor.id}-${i}`}
              permalink={permalink}
              contributor={contributor}
              isSelected={selectedContributors.some((c) => c.id === contributor.id)}
              isPrimary={primaryContributor?.id === contributor.id}
              onToggleSelect={() => handleContributorToggle(contributor)}
              onPrimarySelect={() => handlePrimarySelect(contributor)}
            />
          )
        }) || <p className="text-sm text-gray-500">Select a person to see matching contributors</p>}
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

  const messageText = (() => {
    switch (mergeState) {
      case MergeState.Ready:
        return (
          <p>
            Merge {selectedContributors.length} {selectedContributors.length === 1 ? "contributor" : "contributors"}
          </p>
        )
      case MergeState.Merging:
        return <p>{message?.details}</p>
      case MergeState.Merged:
        return <p>{message?.details}</p>
      case MergeState.Error:
        return <p>{message?.details}</p>
    }
  })()

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
                {messageText}
                <button
                  onClick={handleMerge}
                  disabled={!primaryContributor || selectedContributors.length === 0}
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
  onPrimarySelect: (contributor: Contributors) => void
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
          <div className="text-xs">
            <span className="block">{parse(contributor.bio || "---")}</span>
          </div>
          <div className="text-xs">{contributor.id}</div>
          <div className="text-xs">{contributor.status}</div>
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-3 h-full items-start justify-center">
            <button
              onClick={() => onPrimarySelect(contributor)}
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
      {person.showBio && <div className="text-sm">Short Bio: {parse(person.short_bio || "---")}</div>}
      {person.showBio && (
        <Link
          className="text-xs uppercase text-blue-600 dark:text-blue-300"
          href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/admin/content/people/${person.id}`}
          target="_blank"
        >
          Edit in Studio
        </Link>
      )}
    </div>
  )
}

export default ContributorsMerge
