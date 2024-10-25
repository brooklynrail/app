import { PageBodyProps } from "./pageBody"

enum StaffTypes {
  Staff = "Staff",
  SectionEditors = "Section Editors",
  ConsultingEditors = "Consulting Editors",
  EditorsAtLarge = "Editors-at-Large",
}

const Staff = (props: PageBodyProps) => {
  const { pageData } = props

  if (!pageData.staff) {
    return <></>
  }

  // Function to group staff by title
  const groupStaffByTitle = (staff: { title: string; name: string }[]) => {
    return staff.reduce((acc: { [key: string]: string[] }, member) => {
      if (!acc[member.title]) {
        acc[member.title] = []
      }
      acc[member.title].push(member.name)
      return acc
    }, {})
  }

  // Group staff by their type (defined in StaffTypes) and then group by title within that type
  const groupedStaffByType = Object.values(StaffTypes).reduce(
    (acc, type) => {
      acc[type] = groupStaffByTitle((pageData.staff ?? []).filter((member) => member.group === type))
      return acc
    },
    {} as { [key: string]: { [key: string]: string[] } },
  )

  // Render the grouped staff
  const fullList = Object.entries(groupedStaffByType).map(([group, titles], i) => {
    return (
      <ul className="text-lg space-y-2" key={i}>
        {Object.entries(titles).map(([title, names], j) => (
          <li key={j}>
            <span className="">{title}</span>: <span className="font-bold">{names.join(", ")}</span>
          </li>
        ))}
      </ul>
    )
  })

  return <div className="py-12 space-y-12">{fullList}</div>
}

export default Staff
