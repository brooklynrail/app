import Link from "next/link"
import Image from "next/image"

const Header = () => {
  return (
    <div id="header_section">
      <div className="logo">
        <div id="textflag">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          <h3>FEB 2024</h3>
        </div>
        <Link href="/">
          <Image
            src="/images/brooklynrail-logo-ex.svg"
            height="68"
            width="396"
            alt="The Brooklyn Rail"
            title="Brooklyn Rail Home"
          />
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
