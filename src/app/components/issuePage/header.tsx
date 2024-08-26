import Link from "next/link"
import Image from "next/image"

interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
}

const Header = (props: HeaderProps) => {
  const { special_issue, issue_number, title } = props
  const src =
    special_issue && special_issue !== null
      ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}/images/brooklynrail-logo-ex-issue-${issue_number}.svg`
      : `${process.env.NEXT_PUBLIC_IMAGE_PATH}/images/brooklynrail-logo-ex.svg`
  return (
    <div id="header_section">
      <div className="logo">
        <div id="textflag">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          {title && <h3>{title}</h3>}
        </div>
        <Link href="/">
          <Image priority src={src} height="68" width="396" alt="The Brooklyn Rail" title="Brooklyn Rail Homepage" />
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/about" title="About">
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link href="https://brooklynrail.org/events" title="Events">
              <span>Events</span>
            </Link>
          </li>
          <li>
            <Link href="https://mailchi.mp/brooklynrail/join/" title="Subscribe to our newsletter">
              <span>Newsletter</span>
            </Link>
          </li>
          <li>
            <Link href="https://shop.brooklynrail.org/products/subscription" title="Subscribe">
              <span>Subscribe</span>
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://shop.brooklynrail.org" title="Shop">
              <span>Shop</span>
            </Link>
          </li>
          <li className="btn btn-donate">
            <Link href="https://brooklynrail.org/donate" title="Donate">
              <span>Donate</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
