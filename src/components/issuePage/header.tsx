import Link from "next/link"

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
          <img src="/images/brooklynrail-logo-ex.svg" height="68" alt="The Brooklyn Rail" title="Brooklyn Rail Home" />
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/about?h" title="About">
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link href="https://brooklynrail.org/events?h" title="Events">
              <span>Events</span>
            </Link>
          </li>
          <li>
            <Link href="https://mailchi.mp/brooklynrail/join/?h" title="Subscribe to our newsletter">
              <span>Newsletter</span>
            </Link>
          </li>
          <li>
            <Link href="https://shop.brooklynrail.org/products/subscription?h" title="Subscribe">
              <span>Subscribe</span>
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://shop.brooklynrail.org?h" title="Shop">
              <span>Shop</span>
            </Link>
          </li>
          <li className="btn btn-donate">
            <Link href="https://brooklynrail.org/donate?h" title="Donate">
              <span>Donate</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
