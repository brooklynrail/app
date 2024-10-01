"use client"
import Link from "next/link"
import Image from "next/image"

interface IssueRailHeaderProps {
  logosrc: string
}

const IssueRailHeader = (props: IssueRailHeaderProps) => {
  const { logosrc } = props

  return (
    <>
      <header className="pb-1">
        <h2>
          <Link href="/">
            <Image
              priority
              src={logosrc}
              alt="The Brooklyn Rail"
              title="Brooklyn Rail Home"
              width={296}
              height={38.48}
            />
          </Link>
        </h2>
      </header>
    </>
  )

  // use src here
}

export default IssueRailHeader
