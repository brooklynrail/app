import { useTheme } from "@/app/components/theme"
import { PaperType } from "../paper"

interface BannerProps {
  type: PaperType
}
const HomeBanner = (props: BannerProps) => {
  const { type } = props
  const { theme } = useTheme()

  let pathfill
  let textfill
  switch (type) {
    case PaperType.Homepage:
      pathfill = theme === "dark" ? "fill-none tablet:fill-none" : "fill-none tablet:fill-none"
      textfill = theme === "dark" ? "fill-indigo-50" : "fill-indigo-50"
      break
    case PaperType.Events:
      pathfill = theme === "dark" ? "fill-none tablet:fill-indigo-50" : "fill-none tablet:fill-indigo-950"
      textfill = theme === "dark" ? "fill-indigo-50 tablet:fill-none" : "fill-indigo-950 tablet:fill-none"
      break
    default:
      pathfill = theme === "dark" ? "fill-none tablet:fill-indigo-50" : "fill-none tablet:fill-zinc-800"
      textfill = theme === "dark" ? "fill-indigo-50 tablet:fill-none" : "fill-red-500 tablet:fill-none"
      break
  }

  return (
    <div className="relative w-full">
      {/* Mask definition */}
      <svg viewBox="0 0 1368 181" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>The Brooklyn Rail Logo</title>
        <defs>
          <mask id="mask-circle">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1163.01 96.2125L1172.28 33.1006H1174.51L1183.64 96.2071L1163.01 96.2125ZM1148.6 1.33691L1119.48 178.439H1151.69L1158.24 129.942H1187.37L1195.27 178.439H1228.08L1196.8 1.33691H1148.6ZM1109.84 60.8327V37.7694C1109.84 10.0296 1100.44 1.33691 1075.88 1.33691H1018.37V178.581H1050.3V107.751L1063.21 107.759C1072.01 107.759 1075.96 113.66 1075.96 121.496V178.581H1113.74C1113.74 178.581 1109.83 174.571 1109.83 165.679C1109.83 156.785 1109.83 120.32 1109.83 120.32C1109.83 91.7967 1091.43 91.7376 1089.63 91.7376C1099.09 91.7376 1109.84 84.4141 1109.84 60.8327ZM1075.85 69.0945C1075.85 76.9228 1071.49 80.3859 1066.21 80.3859H1050.4L1050.41 29.6982H1065.98C1073.02 29.6982 1075.86 33.9694 1075.86 40.4581L1075.85 69.0945ZM1237.36 1.33691L1237.41 178.444H1271.81L1271.76 1.33691H1237.36ZM940.804 114.954H939.39L908.203 1.33691H869.734V178.442H899.483V66.3066H900.911L932.887 178.442H971.097V1.33691H940.812L940.804 114.954ZM806.588 71.5737L787.93 1.33691H750.64L787.938 108.699L787.93 178.442H825.233L825.241 108.707L862.546 1.33691H825.241L806.588 71.5737ZM731.599 1.33691H695.66L695.652 178.442H773.131V145.241H731.599V1.33691ZM685.452 1.33691H647.634L619.523 73.8046L619.384 73.8073C619.384 74.4382 619.384 1.33691 619.384 1.33691H584.867V178.442H619.391L619.397 93.2705H619.576L650.69 178.442H689.525L652.526 83.1497L685.452 1.33691ZM0.0079149 83.7857H41.4398V102.178H0L0.0079149 119.16H90.2747V102.17L58.1455 102.178V83.7857H90.2747V66.7949H0.0079149V83.7857ZM0 178.429H16.7057V149.376H41.4345L41.4398 174.652H58.1376V149.376H73.5716V178.429H90.2747V132.372H0V178.429ZM100.96 32.8596H0V53.4476H100.96L100.952 178.431H121.842V1.33716H100.96V32.8596ZM1326.47 1.33691H1290.53L1290.52 178.444H1368V145.241H1326.46L1326.47 1.33691ZM355.282 60.8327V37.7694C355.282 10.0296 345.89 1.33691 321.322 1.33691H263.812V178.581H295.741V107.751L308.656 107.759C317.457 107.759 321.404 113.66 321.404 121.496V178.581H359.184C359.184 178.581 355.274 174.571 355.274 165.679C355.274 156.785 355.274 120.32 355.274 120.32C355.274 91.7967 336.88 91.7376 335.073 91.7376C344.531 91.7376 355.282 84.4141 355.282 60.8327ZM321.29 69.0945C321.29 76.9228 316.924 80.3859 311.647 80.3859H295.836L295.844 29.6982H311.423C318.457 29.6982 321.296 33.9694 321.296 40.4581L321.29 69.0945ZM214.966 60.897C214.966 65.2595 211.017 67.8528 204.819 67.8528H191.414L191.422 29.7129H204.917C212.832 29.7129 214.974 32.7894 214.974 37.3183L214.966 60.897ZM191.402 96.7461H204.316C207.872 96.7461 219.344 96.7434 219.344 110.166C219.344 110.166 219.344 124.797 219.344 138.993C219.344 150.636 205.358 150.728 203.875 150.728C193.723 150.728 191.164 150.728 191.164 150.728L191.402 96.7461ZM211.838 178.581C236.899 178.581 250.948 170.208 250.948 148.396V113.751C250.948 83.8852 232.168 80.7631 230.361 80.7631C239.513 80.7631 249.76 73.2382 249.431 51.5843V37.7694C249.431 10.0296 238.218 1.33691 208.772 1.33691H159.48V178.581H211.838ZM535.925 139.187C535.925 144.185 532.372 149.753 526.274 149.753L518.336 149.761C511.859 149.753 509.447 144.803 509.453 139.181V41.3951C509.447 36.1307 512.17 30.8125 518.336 30.8125H526.274C534.079 30.8125 535.931 37.0703 535.925 41.4005V139.187ZM534.931 0H510.448C485.334 0 475.097 11.0256 475.097 37.9278V142.385C475.097 169.435 485.334 180.581 511.203 180.581L534.166 180.589C560.963 180.589 570.277 169.435 570.277 142.385V37.9224C570.277 10.8028 560.745 0 535.311 0H534.931ZM428.644 139.187C428.644 144.185 425.091 149.753 418.993 149.753L411.057 149.761C404.578 149.753 402.166 144.803 402.172 139.181V41.3951C402.166 36.1307 404.889 30.8125 411.057 30.8125H418.993C426.8 30.8125 428.652 37.0703 428.644 41.4005V139.187ZM427.649 0H403.165C378.049 0 367.812 11.0256 367.812 37.9278V142.385C367.812 169.435 378.049 180.581 403.917 180.581L426.881 180.589C453.681 180.589 462.994 169.435 462.994 142.385V37.9224C462.994 10.8028 453.459 0 428.029 0H427.649Z"
              className={textfill}
            />
          </mask>
        </defs>
      </svg>

      {/* Video Element with mask applied */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ mask: "url(#mask-circle)", WebkitMask: "url(#mask-circle)" }} // Apply the mask
          poster="/video/bosphorus.mp4"
        >
          <source src="/video/transition.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default HomeBanner
