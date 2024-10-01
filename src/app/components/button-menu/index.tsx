import styles from "../header/header.module.scss"

const ButtonMenu = () => {
  return (
    <>
      <button className={styles.button_menu}>
        <svg width="66" height="67" viewBox="0 0 66 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_2062_4081)">
            <rect x="6" y="4.58936" width="54" height="54" rx="4" fill="#EFF1F4" shapeRendering="crispEdges" />
            <path d="M15 20.6636H31" stroke="#191C1F" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 31.6636H31" stroke="#191C1F" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 43.6636H42" stroke="#191C1F" strokeWidth="2" strokeLinecap="round" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M35.825 24.1824C34.3783 28.06 36.3489 32.3762 40.2265 33.8229C44.104 35.2696 48.4202 33.299 49.8669 29.4214C51.3136 25.5438 49.343 21.2277 45.4654 19.781C41.5879 18.3343 37.2717 20.3049 35.825 24.1824ZM33.9512 23.4833C32.1183 28.3958 34.6149 33.8639 39.5273 35.6967C42.0707 36.6456 44.763 36.434 47.0227 35.3275L48.8318 39.2901C49.0612 39.7925 49.6544 40.0138 50.1568 39.7844C50.6592 39.5551 50.8806 38.9618 50.6512 38.4594L48.7309 34.2534C50.0504 33.2133 51.1105 31.8097 51.7407 30.1205C53.5735 25.2081 51.077 19.7399 46.1646 17.9071C41.2521 16.0743 35.784 18.5709 33.9512 23.4833Z"
              fill="#191C1F"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_2062_4081"
              x="0"
              y="0.589355"
              width="66"
              height="66"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="3" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.654902 0 0 0 0 0.67451 0 0 0 0 0.694118 0 0 0 1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2062_4081" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2062_4081" result="shape" />
            </filter>
          </defs>
        </svg>
      </button>
    </>
  )
}

export default ButtonMenu
