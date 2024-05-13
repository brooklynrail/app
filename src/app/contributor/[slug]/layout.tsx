"use client"
import "../../../../styles/article/styles.scss"
import Footer from "../../components/footer"

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
