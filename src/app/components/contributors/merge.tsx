"use client"
import Image from "next/image"
import Link from "next/link"
import { Contributors, Homepage, Issues, People } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Paper from "../paper"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PortraitImage from "../portraitImage"

interface ContributorsPageProps {
  thisIssueData: Issues
  allContributors: Contributors[]
  navData: Homepage
}

const ContributorsMerge = (props: ContributorsPageProps) => {
  const router = useRouter()
  const [people, setPeople] = useState<People[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { navData } = props

  useEffect(() => {
    // Check for Directus authentication
    const checkAuth = async () => {
      const hasDirectusToken = document.cookie.includes("directus_refresh_token")
      // if (!hasDirectusToken) {
      //   router.push("/login") // Redirect to login if not authenticated
      //   return
      // }
      setIsAuthenticated(true)
    }

    // Fetch people data
    const fetchPeople = async () => {
      try {
        const response = await fetch("/api/people") // You'll need to create this API endpoint
        const data = await response.json()
        setPeople(data)
      } catch (error) {
        console.error("Failed to fetch people:", error)
      }
    }

    checkAuth()
    if (isAuthenticated) {
      fetchPeople()
    }
  }, [router, isAuthenticated])

  // Don't render anything until authentication is confirmed
  if (!isAuthenticated) {
    return null
  }

  const allContributors = (
    <>
      {props.allContributors.map((contributor: Contributors, i: number) => {
        const permalink = getPermalink({
          slug: contributor.slug,
          type: PageType.Contributor,
        })

        return <Contributor key={`${contributor.id}-${i}`} permalink={permalink} contributor={contributor} />
      })}
    </>
  )

  const allPeople = (
    <>
      {people.map((person: People, i: number) => {
        // console.log("person", person)
        return <Person key={person.id} {...person} />
      })}
    </>
  )

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

  const allTwins = (
    <>
      {twins.map((twin: any, i: number) => {
        if ("matches" in twin) {
          return <Person key={`${twin.id}-${i}`} {...twin} />
        }
        return null
      })}
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
            <h2 className="text-2xl font-light">Twins ({twins.length})</h2>
            <div className="contributors divide-y divide-gray-600 divide-dotted">{allTwins}</div>
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
    <div className="py-1.5">
      <p>
        <Link href={permalink} title={`${contributor.first_name} ${contributor.last_name}`}>
          {contributor.first_name} {contributor.last_name}
        </Link>
      </p>
      <p className="text-xs">
        <span className="block">{contributor.id}</span>
      </p>
    </div>
  )
}

const Person = (person: People) => {
  if (person.id === "4d146d30-7c6a-4b7c-b0be-4f18639fead1") {
    console.log("person", person)
  }
  const src =
    person.portrait &&
    `${process.env.NEXT_PUBLIC_IMAGE_PATH}${person.portrait.filename_disk}?fit=cover&width=400&height=400&quality=85&modified_on=${person.portrait.modified_on}`
  return (
    <div className="flex justify-between items-center">
      <div className="py-1.5 flex items-center space-x-3">
        <div className="w-9 h-9">
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
          <p className="text-xs">
            <span className="block">{person.id}</span>
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs">{person.events.length}</p>
      </div>
    </div>
  )
}

export default ContributorsMerge
