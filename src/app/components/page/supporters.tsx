import { PageBodyProps } from "./pageBody"

enum StaffTypes {
  BoardOfDirectors = "Board of Directors",
  AdvisoryBoard = "Advisory Board",
}

const Supporters = (props: PageBodyProps) => {
  const { pageData } = props

  if (!pageData.staff) {
    return <></>
  }

  const groupedStaff = pageData.staff.reduce((acc: { [key: string]: string[] }, member) => {
    if (!acc[member.title]) {
      acc[member.title] = []
    }
    acc[member.title].push(member.name)
    return acc
  }, {})

  const fullList = Object.entries(groupedStaff).map(([title, names], i) => {
    return (
      <li key={i}>
        <span className="">{title}</span>: <span className="font-bold">{names.join(", ")}</span>
      </li>
    )
  })

  return (
    <div className="py-12 space-y-12">
      <ul className="text-lg space-y-2">{fullList}</ul>
    </div>
  )
}

export default Supporters
