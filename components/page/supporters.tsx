import { PageBodyProps } from "./pageBody"

enum SupportersGroup {
  SectionSponsors = "Section Sponsors",
  Benefactors = "Benefactors",
  SpecialThanks = "Special Thanks",
  FriendsInSolidarity = "Friends in Solidarity",
}

const Supporters = (props: PageBodyProps) => {
  const { pageData } = props

  if (!pageData.supporters) {
    return <></>
  }

  const friendsInSolidarity = pageData.supporters.map((member, i) => {
    if (member.group !== SupportersGroup.FriendsInSolidarity) {
      return null
    }
    return (
      <li key={i}>
        <span>{member.name}</span>
      </li>
    )
  })

  const specialThanks = pageData.supporters.map((member, i) => {
    if (member.group !== SupportersGroup.SpecialThanks) {
      return null
    }
    return (
      <li key={i}>
        <span>{member.name}</span>
      </li>
    )
  })

  const benefactors = pageData.supporters.map((member, i) => {
    if (member.group !== SupportersGroup.Benefactors) {
      return null
    }
    return (
      <li key={i}>
        <span>{member.name}</span>
      </li>
    )
  })

  const sectionSponsors = pageData.supporters.map((member, i) => {
    if (member.group !== SupportersGroup.SectionSponsors) {
      return null
    }
    return (
      <li key={i}>
        <span>{member.name}</span>
      </li>
    )
  })

  return (
    <div className="py-12 space-y-12">
      <div className="space-y-3">
        <h3 className="font-bold text-sm uppercase">{SupportersGroup.SectionSponsors}</h3>
        <ul className="text-lg space-y-2">{sectionSponsors}</ul>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-sm uppercase">{SupportersGroup.Benefactors}</h3>
        <ul className="text-lg space-y-2">{benefactors}</ul>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-sm uppercase">{SupportersGroup.SpecialThanks}</h3>
        <ul className="text-lg space-y-2">{specialThanks}</ul>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-sm uppercase">{SupportersGroup.FriendsInSolidarity}</h3>
        <ul className="text-lg space-y-2">{friendsInSolidarity}</ul>
      </div>
    </div>
  )
}

export default Supporters
