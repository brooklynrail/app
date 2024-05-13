"use client"
import "../../../styles/issue/styles.scss"
import IssueRail from "../components/issueRail"
import Link from "next/link"
import Footer from "../components/footer"

export default function ContributorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`paper`}>
        <div className="hatbox"></div>
        {children}
        <Footer />
      </div>
    </>
  )
}
