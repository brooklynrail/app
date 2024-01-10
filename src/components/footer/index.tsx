import Link from "next/link"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="grid-container">
        <div className="grid-row grid-gap-4">
          <div className="grid-col-12 tablet-lg:grid-col-3">
            <a href="/">
              <img
                className="logo"
                src="/images/brooklynrail-logo-white.png"
                alt="The Brooklyn Rail"
                title="Brooklyn Rail Home"
              />
            </a>
            <p className="sub-head">Critical Perspectives on Art, Politics and Culture</p>
          </div>
          <div className="grid-col-6 tablet-lg:grid-col-3 tablet-lg:grid-offset-1 desktop:grid-col-2 desktop:grid-offset-3">
            <h5>The RAIL</h5>
            <ul>
              <li>
                <a href="/about/?f">About the Rail</a>
              </li>
              <li>
                <a href="/staff/?f">Staff</a>
              </li>
              <li>
                <a href="/our-supporters/?f">Our Supporters</a>
              </li>
              <li>
                <a href="/contributors/?f">Contributors</a>
              </li>
              <li>
                <a href="https://shop.brooklynrail.org?f">Store</a>
              </li>
              <li>
                <a href="/history/?f">History</a>
              </li>
              <li>
                <a href="/archives/?f">Archives</a>
              </li>
              <li>
                <a href="/contact/?f">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="grid-col-6 tablet-lg:grid-col-3 desktop:grid-col-2">
            <h5>Get Involved</h5>
            <ul>
              <li>
                <a href="https://mailchi.mp/brooklynrail/join/?f">Sign up for our newsletter</a>
              </li>
              <li>
                <a href="/subscribe/?f">Subscribe</a>
              </li>
              <li>
                <a href="https://brooklynrail.org/donate?f">Donate</a>
              </li>
              <li>
                <a href="/advertise/?f">Advertise</a>
              </li>
              <li>
                <a href="/submissions/?f">Submissions</a>
              </li>
            </ul>
          </div>
          <div className="grid-col-12 tablet-lg:grid-col-2">
            <h5>Follow</h5>
            <ul>
              <li>
                <a href="https://www.instagram.com/brooklynrail/" title="Follow @brooklynrail on Instagram">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com/thebrooklynrail" title="Follow @thebrooklynrail on Twitter">
                  <i className="fab fa-twitter-square"></i> Twitter
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/thebrooklynrail" title="Like The Brooklyn Rail on Facebook">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="/rss" title="The Brooklyn Rail RSS feed">
                  <i className="fas fa-rss"></i> RSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid-row grid-gap-4">
          <div className="grid-col-12">
            <p className="copyright">&#169; Copyright 2000-2024 The Brooklyn Rail</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
