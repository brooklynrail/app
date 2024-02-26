const Header = () => {
  return (
    <div id="header_section">
      <div className="logo">
        <div id="textflag">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          <h3>FEB 2024</h3>
        </div>
        <a href="/">
          <img src="/images/brooklynrail-logo-ex.svg" height="68" alt="The Brooklyn Rail" title="Brooklyn Rail Home" />
        </a>
      </div>

      <nav>
        <ul>
          <li>
            <a href="/about?h" title="About">
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="https://brooklynrail.org/events?h" title="Events">
              <span>Events</span>
            </a>
          </li>
          <li>
            <a href="https://mailchi.mp/brooklynrail/join/?h" title="Subscribe to our newsletter">
              <span>Newsletter</span>
            </a>
          </li>
          <li>
            <a href="https://shop.brooklynrail.org/products/subscription?h" title="Subscribe">
              <span>Subscribe</span>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://shop.brooklynrail.org?h" title="Shop">
              <span>Shop</span>
            </a>
          </li>
          <li className="btn btn-donate">
            <a href="https://brooklynrail.org/donate?h" title="Donate">
              <span>Donate</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
