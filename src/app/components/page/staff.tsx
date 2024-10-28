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
  const groupStaffByTitle = (staff: { title: string; name: string; link?: string }[]) => {
    return staff.reduce((acc: { [key: string]: { name: string; link?: string }[] }, member) => {
      if (!acc[member.title]) {
        acc[member.title] = []
      }
      acc[member.title].push({ name: member.name, link: member.link })
      return acc
    }, {})
  }

  // Group staff by their type (defined in StaffTypes) and then group by title within that type
  const groupedStaffByType = Object.values(StaffTypes).reduce(
    (acc, type) => {
      acc[type] = groupStaffByTitle(
        (pageData.staff ?? [])
          .filter((member) => member.group === type)
          .map((member) => ({
            ...member,
            link: member.link ?? undefined,
          })),
      )
      return acc
    },
    {} as { [key: string]: { [key: string]: { name: string; link?: string }[] } },
  )

  // Render the grouped staff
  const fullList = Object.entries(groupedStaffByType).map(([group, titles], i) => {
    return (
      <ul className="text-lg space-y-2" key={i}>
        {Object.entries(titles).map(([title, members], j) => (
          <li key={j}>
            <span className="">{title}</span>:{" "}
            <span className="font-bold">
              {members.map((member, k) => (
                <span key={k}>
                  {member.link ? (
                    <a href={member.link} target="_blank" rel="noopener noreferrer">
                      {member.name}
                    </a>
                  ) : (
                    member.name
                  )}
                  {k < members.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    )
  })

  return <div className="py-12 space-y-12">{fullList}</div>
}

export default Staff
