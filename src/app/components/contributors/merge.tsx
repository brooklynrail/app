"use client"
import parse from "html-react-parser"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArticlesContributors, Contributors, Homepage } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { mergeContributors } from "../../../../lib/utils/people"
import Paper from "../paper"
import Password from "../preview/password"

interface ContributorsMergeProps {
  navData: Homepage
  previewPassword: string
  allContributors: Contributors[]
}

// Base type for API interactions
type ContributorBase = Contributors

// Client-side only type for UI state
interface ClientContributorWithMatches {
  contributor: ContributorBase
  matches: ContributorBase[]
}

interface MergeMessage {
  status: "success" | "merging" | "error"
  text: string
  details?: string
  errors?: {
    message: string
    field?: string
  }[]
}

enum MergeState {
  Ready = "ready",
  Merging = "merging",
  Merged = "merged",
  Error = "error",
}

const ContributorsSkeleton = () => {
  return (
    <div className="col-span-4 tablet-lg:col-span-4 space-y-3 relative">
      <div className="sticky top-16">
        <div className="text-md flex justify-between items-center">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="contributors divide-y divide-gray-600 divide-dotted h-screen overflow-y-scroll border-t rail-border mt-3">
          {/* Generate 10 skeleton items */}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="py-1">
              <div className="flex justify-between items-center">
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ContributorsMerge = (props: ContributorsMergeProps) => {
  const router = useRouter()
  const [selectedContributors, setSelectedContributors] = useState<Contributors[]>([])
  const [selectedContributor, setSelectedContributor] = useState<ContributorBase | null>(null)
  const [matchingContributors, setMatchingContributors] = useState<ContributorBase[]>([])
  const [showOnlyMatches, setShowOnlyMatches] = useState(true)
  const [message, setMessage] = useState<MergeMessage | null>(null)
  const [mergeState, setMergeState] = useState<MergeState>(MergeState.Ready)
  const [allContributors, setAllContributors] = useState<Contributors[]>(props.allContributors)
  const { navData } = props
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMergeState(MergeState.Ready)
    setMessage(null)
  }, [selectedContributor])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true)
  //     try {
  //       const contributorsResponse = await fetch("/api/contributors")
  //       if (!contributorsResponse.ok) {
  //         throw new Error("Failed to fetch contributors")
  //       }
  //       const contributors = await contributorsResponse.json()
  //       setAllContributors(contributors)
  //     } catch (error) {
  //       console.error("Error fetching data:", error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  useEffect(() => {
    const fetchContributors = async () => {
      if (selectedContributor && selectedContributor.first_name && selectedContributor.last_name) {
        const queryParams = new URLSearchParams({
          firstName: selectedContributor.first_name,
          lastName: selectedContributor.last_name,
        }).toString()

        const response = await fetch(`/api/contributors?${queryParams}`)
        if (response.ok) {
          const contributors = await response.json()
          console.log("Fetched contributors from API:", contributors)

          // Filter out contributors whose articles are already in selectedContributor.articles
          const filteredContributors = contributors.filter((contributor: Contributors) => {
            const contributorArticleIds = contributor.articles
              .map((article) => article.articles_contributors_id?.id)
              .filter((id): id is string => id !== undefined)
            const personArticleIds = selectedContributor.articles
              .map((article) => article.articles_contributors_id?.id)
              .filter((id): id is string => id !== undefined)

            return !contributorArticleIds.some((id) => personArticleIds.includes(id))
          })

          // Don't automatically set the filtered contributors
          // setSelectedContributors(filteredContributors)
        } else {
          console.error("Failed to fetch contributors")
        }
      }
    }

    fetchContributors()
  }, [selectedContributor])

  if (!allContributors) {
    return <></>
  }

  const likelyMatches = allContributors
    .map((contributor: ContributorBase) => {
      const matches = allContributors.filter(
        (otherContributor) =>
          otherContributor.first_name === contributor.first_name &&
          otherContributor.last_name === contributor.last_name &&
          otherContributor.id !== contributor.id,
      )
      return matches.length > 0 ? { contributor, matches } : null
    })
    .filter((match): match is NonNullable<ClientContributorWithMatches> => match !== null)

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
      setSelectedContributor(contributor)
      setMatchingContributors(matches)
    }
  }

  const handleMerge = async () => {
    if (selectedContributors.length === 0 || !selectedContributor) {
      setMessage({
        status: "error",
        text: "Invalid merge selection",
        details: "Please select at least one contributor to merge",
      })
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

      if (!result.success) {
        throw new Error(result.message || "Merge failed")
      }

      setMessage({
        status: "success",
        text: "Successfully merged contributors",
        details: `Merged ${selectedContributors.length} contributors into ${selectedContributor.first_name} ${selectedContributor.last_name}`,
      })
      setMergeState(MergeState.Merged)

      router.refresh()
    } catch (error) {
      setMergeState(MergeState.Error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

      setMessage({
        status: "error",
        text: "Failed to merge contributors",
        details: errorMessage,
        errors: error instanceof Error && "errors" in error ? (error as any).errors : [{ message: errorMessage }],
      })
      console.error("Error merging contributors:", error)
    }
  }

  const handleSelectAll = () => {
    // If all are selected, deselect all. Otherwise, select all matches
    const allAreSelected = matchingContributors.every((contributor) =>
      selectedContributors.some((selected) => selected.id === contributor.id),
    )

    if (allAreSelected) {
      setSelectedContributors([])
    } else {
      setSelectedContributors(matchingContributors)
    }
  }

  const allContributorsRecords = (
    <>
      {likelyMatches.map((match, i) => (
        <div
          key={`${match.contributor.id}-${i}`}
          onClick={() => handleContributorClick(match.contributor)}
          className={`cursor-pointer ${
            selectedContributor?.id === match.contributor.id ? "bg-amber-200 dark:bg-gray-800" : ""
          }`}
        >
          <div className="flex justify-between items-center py-1">
            {match.contributor.first_name} {match.contributor.last_name}
            <span className="text-xs text-gray-500">Old ID: #{match.contributor.old_id}</span>
          </div>
        </div>
      ))}
    </>
  )

  const matchedContributors = (
    <>
      {selectedContributor &&
        matchingContributors.map((contributor: ContributorBase, i: number) => {
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
        })}
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
        return (
          <div className="text-amber-600 dark:text-amber-400">
            <p>{message?.details}</p>
          </div>
        )
      case MergeState.Merged:
        return (
          <div className="text-green-600 dark:text-green-400">
            <p>{message?.details}</p>
          </div>
        )
      case MergeState.Error:
        return (
          <div className="text-red-600 dark:text-red-400 space-y-1">
            <p>{message?.details}</p>
            {message?.errors && (
              <ul className="text-sm list-disc pl-4">
                {message.errors.map((error, index) => (
                  <li key={index}>
                    {error.field && <span className="font-medium">{error.field}: </span>}
                    {error.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
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
          {isLoading ? (
            <ContributorsSkeleton />
          ) : (
            <div className="col-span-4 tablet-lg:col-span-4 space-y-3 relative">
              <div className="sticky top-16">
                <div className="text-md flex justify-between items-center py-1">
                  <span className="font-medium">{likelyMatches.length} likely matches</span>
                  <span className="text-gray-500">{allContributors.length} total contributors</span>
                </div>
                <div className="contributors divide-y divide-gray-600 divide-dotted h-screen overflow-y-scroll border-t rail-border">
                  {allContributorsRecords}
                </div>
              </div>
            </div>
          )}
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
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-light">
                        <strong className="font-medium">
                          {matchingContributors.length}{" "}
                          {matchingContributors.length === 1 ? "contributor" : "contributors"}
                        </strong>{" "}
                        matched{" "}
                        <span>
                          {selectedContributor.first_name} {selectedContributor.last_name}
                        </span>
                      </p>
                      <div className="flex flex-col">
                        <div className="flex space-x-3 h-full w-24 items-start justify-end">
                          <div className="">
                            <button
                              onClick={handleSelectAll}
                              className="text-xs flex-none px-3 py-1 block rounded-md bg-blue-500 dark:bg-blue-500 text-white"
                            >
                              Select all
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

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

const ArticlesList = ({ articles }: { articles: ArticlesContributors[] }) => {
  return (
    <div className="text-xs">
      <p className="text-xs font-medium">{articles.length} articles</p>

      {articles.length > 0 && (
        <ul className="text-xs list-disc pl-4 space-y-0">
          {articles.map((article, index) => {
            if (!article.articles_contributors_id) {
              return null
            }
            const articlePermalink = getPermalink({
              slug: article.articles_contributors_id.slug,
              year: article.articles_contributors_id.issue.year,
              month: article.articles_contributors_id.issue.month,
              section: article.articles_contributors_id.section.slug,
              type: PageType.Article,
            })
            return (
              <li key={index}>
                <span className="font-serif text-xs">{parse(article.articles_contributors_id.title)}</span> —{" "}
                <span className="">{article.articles_contributors_id.section.name}</span> /{" "}
                <span className="">{article.articles_contributors_id.issue.title}</span>
                <span>
                  <Link className="text-blue-600 pl-3" target="_blank" href={articlePermalink}>
                    view
                  </Link>{" "}
                  /{" "}
                  <Link
                    className="text-blue-600"
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/admin/content/articles/${article.articles_contributors_id.id}`}
                  >
                    edit
                  </Link>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

const Contributor = ({ contributor, isSelected, isPrimary, onToggleSelect, onPrimarySelect }: ContributorProps) => {
  const permalink = getPermalink({
    slug: contributor.slug,
    type: PageType.Contributor,
  })

  return (
    <div className="space-y-1.5 py-3">
      <div className="flex space-x-6 justify-between">
        <div className="flex flex-col w-full space-y-3">
          <div className="flex justify-start items-center space-x-6">
            <p className="font-normal text-lg">
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

            <p className="text-xs">
              <Link
                className="text-blue-600"
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/admin/content/contributors/${contributor.id}`}
              >
                Open in Studio
              </Link>
            </p>
          </div>
          <div className="text-xs">
            <span className="block">{parse(contributor.bio || "---")}</span>
          </div>

          <ArticlesList articles={contributor.articles} />
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-3 h-full w-24 items-start justify-end">
            <div className="">
              <button
                onClick={onToggleSelect}
                className={`text-xs flex-none px-3 py-1 block rounded-md ${
                  isSelected || isPrimary
                    ? "bg-emerald-500 dark:bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500 line-through"
                }`}
              >
                {isPrimary ? "Primary" : "Match"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProtectedContributorsMerge = (props: ContributorsMergeProps) => {
  const { previewPassword } = props
  const cookieSlug = "rail_preview_contributors_merge"

  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug}>
      <ContributorsMerge {...props} />
    </Password>
  )
}

export default ProtectedContributorsMerge
