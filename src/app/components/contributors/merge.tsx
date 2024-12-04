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

        return <Contributor key={contributor.id} permalink={permalink} contributor={contributor} />
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
            <h2 className="text-2xl font-light">Contributors</h2>
            <div className="contributors divide-y divide-gray-600 divide-dotted">{allContributors}</div>
          </div>
          <div className="col-span-4 tablet-lg:col-span-5 tablet-lg:col-start-8">
            <h2 className="text-2xl font-light">People</h2>
            <div className="contributors divide-y divide-gray-600 divide-dotted">{allPeople}</div>
          </div>
        </div>
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
  console.log("person", person)

  const src =
    person.portrait &&
    `${process.env.NEXT_PUBLIC_IMAGE_PATH}${person.portrait.filename_disk}?fit=cover&width=400&height=400&quality=85&modified_on=${person.portrait.modified_on}`
  return (
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
  )
}

export default ContributorsMerge
