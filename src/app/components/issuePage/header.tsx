import Link from "next/link"
import Image from "next/image"

interface HeaderProps {
  special_issue?: boolean | null
  issue_number?: number
  title?: string
}

const oldLogo = (
  <svg width="396px" height="68px" viewBox="0 0 600 103" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>Brooklynrail Logo</title>

    <g id="brooklynrail-logo-ex" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Group-2">
        <g id="Group" fill="#E52207">
          <polyline
            id="L"
            points="581.99565 0 566.412698 0 566.409266 76.2447761 600 76.2447761 600 61.9520588 581.992219 61.9520588 581.99565 0"
          ></polyline>
          <polyline
            id="I"
            points="543.243243 0 543.263998 76.2447761 558.301158 76.2447761 558.276944 0 543.243243 0"
          ></polyline>
          <path
            d="M503.855545,0 L491.119691,76.2447761 L505.208852,76.2447761 L508.071217,55.3653272 L520.811686,55.3653272 L524.2636,76.2447761 L538.610039,76.2447761 L524.933908,0 L503.855545,0 Z M510.161748,40.8481813 L514.212439,13.676929 L515.189635,13.676929 L519.17918,40.8447141 L510.161748,40.8481813 L510.161748,40.8481813 Z"
            id="A"
          ></path>
          <path
            d="M472.234524,29.1449421 C472.234524,32.5135053 470.326538,34.0020476 468.019421,34.0020476 L461.106143,34.0020476 L461.109604,12.1993489 L467.921368,12.1993489 C470.996756,12.1993489 472.237985,14.036642 472.237985,16.8278032 L472.234524,29.1449421 Z M487.098129,25.5927652 L487.098129,15.6718444 C487.098129,3.7392552 482.99146,0 472.249521,0 L447.104247,0 L447.104247,76.2447761 L461.063462,76.2447761 L461.063462,45.7764287 L466.711285,45.7798931 C470.558404,45.7798931 472.285281,48.3181522 472.285281,51.6878701 L472.285281,76.2447761 L488.803089,76.2447761 C488.803089,76.2447761 487.094668,74.5183442 487.094668,70.6936335 C487.094668,66.867768 487.094668,51.182066 487.094668,51.182066 C487.094668,38.912274 479.050903,38.8868683 478.261869,38.8868683 C482.397377,38.8868683 487.098129,35.7365631 487.098129,25.5927652 L487.098129,25.5927652 Z"
            id="R"
          ></path>
          <polyline
            id="N"
            points="412.95182 48.9128771 412.664463 48.9128771 399.134351 0 382.239382 0 382.239382 76.2447761 395.303697 76.2447761 395.303697 27.9698629 395.598006 27.9698629 409.474568 76.2447761 426.254826 76.2447761 426.254826 0 412.955296 0 412.95182 48.9128771"
          ></polyline>
          <polyline
            id="Y"
            points="354.439007 30.2385643 346.327841 0 330.11583 0 346.330135 46.221178 346.327841 76.2447761 362.544439 76.2447761 362.54788 46.2234894 378.764479 0 362.54788 0 354.439007 30.2385643"
          ></polyline>
          <polyline
            id="L"
            points="321.376133 0 305.794937 0 305.791506 76.2447761 339.382239 76.2447761 339.382239 61.9529979 321.376133 61.9529979 321.376133 0"
          ></polyline>
          <path
            d="M301.672732,0 L284.931106,0 L272.486428,31.1989773 L272.424525,31.1989773 C272.424525,31.4705742 272.424525,0 272.424525,0 L257.142857,0 L257.142857,76.2447761 L272.426861,76.2447761 L272.430365,39.5780321 L272.509787,39.5780321 L286.283611,76.2447761 L303.474903,76.2447761 L287.096515,35.2209236 L301.672732,0"
            id="K"
          ></path>
          <path
            d="M234.70841,0 L223.982317,0 C212.978825,0 208.494208,4.72661216 208.494208,16.2566464 L208.494208,61.0259938 C208.494208,72.6181597 212.978825,77.3965482 224.311728,77.3965482 L234.373219,77.4 C246.112974,77.4 250.19305,72.6181597 250.19305,61.0259938 L250.19305,16.2531946 C250.19305,4.62996284 246.01704,0 234.874849,0 M235.143001,59.6579456 C235.143001,61.7991883 233.5861,64.1866568 230.913823,64.1866568 L227.437089,64.1889579 C224.598374,64.1866568 223.541946,62.064974 223.545413,59.6544938 L223.545413,17.7443556 C223.541946,15.4892047 224.734761,13.2098915 227.437089,13.2098915 L230.913823,13.2098915 C234.333921,13.2098915 235.145313,15.8919102 235.143001,17.7478073 L235.143001,59.6579456"
            id="O"
          ></path>
          <path
            d="M187.218789,0 L176.491243,0 C165.488602,0 161.003861,4.72661216 161.003861,16.2566464 L161.003861,61.0259938 C161.003861,72.6181597 165.488602,77.3965482 176.820663,77.3965482 L186.882433,77.4 C198.622513,77.4 202.702703,72.6181597 202.702703,61.0259938 L202.702703,16.2531946 C202.702703,4.62996284 198.526577,0 187.385233,0 M187.652237,59.6579456 C187.652237,61.7991883 186.095292,64.1866568 183.424097,64.1866568 L179.947267,64.1889579 C177.108472,64.1866568 176.05086,62.064974 176.054327,59.6544938 L176.054327,17.7443556 C176.05086,15.4892047 177.244864,13.2098915 179.947267,13.2098915 L183.424097,13.2098915 C186.843134,13.2098915 187.655704,15.8919102 187.652237,17.7478073 L187.652237,59.6579456"
            id="O"
          ></path>
          <path
            d="M140.960852,29.1449421 C140.960852,32.5135053 139.051765,34.0020476 136.744711,34.0020476 L129.831625,34.0020476 L129.835085,12.1993489 L136.645508,12.1993489 C139.721964,12.1993489 140.963159,14.036642 140.963159,16.8278032 L140.960852,29.1449421 Z M155.822891,25.5927652 L155.822891,15.6718444 C155.822891,3.7392552 151.716336,0 140.974694,0 L115.830116,0 L115.830116,76.2447761 L129.790098,76.2447761 L129.790098,45.7764287 L135.436612,45.7798931 C139.283624,45.7798931 141.010453,48.3181522 141.010453,51.6878701 L141.010453,76.2447761 L157.528958,76.2447761 C157.528958,76.2447761 155.819431,74.5183442 155.819431,70.6936335 C155.819431,66.867768 155.819431,51.182066 155.819431,51.182066 C155.819431,38.912274 147.777042,38.8868683 146.986876,38.8868683 C151.122269,38.8868683 155.822891,35.7365631 155.822891,25.5927652 L155.822891,25.5927652 Z"
            id="R"
          ></path>
          <path
            d="M92.7046873,76.2447761 C103.812758,76.2447761 110.03861,72.6417878 110.03861,63.2590057 L110.03861,48.3574155 C110.03861,35.5102215 101.714866,34.1671845 100.915,34.1671845 C104.970458,34.1671845 109.513552,30.9291142 109.367378,21.6144656 L109.367378,15.6718444 C109.367378,3.7392552 104.397455,0 91.3458519,0 L69.4980695,0 L69.4980695,76.2447761 L92.7046873,76.2447761 Z M83.650072,41.0451969 L89.3742541,41.0451969 C90.9505968,41.0451969 96.0351206,41.0440421 96.0351206,46.8180618 C96.0351206,46.8180618 96.0351206,53.1105886 96.0351206,59.2171918 C96.0351206,64.2267314 89.8361646,64.2648399 89.1789653,64.2648399 C84.6791384,64.2648399 83.5448265,64.2648399 83.5448265,64.2648399 L83.650072,41.0451969 Z M94.0892495,25.6216353 C94.0892495,27.4981917 92.3386671,28.6137323 89.5917613,28.6137323 L83.650072,28.6137323 L83.6524108,12.2085874 L89.6350289,12.2085874 C93.14321,12.2085874 94.0927576,13.5308379 94.0927576,15.480147 L94.0892495,25.6216353 L94.0892495,25.6216353 Z"
            id="B"
          ></path>
          <polyline
            id="E"
            points="0 76.2447761 7.28669835 76.2447761 7.28669835 63.8573449 18.0746029 63.8573449 18.0780558 74.6342498 25.3624522 74.6342498 25.3624522 63.8573449 32.095541 63.8573449 32.095541 76.2447761 39.3822394 76.2447761 39.3822394 56.6059701 0 56.6059701 0 76.2447761"
          ></polyline>
          <polyline
            id="H"
            points="0.00345286607 36.3775588 18.0780558 36.3775588 18.0780558 44.4916665 0 44.4916665 0.00345286607 51.9850746 39.3822394 51.9850746 39.3822394 44.4881129 25.3647541 44.4916665 25.3647541 36.3775588 39.3822394 36.3775588 39.3822394 28.880597 0.00345286607 28.880597 0.00345286607 36.3775588"
          ></polyline>
          <polyline
            id="T"
            points="44.1500299 13.5712188 0 13.5712188 0 22.4349283 44.1500299 22.4349283 44.1465687 76.2447761 53.2818533 76.2447761 53.2818533 0 44.1500299 0 44.1500299 13.5712188"
          ></polyline>
        </g>
        <path
          d="M2.34174,93.65004 C2.34174,96.3591 3.53838,98.05434 5.68236,98.05434 C7.3776,98.05434 8.15874,97.09038 8.39142,95.87712 L10.5354,95.87712 C10.1199,98.1873 8.52438,99.79944 5.68236,99.79944 C2.35836,99.79944 0.09804,97.33968 0.09804,93.65004 C0.09804,89.99364 2.35836,87.53388 5.68236,87.53388 C8.52438,87.53388 10.1199,89.1294 10.5354,91.4562 L8.39142,91.4562 C8.15874,90.24294 7.3776,89.27898 5.68236,89.27898 C3.53838,89.27898 2.34174,90.9576 2.34174,93.65004 Z M16.3988879,99.6 L14.2382879,99.6 L14.2382879,87.73332 L19.3240079,87.73332 C22.0995479,87.73332 23.7283079,89.02968 23.7283079,91.4562 C23.7283079,93.30102 22.5482879,94.39794 21.2020679,94.83006 L24.1770479,99.6 L21.7671479,99.6 L19.0580879,95.16246 L16.3988879,95.16246 L16.3988879,99.6 Z M16.3988879,93.43398 L19.0747079,93.43398 C20.7200879,93.43398 21.5510879,92.75256 21.5510879,91.4562 C21.5510879,90.15984 20.7200879,89.47842 19.0747079,89.47842 L16.3988879,89.47842 L16.3988879,93.43398 Z M27.7802159,99.6 L27.7802159,87.73332 L29.9906759,87.73332 L29.9906759,99.6 L27.7802159,99.6 Z M37.9815238,99.6 L37.9815238,89.47842 L33.7268038,89.47842 L33.7268038,87.73332 L44.4467038,87.73332 L44.4467038,89.47842 L40.1753638,89.47842 L40.1753638,99.6 L37.9815238,99.6 Z M48.1828318,99.6 L48.1828318,87.73332 L50.3932918,87.73332 L50.3932918,99.6 L48.1828318,99.6 Z M56.4395997,93.65004 C56.4395997,96.3591 57.6362397,98.05434 59.7802197,98.05434 C61.4754597,98.05434 62.2565997,97.09038 62.4892797,95.87712 L64.6332597,95.87712 C64.2177597,98.1873 62.6222397,99.79944 59.7802197,99.79944 C56.4562197,99.79944 54.1958997,97.33968 54.1958997,93.65004 C54.1958997,89.99364 56.4562197,87.53388 59.7802197,87.53388 C62.6222397,87.53388 64.2177597,89.1294 64.6332597,91.4562 L62.4892797,91.4562 C62.2565997,90.24294 61.4754597,89.27898 59.7802197,89.27898 C57.6362397,89.27898 56.4395997,90.9576 56.4395997,93.65004 Z M76.7292476,99.6 L75.6157076,96.6915 L70.2640676,96.6915 L69.1339076,99.6 L66.9733076,99.6 L71.7432476,87.73332 L74.2196276,87.73332 L78.9895676,99.6 L76.7292476,99.6 Z M72.9398876,89.86068 L70.9454876,94.97964 L74.9509076,94.97964 L72.9897476,89.86068 L72.9398876,89.86068 Z M82.2935756,99.6 L82.2935756,87.73332 L84.5040356,87.73332 L84.5040356,97.8549 L90.6201956,97.8549 L90.6201956,99.6 L82.2935756,99.6 Z M104.740451,95.22894 L101.981531,95.22894 L101.981531,99.6 L99.8209315,99.6 L99.8209315,87.73332 L104.723831,87.73332 C107.532611,87.73332 109.161371,89.01306 109.161371,91.48944 C109.161371,93.96582 107.532611,95.22894 104.740451,95.22894 Z M101.981531,93.50046 L104.541011,93.50046 C106.169771,93.50046 106.984151,92.83566 106.984151,91.48944 C106.984151,90.1266 106.169771,89.47842 104.541011,89.47842 L101.981531,89.47842 L101.981531,93.50046 Z M121.390319,99.6 L112.797779,99.6 L112.797779,87.73332 L121.323839,87.73332 L121.323839,89.47842 L114.958379,89.47842 L114.958379,92.7858 L120.592559,92.7858 L120.592559,94.5309 L114.958379,94.5309 L114.958379,97.8549 L121.390319,97.8549 L121.390319,99.6 Z M127.636067,99.6 L125.475467,99.6 L125.475467,87.73332 L130.561187,87.73332 C133.336727,87.73332 134.965487,89.02968 134.965487,91.4562 C134.965487,93.30102 133.785467,94.39794 132.439247,94.83006 L135.414227,99.6 L133.004327,99.6 L130.295267,95.16246 L127.636067,95.16246 L127.636067,99.6 Z M127.636067,93.43398 L130.311887,93.43398 C131.957267,93.43398 132.788267,92.75256 132.788267,91.4562 C132.788267,90.15984 131.957267,89.47842 130.311887,89.47842 L127.636067,89.47842 L127.636067,93.43398 Z M138.236255,96.01008 L140.363615,96.01008 C140.513195,97.62222 141.909275,98.17068 143.388455,98.17068 C144.801155,98.17068 145.898075,97.53912 145.898075,96.34248 C145.898075,95.47824 145.382855,94.99626 143.953535,94.73034 L141.776315,94.33146 C140.031215,94.01568 138.618515,93.18468 138.618515,91.10718 C138.618515,88.99644 140.479955,87.53388 143.072675,87.53388 C145.898075,87.53388 147.593315,88.76376 147.825995,90.99084 L145.748495,90.99084 C145.598915,89.82744 144.568475,89.17926 143.089295,89.17926 C141.659975,89.17926 140.762495,89.92716 140.762495,90.97422 C140.762495,91.9548 141.377435,92.27058 142.657175,92.51988 L144.950735,92.96862 C146.895275,93.33426 148.058675,94.29822 148.058675,96.20952 C148.058675,98.37012 146.080895,99.79944 143.454935,99.79944 C140.629535,99.79944 138.452315,98.61942 138.236255,96.01008 Z M156.780803,95.22894 L154.021883,95.22894 L154.021883,99.6 L151.861283,99.6 L151.861283,87.73332 L156.764183,87.73332 C159.572963,87.73332 161.201723,89.01306 161.201723,91.48944 C161.201723,93.96582 159.572963,95.22894 156.780803,95.22894 Z M154.021883,93.50046 L156.581363,93.50046 C158.210123,93.50046 159.024503,92.83566 159.024503,91.48944 C159.024503,90.1266 158.210123,89.47842 156.581363,89.47842 L154.021883,89.47842 L154.021883,93.50046 Z M173.430671,99.6 L164.838131,99.6 L164.838131,87.73332 L173.364191,87.73332 L173.364191,89.47842 L166.998731,89.47842 L166.998731,92.7858 L172.632911,92.7858 L172.632911,94.5309 L166.998731,94.5309 L166.998731,97.8549 L173.430671,97.8549 L173.430671,99.6 Z M179.111339,93.65004 C179.111339,96.3591 180.307979,98.05434 182.451959,98.05434 C184.147199,98.05434 184.928339,97.09038 185.161019,95.87712 L187.304999,95.87712 C186.889499,98.1873 185.293979,99.79944 182.451959,99.79944 C179.127959,99.79944 176.867639,97.33968 176.867639,93.65004 C176.867639,89.99364 179.127959,87.53388 182.451959,87.53388 C185.293979,87.53388 186.889499,89.1294 187.304999,91.4562 L185.161019,91.4562 C184.928339,90.24294 184.147199,89.27898 182.451959,89.27898 C180.307979,89.27898 179.111339,90.9576 179.111339,93.65004 Z M194.381747,99.6 L194.381747,89.47842 L190.127027,89.47842 L190.127027,87.73332 L200.846927,87.73332 L200.846927,89.47842 L196.575587,89.47842 L196.575587,99.6 L194.381747,99.6 Z M204.583055,99.6 L204.583055,87.73332 L206.793515,87.73332 L206.793515,99.6 L204.583055,99.6 Z M214.767743,99.6 L210.080903,87.73332 L212.424323,87.73332 L216.030863,97.23996 L216.064103,97.23996 L219.687263,87.73332 L221.930963,87.73332 L217.227503,99.6 L214.767743,99.6 Z M233.827511,99.6 L225.234971,99.6 L225.234971,87.73332 L233.761031,87.73332 L233.761031,89.47842 L227.395571,89.47842 L227.395571,92.7858 L233.029751,92.7858 L233.029751,94.5309 L227.395571,94.5309 L227.395571,97.8549 L233.827511,97.8549 L233.827511,99.6 Z M237.098279,96.01008 L239.225639,96.01008 C239.375219,97.62222 240.771299,98.17068 242.250479,98.17068 C243.663179,98.17068 244.760099,97.53912 244.760099,96.34248 C244.760099,95.47824 244.244879,94.99626 242.815559,94.73034 L240.638339,94.33146 C238.893239,94.01568 237.480539,93.18468 237.480539,91.10718 C237.480539,88.99644 239.341979,87.53388 241.934699,87.53388 C244.760099,87.53388 246.455339,88.76376 246.688019,90.99084 L244.610519,90.99084 C244.460939,89.82744 243.430499,89.17926 241.951319,89.17926 C240.521999,89.17926 239.624519,89.92716 239.624519,90.97422 C239.624519,91.9548 240.239459,92.27058 241.519199,92.51988 L243.812759,92.96862 C245.757299,93.33426 246.920699,94.29822 246.920699,96.20952 C246.920699,98.37012 244.942919,99.79944 242.316959,99.79944 C239.491559,99.79944 237.314339,98.61942 237.098279,96.01008 Z M266.658515,93.66666 C266.658515,97.23996 264.481295,99.79944 260.991095,99.79944 C257.500895,99.79944 255.323675,97.23996 255.323675,93.66666 C255.323675,90.10998 257.500895,87.53388 260.991095,87.53388 C264.481295,87.53388 266.658515,90.10998 266.658515,93.66666 Z M264.414815,93.66666 C264.414815,91.0407 263.251415,89.27898 260.991095,89.27898 C258.714155,89.27898 257.567375,91.0407 257.567375,93.66666 C257.567375,96.30924 258.714155,98.05434 260.991095,98.05434 C263.251415,98.05434 264.414815,96.30924 264.414815,93.66666 Z M273.020603,87.73332 L278.604923,96.14304 L278.638163,96.14304 L278.638163,87.73332 L280.732283,87.73332 L280.732283,99.6 L278.688023,99.6 L272.588483,90.40914 L272.555243,90.40914 L272.555243,99.6 L270.444503,99.6 L270.444503,87.73332 L273.020603,87.73332 Z M299.024159,99.6 L297.910619,96.6915 L292.558979,96.6915 L291.428819,99.6 L289.268219,99.6 L294.038159,87.73332 L296.514539,87.73332 L301.284479,99.6 L299.024159,99.6 Z M295.234799,89.86068 L293.240399,94.97964 L297.245819,94.97964 L295.284659,89.86068 L295.234799,89.86068 Z M306.749086,99.6 L304.588486,99.6 L304.588486,87.73332 L309.674206,87.73332 C312.449746,87.73332 314.078506,89.02968 314.078506,91.4562 C314.078506,93.30102 312.898486,94.39794 311.552266,94.83006 L314.527246,99.6 L312.117346,99.6 L309.408286,95.16246 L306.749086,95.16246 L306.749086,99.6 Z M306.749086,93.43398 L309.424906,93.43398 C311.070286,93.43398 311.901286,92.75256 311.901286,91.4562 C311.901286,90.15984 311.070286,89.47842 309.424906,89.47842 L306.749086,89.47842 L306.749086,93.43398 Z M321.487654,99.6 L321.487654,89.47842 L317.232934,89.47842 L317.232934,87.73332 L327.952834,87.73332 L327.952834,89.47842 L323.681494,89.47842 L323.681494,99.6 L321.487654,99.6 Z M330.558802,96.01008 L332.686162,96.01008 C332.835742,97.62222 334.231822,98.17068 335.711002,98.17068 C337.123702,98.17068 338.220622,97.53912 338.220622,96.34248 C338.220622,95.47824 337.705402,94.99626 336.276082,94.73034 L334.098862,94.33146 C332.353762,94.01568 330.941062,93.18468 330.941062,91.10718 C330.941062,88.99644 332.802502,87.53388 335.395222,87.53388 C338.220622,87.53388 339.915862,88.76376 340.148542,90.99084 L338.071042,90.99084 C337.921462,89.82744 336.891022,89.17926 335.411842,89.17926 C333.982522,89.17926 333.085042,89.92716 333.085042,90.97422 C333.085042,91.9548 333.699982,92.27058 334.979722,92.51988 L337.273282,92.96862 C339.217822,93.33426 340.381222,94.29822 340.381222,96.20952 C340.381222,98.37012 338.403442,99.79944 335.777482,99.79944 C332.952082,99.79944 330.774862,98.61942 330.558802,96.01008 Z M344.13397,99.53352 L344.13397,97.12362 L346.61035,97.12362 L346.61035,99.7662 C346.61035,101.4282 345.53005,102.37554 343.76833,102.37554 L343.76833,101.22876 C344.66581,101.22876 345.26413,100.91298 345.26413,99.7662 L345.26413,99.53352 L344.13397,99.53352 Z M361.362166,95.22894 L358.603246,95.22894 L358.603246,99.6 L356.442646,99.6 L356.442646,87.73332 L361.345546,87.73332 C364.154326,87.73332 365.783086,89.01306 365.783086,91.48944 C365.783086,93.96582 364.154326,95.22894 361.362166,95.22894 Z M358.603246,93.50046 L361.162726,93.50046 C362.791486,93.50046 363.605866,92.83566 363.605866,91.48944 C363.605866,90.1266 362.791486,89.47842 361.162726,89.47842 L358.603246,89.47842 L358.603246,93.50046 Z M380.189254,93.66666 C380.189254,97.23996 378.012034,99.79944 374.521834,99.79944 C371.031634,99.79944 368.854414,97.23996 368.854414,93.66666 C368.854414,90.10998 371.031634,87.53388 374.521834,87.53388 C378.012034,87.53388 380.189254,90.10998 380.189254,93.66666 Z M377.945554,93.66666 C377.945554,91.0407 376.782154,89.27898 374.521834,89.27898 C372.244894,89.27898 371.098114,91.0407 371.098114,93.66666 C371.098114,96.30924 372.244894,98.05434 374.521834,98.05434 C376.782154,98.05434 377.945554,96.30924 377.945554,93.66666 Z M383.975242,99.6 L383.975242,87.73332 L386.185702,87.73332 L386.185702,97.8549 L392.301862,97.8549 L392.301862,99.6 L383.975242,99.6 Z M396.25405,99.6 L396.25405,87.73332 L398.46451,87.73332 L398.46451,99.6 L396.25405,99.6 Z M406.455358,99.6 L406.455358,89.47842 L402.200638,89.47842 L402.200638,87.73332 L412.920538,87.73332 L412.920538,89.47842 L408.649198,89.47842 L408.649198,99.6 L406.455358,99.6 Z M416.656666,99.6 L416.656666,87.73332 L418.867126,87.73332 L418.867126,99.6 L416.656666,99.6 Z M424.913434,93.65004 C424.913434,96.3591 426.110074,98.05434 428.254054,98.05434 C429.949294,98.05434 430.730434,97.09038 430.963114,95.87712 L433.107094,95.87712 C432.691594,98.1873 431.096074,99.79944 428.254054,99.79944 C424.930054,99.79944 422.669734,97.33968 422.669734,93.65004 C422.669734,89.99364 424.930054,87.53388 428.254054,87.53388 C431.096074,87.53388 432.691594,89.1294 433.107094,91.4562 L430.963114,91.4562 C430.730434,90.24294 429.949294,89.27898 428.254054,89.27898 C426.110074,89.27898 424.913434,90.9576 424.913434,93.65004 Z M436.028842,96.01008 L438.156202,96.01008 C438.305782,97.62222 439.701862,98.17068 441.181042,98.17068 C442.593742,98.17068 443.690662,97.53912 443.690662,96.34248 C443.690662,95.47824 443.175442,94.99626 441.746122,94.73034 L439.568902,94.33146 C437.823802,94.01568 436.411102,93.18468 436.411102,91.10718 C436.411102,88.99644 438.272542,87.53388 440.865262,87.53388 C443.690662,87.53388 445.385902,88.76376 445.618582,90.99084 L443.541082,90.99084 C443.391502,89.82744 442.361062,89.17926 440.881882,89.17926 C439.452562,89.17926 438.555082,89.92716 438.555082,90.97422 C438.555082,91.9548 439.170022,92.27058 440.449762,92.51988 L442.743322,92.96862 C444.687862,93.33426 445.851262,94.29822 445.851262,96.20952 C445.851262,98.37012 443.873482,99.79944 441.247522,99.79944 C438.422122,99.79944 436.244902,98.61942 436.028842,96.01008 Z M449.60401,99.53352 L449.60401,97.12362 L452.08039,97.12362 L452.08039,99.7662 C452.08039,101.4282 451.00009,102.37554 449.23837,102.37554 L449.23837,101.22876 C450.13585,101.22876 450.73417,100.91298 450.73417,99.7662 L450.73417,99.53352 L449.60401,99.53352 Z M470.505226,99.6 L469.391686,96.6915 L464.040046,96.6915 L462.909886,99.6 L460.749286,99.6 L465.519226,87.73332 L467.995606,87.73332 L472.765546,99.6 L470.505226,99.6 Z M466.715866,89.86068 L464.721466,94.97964 L468.726886,94.97964 L466.765726,89.86068 L466.715866,89.86068 Z M478.645653,87.73332 L484.229973,96.14304 L484.263213,96.14304 L484.263213,87.73332 L486.357333,87.73332 L486.357333,99.6 L484.313073,99.6 L478.213533,90.40914 L478.180293,90.40914 L478.180293,99.6 L476.069553,99.6 L476.069553,87.73332 L478.645653,87.73332 Z M495.378621,87.73332 C498.951921,87.73332 501.311961,90.10998 501.311961,93.66666 C501.311961,97.23996 498.951921,99.6 495.378621,99.6 L490.808121,99.6 L490.808121,87.73332 L495.378621,87.73332 Z M495.378621,89.47842 L492.968721,89.47842 L492.968721,97.8549 L495.378621,97.8549 C497.738661,97.8549 499.051641,96.30924 499.051641,93.66666 C499.051641,91.02408 497.738661,89.47842 495.378621,89.47842 Z M511.942017,93.65004 C511.942017,96.3591 513.138657,98.05434 515.282637,98.05434 C516.977877,98.05434 517.759017,97.09038 517.991697,95.87712 L520.135677,95.87712 C519.720177,98.1873 518.124657,99.79944 515.282637,99.79944 C511.958637,99.79944 509.698317,97.33968 509.698317,93.65004 C509.698317,89.99364 511.958637,87.53388 515.282637,87.53388 C518.124657,87.53388 519.720177,89.1294 520.135677,91.4562 L517.991697,91.4562 C517.759017,90.24294 516.977877,89.27898 515.282637,89.27898 C513.138657,89.27898 511.942017,90.9576 511.942017,93.65004 Z M533.827185,94.81344 C533.827185,98.05434 531.965745,99.79944 528.758085,99.79944 C525.567045,99.79944 523.688985,98.05434 523.688985,94.7802 L523.688985,87.73332 L525.899445,87.73332 L525.899445,94.79682 C525.899445,96.87432 526.846785,98.03772 528.758085,98.03772 C530.669385,98.03772 531.633345,96.87432 531.633345,94.79682 L531.633345,87.73332 L533.827185,87.73332 L533.827185,94.81344 Z M538.128393,99.6 L538.128393,87.73332 L540.338853,87.73332 L540.338853,97.8549 L546.455013,97.8549 L546.455013,99.6 L538.128393,99.6 Z M552.052581,99.6 L552.052581,89.47842 L547.797861,89.47842 L547.797861,87.73332 L558.517761,87.73332 L558.517761,89.47842 L554.246421,89.47842 L554.246421,99.6 L552.052581,99.6 Z M572.242509,94.81344 C572.242509,98.05434 570.381069,99.79944 567.173409,99.79944 C563.982369,99.79944 562.104309,98.05434 562.104309,94.7802 L562.104309,87.73332 L564.314769,87.73332 L564.314769,94.79682 C564.314769,96.87432 565.262109,98.03772 567.173409,98.03772 C569.084709,98.03772 570.048669,96.87432 570.048669,94.79682 L570.048669,87.73332 L572.242509,87.73332 L572.242509,94.81344 Z M578.704317,99.6 L576.543717,99.6 L576.543717,87.73332 L581.629437,87.73332 C584.404977,87.73332 586.033737,89.02968 586.033737,91.4562 C586.033737,93.30102 584.853717,94.39794 583.507497,94.83006 L586.482477,99.6 L584.072577,99.6 L581.363517,95.16246 L578.704317,95.16246 L578.704317,99.6 Z M578.704317,93.43398 L581.380137,93.43398 C583.025517,93.43398 583.856517,92.75256 583.856517,91.4562 C583.856517,90.15984 583.025517,89.47842 581.380137,89.47842 L578.704317,89.47842 L578.704317,93.43398 Z M598.678185,99.6 L590.085645,99.6 L590.085645,87.73332 L598.611705,87.73332 L598.611705,89.47842 L592.246245,89.47842 L592.246245,92.7858 L597.880425,92.7858 L597.880425,94.5309 L592.246245,94.5309 L592.246245,97.8549 L598.678185,97.8549 L598.678185,99.6 Z"
          id="CRITICALPERSPECTIVESONARTS,POLITICS,ANDCULTURE"
          fill="#000000"
          fillRule="nonzero"
        ></path>
      </g>
    </g>
  </svg>
)

const Header = (props: HeaderProps) => {
  const { special_issue, issue_number, title } = props
  const logo =
    special_issue && special_issue !== null ? (
      <Image
        priority
        src={`https://brooklynrail.org/images/brooklynrail-logo-ex-issue-${issue_number}.svg`}
        height="68"
        width="396"
        alt="The Brooklyn Rail"
        title="Brooklyn Rail Homepage"
      />
    ) : (
      oldLogo
    )
  return (
    <div id="header_section">
      <div className="logo">
        <div id="textflag">
          <h1>The Brooklyn Rail </h1>
          <h2>Critical Perspectives on Art, Politics and Culture</h2>
          {title && <h3>{title}</h3>}
        </div>
        <Link href="/">{logo}</Link>
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
