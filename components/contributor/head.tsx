"use client"
import parse from "html-react-parser"
import { Contributors } from "@/lib/types"

interface PeopleHeadProps {
  contributorData: Contributors
}
const PeopleHead = (props: PeopleHeadProps) => {
  const { contributorData } = props
  const { first_name, last_name, bio, id } = contributorData

  return (
    <header className="py-6 px-3">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-6 tablet-lg:col-start-4">
          <div className="space-y-9 tablet-lg:space-y-3">
            <h1 className="font-light text-5xl text-center">
              {first_name} {last_name}
            </h1>
            {bio && <div className="w-fit mx-auto text-md tablet-lg:text-lg">{parse(bio)}</div>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default PeopleHead
