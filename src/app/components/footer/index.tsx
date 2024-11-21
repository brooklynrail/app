import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="py-9 px-9 bg-black dark:bg-gray-600 text-white">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-6">
        <div className="col-span-4 tablet:col-span-6 desktop:col-span-6">
          <Link href="/">
            <svg
              className="w-full tablet:max-w-screen-mobile-lg"
              viewBox="0 0 1368 181"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1163.01 96.2125L1172.28 33.1006H1174.51L1183.63 96.2071L1163.01 96.2125ZM1148.6 1.33691L1119.47 178.439H1151.69L1158.24 129.942H1187.37L1195.26 178.439H1228.08L1196.8 1.33691H1148.6ZM1109.84 60.8327V37.7694C1109.84 10.0296 1100.44 1.33691 1075.88 1.33691H1018.37V178.581H1050.3V107.751L1063.21 107.759C1072.01 107.759 1075.96 113.66 1075.96 121.496V178.581H1113.74C1113.74 178.581 1109.83 174.571 1109.83 165.679C1109.83 156.785 1109.83 120.32 1109.83 120.32C1109.83 91.7967 1091.43 91.7376 1089.63 91.7376C1099.09 91.7376 1109.84 84.4141 1109.84 60.8327ZM1075.85 69.0945C1075.85 76.9228 1071.49 80.3859 1066.21 80.3859H1050.4L1050.41 29.6982H1065.99C1073.02 29.6982 1075.86 33.9694 1075.86 40.4581L1075.85 69.0945ZM1237.36 1.33691L1237.41 178.444H1271.81L1271.76 1.33691H1237.36ZM940.804 114.954H939.39L908.203 1.33691H869.734V178.442H899.483V66.3066H900.91L932.887 178.442H971.097V1.33691H940.812L940.804 114.954ZM806.586 71.5737L787.928 1.33691H750.638L787.936 108.699L787.928 178.442H825.231L825.239 108.707L862.544 1.33691H825.239L806.586 71.5737ZM731.599 1.33691H695.66L695.653 178.442H773.131V145.241H731.599V1.33691ZM685.45 1.33691H647.632L619.521 73.8046L619.382 73.8073C619.382 74.4382 619.382 1.33691 619.382 1.33691H584.865V178.442H619.389L619.395 93.2705H619.574L650.688 178.442H689.523L652.524 83.1497L685.45 1.33691ZM0.0079149 83.7857H41.4398V102.178H0L0.0079149 119.16H90.2747V102.17L58.1455 102.178V83.7857H90.2747V66.7949H0.0079149V83.7857ZM0 178.429H16.7057V149.376H41.4345L41.4398 174.652H58.1376V149.376H73.5716V178.429H90.2747V132.372H0V178.429ZM100.96 32.8595H0V53.4476H100.96L100.952 178.431H121.842V1.33709H100.96V32.8595ZM1326.47 1.33691H1290.53L1290.52 178.444H1368V145.241H1326.46L1326.47 1.33691ZM355.285 60.8327V37.7694C355.285 10.0296 345.893 1.33691 321.325 1.33691H263.815V178.581H295.744V107.751L308.658 107.759C317.46 107.759 321.406 113.66 321.406 121.496V178.581H359.187C359.187 178.581 355.277 174.571 355.277 165.679C355.277 156.785 355.277 120.32 355.277 120.32C355.277 91.7967 336.883 91.7376 335.076 91.7376C344.534 91.7376 355.285 84.4141 355.285 60.8327ZM321.288 69.0945C321.288 76.9228 316.922 80.3859 311.645 80.3859H295.834L295.842 29.6982H311.421C318.455 29.6982 321.293 33.9694 321.293 40.4581L321.288 69.0945ZM214.964 60.897C214.964 65.2595 211.014 67.8528 204.817 67.8528H191.411L191.419 29.7129H204.914C212.829 29.7129 214.971 32.7894 214.971 37.3183L214.964 60.897ZM191.401 96.7461H204.315C207.872 96.7461 219.343 96.7434 219.343 110.166C219.343 110.166 219.343 124.797 219.343 138.993C219.343 150.636 205.357 150.728 203.875 150.728C193.722 150.728 191.163 150.728 191.163 150.728L191.401 96.7461ZM211.837 178.581C236.899 178.581 250.948 170.208 250.948 148.396V113.751C250.948 83.8852 232.168 80.7631 230.361 80.7631C239.513 80.7631 249.76 73.2382 249.431 51.5843V37.7694C249.431 10.0296 238.218 1.33691 208.772 1.33691H159.48V178.581H211.837ZM535.926 139.187C535.926 144.185 532.372 149.753 526.275 149.753L518.336 149.761C511.859 149.753 509.448 144.803 509.453 139.181V41.3951C509.448 36.1307 512.171 30.8125 518.336 30.8125H526.275C534.079 30.8125 535.931 37.0703 535.926 41.4005V139.187ZM534.933 0H510.449C485.335 0 475.099 11.0256 475.099 37.9278V142.385C475.099 169.435 485.335 180.581 511.204 180.581L534.167 180.589C560.965 180.589 570.278 169.435 570.278 142.385V37.9225C570.278 10.8028 560.746 0 535.312 0H534.933ZM428.642 139.187C428.642 144.185 425.088 149.753 418.991 149.753L411.055 149.761C404.576 149.753 402.164 144.803 402.169 139.181V41.3951C402.164 36.1307 404.887 30.8125 411.055 30.8125H418.991C426.798 30.8125 428.65 37.0703 428.642 41.4005V139.187ZM427.651 0H403.168C378.051 0 367.815 11.0256 367.815 37.9278V142.385C367.815 169.435 378.051 180.581 403.92 180.581L426.884 180.589C453.683 180.589 462.997 169.435 462.997 142.385V37.9225C462.997 10.8028 453.462 0 428.031 0H427.651Z"
                fill="#efefef"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1163.01 96.2125L1172.28 33.1006H1174.51L1183.63 96.2071L1163.01 96.2125ZM1148.6 1.33691L1119.47 178.439H1151.69L1158.24 129.942H1187.37L1195.26 178.439H1228.08L1196.8 1.33691H1148.6ZM1109.84 60.8327V37.7694C1109.84 10.0296 1100.44 1.33691 1075.88 1.33691H1018.37V178.581H1050.3V107.751L1063.21 107.759C1072.01 107.759 1075.96 113.66 1075.96 121.496V178.581H1113.74C1113.74 178.581 1109.83 174.571 1109.83 165.679C1109.83 156.785 1109.83 120.32 1109.83 120.32C1109.83 91.7967 1091.43 91.7376 1089.63 91.7376C1099.09 91.7376 1109.84 84.4141 1109.84 60.8327ZM1075.85 69.0945C1075.85 76.9228 1071.49 80.3859 1066.21 80.3859H1050.4L1050.41 29.6982H1065.99C1073.02 29.6982 1075.86 33.9694 1075.86 40.4581L1075.85 69.0945ZM1237.36 1.33691L1237.41 178.444H1271.81L1271.76 1.33691H1237.36ZM940.804 114.954H939.39L908.203 1.33691H869.734V178.442H899.483V66.3066H900.91L932.887 178.442H971.097V1.33691H940.812L940.804 114.954ZM806.586 71.5737L787.928 1.33691H750.638L787.936 108.699L787.928 178.442H825.231L825.239 108.707L862.544 1.33691H825.239L806.586 71.5737ZM731.599 1.33691H695.66L695.653 178.442H773.131V145.241H731.599V1.33691ZM685.45 1.33691H647.632L619.521 73.8046L619.382 73.8073C619.382 74.4382 619.382 1.33691 619.382 1.33691H584.865V178.442H619.389L619.395 93.2705H619.574L650.688 178.442H689.523L652.524 83.1497L685.45 1.33691ZM0.0079149 83.7857H41.4398V102.178H0L0.0079149 119.16H90.2747V102.17L58.1455 102.178V83.7857H90.2747V66.7949H0.0079149V83.7857ZM0 178.429H16.7057V149.376H41.4345L41.4398 174.652H58.1376V149.376H73.5716V178.429H90.2747V132.372H0V178.429ZM100.96 32.8595H0V53.4476H100.96L100.952 178.431H121.842V1.33709H100.96V32.8595ZM1326.47 1.33691H1290.53L1290.52 178.444H1368V145.241H1326.46L1326.47 1.33691ZM355.285 60.8327V37.7694C355.285 10.0296 345.893 1.33691 321.325 1.33691H263.815V178.581H295.744V107.751L308.658 107.759C317.46 107.759 321.406 113.66 321.406 121.496V178.581H359.187C359.187 178.581 355.277 174.571 355.277 165.679C355.277 156.785 355.277 120.32 355.277 120.32C355.277 91.7967 336.883 91.7376 335.076 91.7376C344.534 91.7376 355.285 84.4141 355.285 60.8327ZM321.288 69.0945C321.288 76.9228 316.922 80.3859 311.645 80.3859H295.834L295.842 29.6982H311.421C318.455 29.6982 321.293 33.9694 321.293 40.4581L321.288 69.0945ZM214.964 60.897C214.964 65.2595 211.014 67.8528 204.817 67.8528H191.411L191.419 29.7129H204.914C212.829 29.7129 214.971 32.7894 214.971 37.3183L214.964 60.897ZM191.401 96.7461H204.315C207.872 96.7461 219.343 96.7434 219.343 110.166C219.343 110.166 219.343 124.797 219.343 138.993C219.343 150.636 205.357 150.728 203.875 150.728C193.722 150.728 191.163 150.728 191.163 150.728L191.401 96.7461ZM211.837 178.581C236.899 178.581 250.948 170.208 250.948 148.396V113.751C250.948 83.8852 232.168 80.7631 230.361 80.7631C239.513 80.7631 249.76 73.2382 249.431 51.5843V37.7694C249.431 10.0296 238.218 1.33691 208.772 1.33691H159.48V178.581H211.837ZM535.926 139.187C535.926 144.185 532.372 149.753 526.275 149.753L518.336 149.761C511.859 149.753 509.448 144.803 509.453 139.181V41.3951C509.448 36.1307 512.171 30.8125 518.336 30.8125H526.275C534.079 30.8125 535.931 37.0703 535.926 41.4005V139.187ZM534.933 0H510.449C485.335 0 475.099 11.0256 475.099 37.9278V142.385C475.099 169.435 485.335 180.581 511.204 180.581L534.167 180.589C560.965 180.589 570.278 169.435 570.278 142.385V37.9225C570.278 10.8028 560.746 0 535.312 0H534.933ZM428.642 139.187C428.642 144.185 425.088 149.753 418.991 149.753L411.055 149.761C404.576 149.753 402.164 144.803 402.169 139.181V41.3951C402.164 36.1307 404.887 30.8125 411.055 30.8125H418.991C426.798 30.8125 428.65 37.0703 428.642 41.4005V139.187ZM427.651 0H403.168C378.051 0 367.815 11.0256 367.815 37.9278V142.385C367.815 169.435 378.051 180.581 403.92 180.581L426.884 180.589C453.683 180.589 462.997 169.435 462.997 142.385V37.9225C462.997 10.8028 453.462 0 428.031 0H427.651Z"
                fill="#efefef"
                fillOpacity="0.11"
              />
            </svg>
          </Link>
        </div>
        <div className="col-span-2 tablet-lg:col-span-2">
          <h4 className="text-md font-bold">The RAIL</h4>
          <ul>
            <li>
              <Link href="/about/?f" prefetch={false}>
                About the Rail
              </Link>
            </li>
            <li>
              <Link href="/about/staff/?f" prefetch={false}>
                Staff
              </Link>
            </li>
            <li>
              <Link href="/about/our-supporters/?f" prefetch={false}>
                Our Supporters
              </Link>
            </li>
            <li>
              <Link href="/contributors/?f" prefetch={false}>
                Contributors
              </Link>
            </li>
            <li>
              <Link href="https://shop.brooklynrail.org?f" prefetch={false}>
                Store
              </Link>
            </li>
            <li>
              <Link href="/archives/?f" prefetch={false}>
                Archives
              </Link>
            </li>
            <li>
              <Link href="/about/contact-us/?f" prefetch={false}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 tablet-lg:col-span-2">
          <h4 className="text-md font-bold">Get Involved</h4>
          <ul>
            <li>
              <Link href="https://mailchi.mp/brooklynrail/join/?f" prefetch={false}>
                Sign up for our newsletter
              </Link>
            </li>
            <li>
              <Link href="/subscribe/?f" prefetch={false}>
                Subscribe
              </Link>
            </li>
            <li>
              <Link href="/donate?f" prefetch={false}>
                Donate
              </Link>
            </li>
            <li>
              <Link href="/about/advertise/?f" prefetch={false}>
                Advertise
              </Link>
            </li>
            <li>
              <Link href="/about/submissions/?f" prefetch={false}>
                Submissions
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 tablet-lg:col-span-2">
          <h4 className="text-md font-bold">Follow</h4>
          <ul>
            <li>
              <Link
                href="https://www.instagram.com/brooklynrail/"
                title="Follow @brooklynrail on Instagram"
                prefetch={false}
              >
                <i className="fab fa-instagram"></i> Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/thebrooklynrail"
                title="Follow @thebrooklynrail on Twitter"
                prefetch={false}
              >
                <i className="fab fa-twitter-square"></i> Twitter
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/thebrooklynrail"
                title="Like The Brooklyn Rail on Facebook"
                prefetch={false}
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </Link>
            </li>
            <li>
              <Link href="/rss" title="The Brooklyn Rail RSS feed" prefetch={false}>
                <i className="fas fa-rss"></i> RSS
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-4 tablet:col-span-12">
          <p className="text-sm">&#169; Copyright 2000-2024 The Brooklyn Rail</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
