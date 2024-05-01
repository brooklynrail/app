import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="grid-container">
        <div className="grid-row grid-gap-4">
          <div className="grid-col-12 tablet-lg:grid-col-3">
            <Link href="/">
              <Image
                className="logo"
                src="/images/brooklynrail-logo-white.png"
                alt="The Brooklyn Rail"
                title="Brooklyn Rail Home"
                width="320"
                height="42"
              />
            </Link>
            <p className="sub-head">Critical Perspectives on Art, Politics and Culture</p>
          </div>
          <div className="grid-col-6 tablet-lg:grid-col-3 tablet-lg:grid-offset-1 desktop:grid-col-2 desktop:grid-offset-3">
            <h5>The RAIL</h5>
            <ul>
              <li>
                <Link href="/about/?f">About the Rail</Link>
              </li>
              <li>
                <Link href="/staff/?f">Staff</Link>
              </li>
              <li>
                <Link href="/our-supporters/?f">Our Supporters</Link>
              </li>
              <li>
                <Link href="/contributors/?f">Contributors</Link>
              </li>
              <li>
                <Link href="https://shop.brooklynrail.org?f">Store</Link>
              </li>
              <li>
                <Link href="/history/?f">History</Link>
              </li>
              <li>
                <Link href="/archives/?f">Archives</Link>
              </li>
              <li>
                <Link href="/contact/?f">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="grid-col-6 tablet-lg:grid-col-3 desktop:grid-col-2">
            <h5>Get Involved</h5>
            <ul>
              <li>
                <Link href="https://mailchi.mp/brooklynrail/join/?f">Sign up for our newsletter</Link>
              </li>
              <li>
                <Link href="/subscribe/?f">Subscribe</Link>
              </li>
              <li>
                <Link href="https://brooklynrail.org/donate?f">Donate</Link>
              </li>
              <li>
                <Link href="/advertise/?f">Advertise</Link>
              </li>
              <li>
                <Link href="/submissions/?f">Submissions</Link>
              </li>
            </ul>
          </div>
          <div className="grid-col-12 tablet-lg:grid-col-2">
            <h5>Follow</h5>
            <ul>
              <li>
                <Link href="https://www.instagram.com/brooklynrail/" title="Follow @brooklynrail on Instagram">
                  <i className="fab fa-instagram"></i> Instagram
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/thebrooklynrail" title="Follow @thebrooklynrail on Twitter">
                  <i className="fab fa-twitter-square"></i> Twitter
                </Link>
              </li>
              <li>
                <Link href="https://www.facebook.com/thebrooklynrail" title="Like The Brooklyn Rail on Facebook">
                  <i className="fab fa-facebook-f"></i> Facebook
                </Link>
              </li>
              <li>
                <Link href="/rss" title="The Brooklyn Rail RSS feed">
                  <i className="fas fa-rss"></i> RSS
                </Link>
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
