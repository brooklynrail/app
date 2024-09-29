import "../../../../styles/globals.css"
import Footer from "../components/footer"

export default function ContributorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`paper`}>
        {children}
        <Footer />
      </div>
    </>
  )
}
