"use client"
import Link from "next/link"
import parse from "html-react-parser"
import { Contributors, Homepage, Issues, People } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Paper from "../paper"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { mergeContributors } from "../../../../lib/utils/people"

interface ContributorsMergeProps {
  navData: Homepage
}

interface PersonWithMatches extends People {
  matches?: Contributors[]
}

interface ContributorWithMatches extends Contributors {
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
  const [selectedPerson, setSelectedPerson] = useState<PersonWithMatches | null>(null)
  const [selectedContributor, setSelectedContributor] = useState<ContributorWithMatches | null>(null)
  const [showOnlyMatches, setShowOnlyMatches] = useState(true)
  const [message, setMessage] = useState<MergeMessage | null>(null)
  const [mergeState, setMergeState] = useState<MergeState>(MergeState.Ready)
  const [allContributors, setAllContributors] = useState<Contributors[]>([])
  const { navData } = props

  useEffect(() => {
    setMergeState(MergeState.Ready)
    setMessage(null)
  }, [selectedPerson])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contributorsResponse = await fetch("/api/contributors")
        if (!contributorsResponse.ok) {
          throw new Error("Failed to fetch contributors")
        }
        const contributors = await contributorsResponse.json()
        setAllContributors(contributors)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

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

  if (!allContributors) {
    return <></>
  }

  const likelyMatches = allContributors
    .map((contributor: Contributors) => {
      const matches = allContributors.filter((otherContributor: Contributors) => {
        return (
          otherContributor.first_name === contributor.first_name &&
          otherContributor.last_name === contributor.last_name &&
          otherContributor.id !== contributor.id
        ) // Don't match with self
      })
      if (matches.length > 0) {
        return { ...contributor, matches } as ContributorWithMatches
      }
      return null
    })
    .filter((contributor): contributor is NonNullable<ContributorWithMatches> => contributor !== null)

  const handleContributorToggle = (contributor: Contributors) => {
    setSelectedContributors((prev) =>
      prev.includes(contributor) ? prev.filter((c) => c.id !== contributor.id) : [...prev, contributor],
    )
  }

  const handleContributorClick = async (contributor: Contributors) => {
    setSelectedContributors([])
    if (contributor.id === selectedContributor?.id) {
      setSelectedContributor(null)
    } else {
      // Find all other contributors with matching names
      const matches = allContributors.filter(
        (other) =>
          other.first_name === contributor.first_name &&
          other.last_name === contributor.last_name &&
          other.id !== contributor.id,
      )
      setSelectedContributor({ ...contributor, matches })
    }
  }

  const handleMerge = async () => {
    if (selectedContributors.length === 0 || !selectedContributor) {
      return
    }
    setMessage({
      status: "merging",
      text: "Merging contributors...",
      details: `Merging ${selectedContributors.length} contributors...`,
    })
    setMergeState(MergeState.Merging)

    try {
      const result = await mergeContributors({
        selectedContributor: selectedContributor,
        otherContributors: selectedContributors,
      })
      console.log("result", result)

      setMessage({
        status: "success",
        text: "Successfully merged contributors",
        details: `Merged ${selectedContributors.length} contributors into ${selectedContributor.first_name} ${selectedContributor.last_name}`,
      })
      setMergeState(MergeState.Merged)

      // // Re-fetch the person data
      const response = await fetch(`/api/contributors/merge?id=${selectedContributor.id}`)
      if (!response.ok) {
        throw new Error("Failed to re-fetch person details")
      }
      const updatedContributorData = await response.json()
      setSelectedContributor(updatedContributorData)
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

  const allContributorsRecords = (
    <>
      {allContributors.map((contributor: any, i: number) => (
        <div
          key={`${contributor.id}-${i}`}
          onClick={() => handleContributorClick(contributor)}
          className={`cursor-pointer ${selectedContributor?.id === contributor.id ? "bg-amber-200 dark:bg-gray-800" : ""}`}
        >
          {contributor.first_name} {contributor.last_name}
        </div>
      ))}
    </>
  )

  const matchedContributors = (
    <>
      {selectedContributor?.matches
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
              contributor={contributor}
              isSelected={selectedContributors.some((c) => c.id === contributor.id)}
              isPrimary={false}
              onToggleSelect={() => handleContributorToggle(contributor)}
              onPrimarySelect={() => {}}
            />
          )
        }) || <p className="text-sm text-gray-500">Select a person to see matching contributors</p>}
    </>
  )

  const messageText = (() => {
    switch (mergeState) {
      case MergeState.Ready:
        return (
          <p>
            Merge {selectedContributors?.length} {selectedContributors?.length === 1 ? "contributor" : "contributors"}
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
                <h1 className="font-light text-5xl">Merge Contributors</h1>
              </header>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-4 space-y-3 relative">
            <div className="sticky top-16">
              <div className="contributors divide-y divide-gray-600 divide-dotted h-screen overflow-y-scroll border-t rail-border">
                {allContributorsRecords}
              </div>
            </div>
          </div>
          {selectedContributor && (
            <div className="col-span-4 tablet-lg:col-span-8 tablet-lg:col-start-5 space-y-6">
              <div className="flex justify-end items-center space-x-3">
                {messageText}
                <button
                  onClick={handleMerge}
                  disabled={!selectedContributor || selectedContributors.length === 0}
                  className="text-md bg-emerald-500 dark:bg-gray-700 text-white dark:text-gray-300 px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Merge
                </button>
              </div>

              <div className="space-y-12 border-t rail-border py-3">
                <Contributor
                  contributor={selectedContributor}
                  isSelected={false}
                  isPrimary={true}
                  onToggleSelect={() => {}}
                  onPrimarySelect={() => {}}
                />

                {showOnlyMatches && (
                  <div className="space-y-3 border-t rail-border py-3">
                    <p className="text-lg font-light">
                      <strong className="font-medium">
                        {selectedContributor.matches?.length}{" "}
                        {selectedContributor.matches?.length === 1 ? "contributor" : "contributors"}
                      </strong>{" "}
                      matched{" "}
                      <span>
                        {selectedContributor.first_name} {selectedContributor.last_name}
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
  contributor: Contributors
  isSelected: boolean
  isPrimary: boolean
  onToggleSelect: () => void
  onPrimarySelect: () => void
}

const Contributor = ({ contributor, isSelected, isPrimary, onToggleSelect, onPrimarySelect }: ContributorProps) => {
  const permalink = getPermalink({
    slug: contributor.slug,
    type: PageType.Contributor,
  })
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
            <p className="text-xs">
              <span className="">Slug: </span>{" "}
              <span className="bg-gray-200 dark:bg-gray-700 px-1 rounded-sm text-red-800 dark:text-red-300">
                {contributor.slug}
              </span>
            </p>
            <p className="text-xs">{contributor.articles.length} articles</p>
            <p className="text-xs">{contributor.status}</p>
          </div>
          <div className="text-xs">
            <span className="block">{parse(contributor.bio || "---")}</span>
          </div>
          <div className="text-xs">
            <Link
              className="text-blue-600"
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/admin/content/contributors/${contributor.id}`}
            >
              Open in Studio »
            </Link>
          </div>
        </div>
        {!isPrimary && (
          <div className="flex flex-col">
            <div className="flex space-x-3 h-full items-start justify-center">
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
        )}
      </div>
    </div>
  )
}

export default ContributorsMerge
