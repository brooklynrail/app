import { useTheme } from "../theme"

const Subhead = () => {
  const { theme } = useTheme()
  const subheadFill = theme === "dark" ? "fill-slate-100" : "fill-slate-100 tablet-lg:fill-zinc-900"
  return (
    <svg className={subheadFill} viewBox="0 0 629 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.30177 7.14537C2.30177 10.3494 3.83177 12.4914 6.47777 12.4914C8.63777 12.4914 9.57377 11.2854 9.86177 9.84537H11.3738C10.9598 12.1854 9.28577 13.8054 6.47777 13.8054C3.16577 13.8054 0.717773 11.1954 0.717773 7.14537C0.717773 3.11337 3.16577 0.521362 6.47777 0.521362C9.28577 0.521362 10.9598 2.14136 11.3738 4.48136H9.86177C9.57377 3.04137 8.63777 1.83536 6.47777 1.83536C3.83177 1.83536 2.30177 3.94137 2.30177 7.14537ZM17.1616 13.5894H15.6316V0.737362H20.5816C23.4616 0.737362 25.0996 2.08736 25.0996 4.55336C25.0996 6.64137 23.6416 7.81137 22.1296 8.15337L25.6576 13.5894H23.9116L20.5816 8.38737H17.1616V13.5894ZM17.1616 7.09136H20.4916C22.4356 7.09136 23.5336 6.22737 23.5336 4.55336C23.5336 2.93337 22.4356 2.03337 20.4916 2.03337H17.1616V7.09136ZM29.8418 13.5894V0.737362H31.3898V13.5894H29.8418ZM40.3977 13.5894V2.03337H35.6097V0.737362H46.7517V2.03337H41.9457V13.5894H40.3977ZM50.9496 13.5894V0.737362H52.4976V13.5894H50.9496ZM58.4815 7.14537C58.4815 10.3494 60.0115 12.4914 62.6575 12.4914C64.8175 12.4914 65.7535 11.2854 66.0415 9.84537H67.5535C67.1395 12.1854 65.4655 13.8054 62.6575 13.8054C59.3455 13.8054 56.8975 11.1954 56.8975 7.14537C56.8975 3.11337 59.3455 0.521362 62.6575 0.521362C65.4655 0.521362 67.1395 2.14136 67.5535 4.48136H66.0415C65.7535 3.04137 64.8175 1.83536 62.6575 1.83536C60.0115 1.83536 58.4815 3.94137 58.4815 7.14537ZM80.921 13.5894L79.499 10.0074H73.343L71.921 13.5894H70.373L75.575 0.737362H77.321L82.541 13.5894H80.921ZM76.403 2.28537L73.847 8.72937H78.995L76.457 2.28537H76.403ZM86.3203 13.5894V0.737362H87.8683V12.2934H94.7803V13.5894H86.3203ZM109.772 8.42337H106.532V13.5894H105.002V0.737362H109.754C112.616 0.737362 114.272 2.05136 114.272 4.57136C114.272 7.10937 112.616 8.42337 109.772 8.42337ZM106.532 7.12736H109.718C111.662 7.12736 112.724 6.31737 112.724 4.57136C112.724 2.82536 111.662 2.03337 109.718 2.03337H106.532V7.12736ZM127.221 13.5894H118.527V0.737362H127.203V2.03337H120.057V6.51537H126.411V7.82937H120.057V12.2934H127.221V13.5894ZM133.406 13.5894H131.876V0.737362H136.826C139.706 0.737362 141.344 2.08736 141.344 4.55336C141.344 6.64137 139.886 7.81137 138.374 8.15337L141.902 13.5894H140.156L136.826 8.38737H133.406V13.5894ZM133.406 7.09136H136.736C138.68 7.09136 139.778 6.22737 139.778 4.55336C139.778 2.93337 138.68 2.03337 136.736 2.03337H133.406V7.09136ZM145.258 9.79137H146.752C146.95 11.8614 148.642 12.5634 150.55 12.5634C152.386 12.5634 153.736 11.6814 153.736 10.1334C153.736 9.05337 153.142 8.35137 151.396 8.02737L148.948 7.54137C147.22 7.21737 145.672 6.42536 145.672 4.21136C145.672 2.10537 147.49 0.521362 150.154 0.521362C152.908 0.521362 154.726 1.70936 154.978 4.03137H153.484C153.268 2.59137 152.008 1.76337 150.172 1.76337C148.3 1.76337 147.184 2.80736 147.184 4.15736C147.184 5.43537 147.904 5.88536 149.47 6.19137L151.99 6.71336C153.97 7.10937 155.23 8.02737 155.23 10.0614C155.23 12.2574 153.286 13.8054 150.568 13.8054C147.778 13.8054 145.438 12.5994 145.258 9.79137ZM164.468 8.42337H161.228V13.5894H159.698V0.737362H164.45C167.312 0.737362 168.968 2.05136 168.968 4.57136C168.968 7.10937 167.312 8.42337 164.468 8.42337ZM161.228 7.12736H164.414C166.358 7.12736 167.42 6.31737 167.42 4.57136C167.42 2.82536 166.358 2.03337 164.414 2.03337H161.228V7.12736ZM181.917 13.5894H173.223V0.737362H181.899V2.03337H174.753V6.51537H181.107V7.82937H174.753V12.2934H181.917V13.5894ZM187.382 7.14537C187.382 10.3494 188.912 12.4914 191.558 12.4914C193.718 12.4914 194.654 11.2854 194.942 9.84537H196.454C196.04 12.1854 194.366 13.8054 191.558 13.8054C188.246 13.8054 185.798 11.1954 185.798 7.14537C185.798 3.11337 188.246 0.521362 191.558 0.521362C194.366 0.521362 196.04 2.14136 196.454 4.48136H194.942C194.654 3.04137 193.718 1.83536 191.558 1.83536C188.912 1.83536 187.382 3.94137 187.382 7.14537ZM204.493 13.5894V2.03337H199.705V0.737362H210.847V2.03337H206.041V13.5894H204.493ZM215.045 13.5894V0.737362H216.593V13.5894H215.045ZM225.583 13.5894L220.399 0.737362H222.019L226.483 12.0054H226.519L230.983 0.737362H232.567L227.347 13.5894H225.583ZM245.04 13.5894H236.346V0.737362H245.022V2.03337H237.876V6.51537H244.23V7.82937H237.876V12.2934H245.04V13.5894ZM248.849 9.79137H250.343C250.541 11.8614 252.233 12.5634 254.141 12.5634C255.977 12.5634 257.327 11.6814 257.327 10.1334C257.327 9.05337 256.733 8.35137 254.987 8.02737L252.539 7.54137C250.811 7.21737 249.263 6.42536 249.263 4.21136C249.263 2.10537 251.081 0.521362 253.745 0.521362C256.499 0.521362 258.317 1.70936 258.569 4.03137H257.075C256.859 2.59137 255.599 1.76337 253.763 1.76337C251.891 1.76337 250.775 2.80736 250.775 4.15736C250.775 5.43537 251.495 5.88536 253.061 6.19137L255.581 6.71336C257.561 7.10937 258.821 8.02737 258.821 10.0614C258.821 12.2574 256.877 13.8054 254.159 13.8054C251.369 13.8054 249.029 12.5994 248.849 9.79137ZM279.918 7.16337C279.918 11.0334 277.632 13.8054 274.068 13.8054C270.504 13.8054 268.218 11.0334 268.218 7.16337C268.218 3.31136 270.504 0.521362 274.068 0.521362C277.632 0.521362 279.918 3.31136 279.918 7.16337ZM278.316 7.16337C278.316 4.06736 276.876 1.83536 274.068 1.83536C271.242 1.83536 269.802 4.06736 269.802 7.16337C269.802 10.2774 271.242 12.4914 274.068 12.4914C276.876 12.4914 278.316 10.2774 278.316 7.16337ZM286.2 0.737362L293.058 10.9974H293.094V0.737362H294.588V13.5894H293.148L285.84 2.62736H285.804V13.5894H284.292V0.737362H286.2ZM314.633 13.5894L313.211 10.0074H307.055L305.633 13.5894H304.085L309.287 0.737362H311.033L316.253 13.5894H314.633ZM310.115 2.28537L307.559 8.72937H312.707L310.169 2.28537H310.115ZM321.562 13.5894H320.032V0.737362H324.982C327.862 0.737362 329.5 2.08736 329.5 4.55336C329.5 6.64137 328.042 7.81137 326.53 8.15337L330.058 13.5894H328.312L324.982 8.38737H321.562V13.5894ZM321.562 7.09136H324.892C326.836 7.09136 327.934 6.22737 327.934 4.55336C327.934 2.93337 326.836 2.03337 324.892 2.03337H321.562V7.09136ZM337.883 13.5894V2.03337H333.095V0.737362H344.237V2.03337H339.431V13.5894H337.883ZM347.167 9.79137H348.661C348.859 11.8614 350.551 12.5634 352.459 12.5634C354.295 12.5634 355.645 11.6814 355.645 10.1334C355.645 9.05337 355.051 8.35137 353.305 8.02737L350.857 7.54137C349.129 7.21737 347.581 6.42536 347.581 4.21136C347.581 2.10537 349.399 0.521362 352.063 0.521362C354.817 0.521362 356.635 1.70936 356.887 4.03137H355.393C355.177 2.59137 353.917 1.76337 352.081 1.76337C350.209 1.76337 349.093 2.80736 349.093 4.15736C349.093 5.43537 349.813 5.88536 351.379 6.19137L353.899 6.71336C355.879 7.10937 357.139 8.02737 357.139 10.0614C357.139 12.2574 355.195 13.8054 352.477 13.8054C349.687 13.8054 347.347 12.5994 347.167 9.79137ZM361.522 13.5714V11.6274H363.484V13.8954C363.484 15.3894 362.584 16.4154 360.946 16.4154V15.4974C361.864 15.4974 362.386 15.0834 362.386 13.8954V13.5714H361.522ZM379.206 8.42337H375.966V13.5894H374.436V0.737362H379.188C382.05 0.737362 383.706 2.05136 383.706 4.57136C383.706 7.10937 382.05 8.42337 379.206 8.42337ZM375.966 7.12736H379.152C381.096 7.12736 382.158 6.31737 382.158 4.57136C382.158 2.82536 381.096 2.03337 379.152 2.03337H375.966V7.12736ZM398.922 7.16337C398.922 11.0334 396.636 13.8054 393.072 13.8054C389.508 13.8054 387.222 11.0334 387.222 7.16337C387.222 3.31136 389.508 0.521362 393.072 0.521362C396.636 0.521362 398.922 3.31136 398.922 7.16337ZM397.32 7.16337C397.32 4.06736 395.88 1.83536 393.072 1.83536C390.246 1.83536 388.806 4.06736 388.806 7.16337C388.806 10.2774 390.246 12.4914 393.072 12.4914C395.88 12.4914 397.32 10.2774 397.32 7.16337ZM403.296 13.5894V0.737362H404.844V12.2934H411.756V13.5894H403.296ZM416.276 13.5894V0.737362H417.824V13.5894H416.276ZM426.832 13.5894V2.03337H422.044V0.737362H433.186V2.03337H428.38V13.5894H426.832ZM437.384 13.5894V0.737362H438.932V13.5894H437.384ZM444.915 7.14537C444.915 10.3494 446.445 12.4914 449.091 12.4914C451.251 12.4914 452.187 11.2854 452.475 9.84537H453.987C453.573 12.1854 451.899 13.8054 449.091 13.8054C445.779 13.8054 443.331 11.1954 443.331 7.14537C443.331 3.11337 445.779 0.521362 449.091 0.521362C451.899 0.521362 453.573 2.14136 453.987 4.48136H452.475C452.187 3.04137 451.251 1.83536 449.091 1.83536C446.445 1.83536 444.915 3.94137 444.915 7.14537ZM457.417 9.79137H458.911C459.109 11.8614 460.801 12.5634 462.709 12.5634C464.545 12.5634 465.895 11.6814 465.895 10.1334C465.895 9.05337 465.301 8.35137 463.555 8.02737L461.107 7.54137C459.379 7.21737 457.831 6.42536 457.831 4.21136C457.831 2.10537 459.649 0.521362 462.313 0.521362C465.067 0.521362 466.885 1.70936 467.137 4.03137H465.643C465.427 2.59137 464.167 1.76337 462.331 1.76337C460.459 1.76337 459.343 2.80736 459.343 4.15736C459.343 5.43537 460.063 5.88536 461.629 6.19137L464.149 6.71336C466.129 7.10937 467.389 8.02737 467.389 10.0614C467.389 12.2574 465.445 13.8054 462.727 13.8054C459.937 13.8054 457.597 12.5994 457.417 9.79137ZM471.772 13.5714V11.6274H473.734V13.8954C473.734 15.3894 472.834 16.4154 471.196 16.4154V15.4974C472.114 15.4974 472.636 15.0834 472.636 13.8954V13.5714H471.772ZM493.866 13.5894L492.444 10.0074H486.288L484.866 13.5894H483.318L488.52 0.737362H490.266L495.486 13.5894H493.866ZM489.348 2.28537L486.792 8.72937H491.94L489.402 2.28537H489.348ZM501.174 0.737362L508.032 10.9974H508.068V0.737362H509.562V13.5894H508.122L500.814 2.62736H500.778V13.5894H499.266V0.737362H501.174ZM519.278 0.737362C523.004 0.737362 525.542 3.31136 525.542 7.16337C525.542 11.0334 523.004 13.5894 519.278 13.5894H514.724V0.737362H519.278ZM519.278 2.03337H516.254V12.2934H519.278C522.266 12.2934 523.94 10.2774 523.94 7.16337C523.94 4.06736 522.266 2.03337 519.278 2.03337ZM536.431 7.14537C536.431 10.3494 537.961 12.4914 540.607 12.4914C542.767 12.4914 543.703 11.2854 543.991 9.84537H545.503C545.089 12.1854 543.415 13.8054 540.607 13.8054C537.295 13.8054 534.847 11.1954 534.847 7.14537C534.847 3.11337 537.295 0.521362 540.607 0.521362C543.415 0.521362 545.089 2.14136 545.503 4.48136H543.991C543.703 3.04137 542.767 1.83536 540.607 1.83536C537.961 1.83536 536.431 3.94137 536.431 7.14537ZM559.967 8.35137C559.967 11.8614 558.077 13.8054 554.765 13.8054C551.489 13.8054 549.563 11.8614 549.563 8.31537V0.737362H551.111V8.44137C551.111 11.1774 552.515 12.4914 554.765 12.4914C557.033 12.4914 558.419 11.1774 558.419 8.44137V0.737362H559.967V8.35137ZM564.937 13.5894V0.737362H566.485V12.2934H573.397V13.5894H564.937ZM579.818 13.5894V2.03337H575.03V0.737362H586.172V2.03337H581.366V13.5894H579.818ZM600.576 8.35137C600.576 11.8614 598.686 13.8054 595.374 13.8054C592.098 13.8054 590.172 11.8614 590.172 8.31537V0.737362H591.72V8.44137C591.72 11.1774 593.124 12.4914 595.374 12.4914C597.642 12.4914 599.028 11.1774 599.028 8.44137V0.737362H600.576V8.35137ZM607.076 13.5894H605.546V0.737362H610.496C613.376 0.737362 615.014 2.08736 615.014 4.55336C615.014 6.64137 613.556 7.81137 612.044 8.15337L615.572 13.5894H613.826L610.496 8.38737H607.076V13.5894ZM607.076 7.09136H610.406C612.35 7.09136 613.448 6.22737 613.448 4.55336C613.448 2.93337 612.35 2.03337 610.406 2.03337H607.076V7.09136ZM628.451 13.5894H619.757V0.737362H628.433V2.03337H621.287V6.51537H627.641V7.82937H621.287V12.2934H628.451V13.5894Z" />
    </svg>
  )
}

export default Subhead
