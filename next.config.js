const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "brooklynrail.org",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "studio.brooklynrail.org",
        port: "",
        pathname: "/assets/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
        search: "",
      },
    ],
  },
  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; media-src 'self' https:; object-src 'none'; frame-ancestors 'self' https://brooklynrail.org https://*.brooklynrail.org;",
          },
        ],
      },
      {
        // API routes should use Next.js's built-in caching
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store",
          },
        ],
      },
      {
        // All other routes (pages)
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
    ]
  },
  // Redirects
  async redirects() {
    return [
      // ===================================
      // EVENTS REDIRECTS
      // redirect old event paths to new event paths
      {
        source: "/events/:year/:month/:day/:slug", // Match old event URLs
        destination: "/event/:year/:month/:day/:slug", // Redirect to new singular "event" path
        permanent: true, // Use 301 redirect for SEO
      },
      {
        source: "/event", // Match root `/event` path
        destination: "/events", // Redirect to `/events`
        permanent: true,
      },
      // ===================================
      // TRIBUTES REDIRECT
      // Redirect the root Tributes page to the homepage for now
      {
        source: "/tribute",
        destination: "/",
        permanent: false,
      },
      // ===================================
      // ISSUES REDIRECT

      // Redirect old Table of Contents path to the issue path
      // /issues/2024-11/table-of-contents/
      {
        source: "/issues/:issueSlug/table_of_contents/",
        destination: "/issues/:issueSlug/",
        permanent: true,
      },
      // Redirect /issue/ to /issues/
      {
        source: "/issue/:issueSlug/",
        destination: "/issues/:issueSlug/",
        permanent: false,
      },

      // Redirect old issue paths to new issue paths
      {
        source: "/:year(\\d{4})/:month(\\d{2})/",
        destination: "/issues/:year-:month",
        permanent: true,
      },
      // ISSUE/SECTION REDIRECT
      // Redirect old section paths to new section paths
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:sectionSlug",
        destination: "/issues/:year-:month/:sectionSlug",
        permanent: true,
      },
      // ISSUE/TOC REDIRECT
      {
        source: "/:year(\\d{4})/:month(\\d{2})/table_of_contents",
        destination: "/issues/:year-:month/table_of_contents",
        permanent: true,
      },
      // ===================================
      // SPECIAL ISSUE REDIRECTS
      // Redirect special issues to new path
      {
        source: "/special/:issueSlug/",
        destination: "/issues/:issueSlug/",
        permanent: true,
      },
      // SPECIAL ISSUE/SECTION REDIRECT
      // Redirect section pages for special issues
      {
        source: "/special/:issueSlug/:sectionSlug/",
        destination: "/issues/:issueSlug/:sectionSlug/",
        permanent: true,
      },
      // SPECIAL ISSUE/SECTION/ARTICLE REDIRECTS
      // Redirects for all articles in the special issue "River_Rail_Puerto_Rico"
      // 2021/08
      {
        source: "/special/River_Rail_Puerto_Rico/:sectionSlug/:articleSlug",
        destination: "/2021/08/:sectionSlug/:articleSlug",
        permanent: true,
      },
      // Redirects for all articles in the special issue "River_Rail_Colby"
      // 2019/10
      {
        source: "/special/River_Rail_Colby/:sectionSlug/:articleSlug",
        destination: "/2019/10/:sectionSlug/:articleSlug",
        permanent: true,
      },
      // Redirects for all articles in the special issue "River_Rail"
      // 2018/01
      {
        source: "/special/River_Rail/:sectionSlug/:articleSlug",
        destination: "/2018/01/:sectionSlug/:articleSlug",
        permanent: true,
      },
      // Redirects for all articles in the special issue "I_Love_John_Giorno"
      // 2017/07
      {
        source: "/special/I_Love_John_Giorno/:sectionSlug/:articleSlug",
        destination: "/2017/07/:sectionSlug/:articleSlug",
        permanent: true,
      },
      // Redirects for all articles in the special issue "Art_Crit_Europe"
      // 2014/05
      {
        source: "/special/Art_Crit_Europe/:sectionSlug/:articleSlug",
        destination: "/2014/05/:sectionSlug/:articleSlug",
        permanent: true,
      },
      // Redirects for all articles in the special issue "Ad_Reinhardt"
      // 2014/01
      {
        source: "/special/Ad_Reinhardt/:sectionSlug/:articleSlug",
        destination: "/2014/01/:sectionSlug/:articleSlug",
        permanent: true,
      },

      // ===================================
      // PAGES REDIRECTS
      {
        source: "/advertise",
        destination: "/about/advertise",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/about/contact-us",
        permanent: true,
      },
      {
        source: "/history",
        destination: "/about/history",
        permanent: true,
      },
      {
        source: "/notefrompub",
        destination: "/about/notefrompub",
        permanent: true,
      },
      {
        source: "/our-supporters",
        destination: "/about/our-supporters",
        permanent: true,
      },
      {
        source: "/staff",
        destination: "/about/staff",
        permanent: true,
      },
      {
        source: "/submissions",
        destination: "/about/submissions",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/about/terms-of-service",
        permanent: true,
      },
      {
        source: "/distributors",
        destination: "/about/where-to-find-us",
        permanent: true,
      },
      {
        source: "/where-to-find-us",
        destination: "/about/where-to-find-us",
        permanent: true,
      },

      // Redirect the old admin page to the homepage
      {
        source: "/admin",
        destination: "/",
        permanent: false,
      },
      // Convenience redirects
      {
        source: "/workflow(.*)",
        destination: "https://brooklynrail.netlify.app/workflow/",
        permanent: false,
      },
      {
        source: "/new-social-environment(.*)",
        destination: "https://us02web.zoom.us/j/87628835455?pwd=UjhGV1VKbXJsajRXajYrbUdBRnFFQT09",
        permanent: false,
      },
      {
        source: "/instagram(.*)",
        destination: "https://www.instagram.com/brooklynrail/",
        permanent: false,
      },
      {
        source: "/newsletter(.*)",
        destination: "https://mailchi.mp/brooklynrail/join/",
        permanent: false,
      },
      {
        source: "/mailing-list(.*)",
        destination: "https://mailchi.mp/brooklynrail/join/",
        permanent: false,
      },
      {
        source: "/support(.*)",
        destination: "https://brooklynrail.org/donate$1",
        permanent: false,
      },
      {
        source: "/donate(.*)",
        destination: "https://brooklynrail.org/donate$1",
        permanent: false,
      },
      {
        source: "/subscribe",
        destination: "https://shop.brooklynrail.org/products/subscription",
        permanent: false,
      },
      {
        source: "/raileditions",
        destination: "https://shop.brooklynrail.org",
        permanent: false,
      },
      {
        source: "/blacksquare",
        destination: "https://shop.brooklynrail.org",
        permanent: false,
      },
      {
        source: "/store",
        destination: "https://shop.brooklynrail.org",
        permanent: false,
      },
      {
        source: "/venice",
        destination: "https://venice.brooklynrail.org",
        permanent: false,
      },

      // Redirect the Hackers
      {
        source: "/admin/wp-login",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login",
        destination: "/",
        permanent: true,
      },
      {
        source: "/xmlrpc.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/am4n.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/:slug*",
        destination: "/",
        permanent: true,
      },
      // Article Redirects
      {
        source: "/open-letter-on-philip-guston-now",
        destination: "/projects/on-philip-guston-now/",
        permanent: false,
      },
      {
        source: "/2018/11/theater/Political-Fairy-Tales-The-Russian-and-the-Jew",
        destination: "/2018/12/theater/Political-Fairy-Tales-The-Russian-and-the-Jew",
        permanent: false,
      },
      {
        source: "/2018/11/theater/I-Shame-You-Because-I-Love-You-and-Other-Songs-Slanty-Eyed-Mamas-Zombie-Asian-Moms",
        destination:
          "/2018/12/theater/I-Shame-You-Because-I-Love-You-and-Other-Songs-Slanty-Eyed-Mamas-Zombie-Asian-Moms",
        permanent: false,
      },
      {
        source: "/2018/11/theater/IN-DIALOGUE-Toothy-Divinity-in-Jessica-Dickeys-The-Convent",
        destination: "/2018/12/theater/IN-DIALOGUE-Toothy-Divinity-in-Jessica-Dickeys-The-Convent",
        permanent: false,
      },
      {
        source: "/2018/12/artseen/Robert-Janitz-Uptown-Campus-College-Robert-Janitz",
        destination: "/2019/02/artseen/Robert-Janitz-Uptown-Campus-College-Robert-Janitz",
        permanent: false,
      },
      {
        source: "/2018/12/artseen/Maya-Lin-A-River-Is-a-Drawing",
        destination: "/2019/02/artseen/Maya-Lin-A-River-Is-a-Drawing",
        permanent: false,
      },
      {
        source: "/2018/12/artseen/EJ-Hauser-Barn-Spirits",
        destination: "/2019/02/artseen/EJ-Hauser-Barn-Spirits",
        permanent: false,
      },
      {
        source: "/2018/12/artseen/Caroline-Larsen-Kaleidoscopic-Matthew-Zefeldt-Customizable-Realities",
        destination: "/2019/02/artseen/Caroline-Larsen-Kaleidoscopic-Matthew-Zefeldt-Customizable-Realities",
        permanent: false,
      },
      {
        source: "/2018/12/artseen/Under-Erasure",
        destination: "/2019/02/artseen/Under-Erasure",
        permanent: false,
      },
      {
        source: "/2018/12/artseen/Lyle-Ashton-Harris-Flash-of-the-Spirit",
        destination: "/2019/02/artseen/Lyle-Ashton-Harris-Flash-of-the-Spirit",
        permanent: false,
      },
      {
        source: "/2018/12/artseen/Max-Neumann-Specter",
        destination: "/2018/12/artseen/Max-Neumann-Specter",
        permanent: false,
      },
      {
        source: "/2019/02/field-notes/The-Return-of-the-Yellow-Horde",
        destination: "/2019/02/field-notes/The-Class-Struggle-in-France",
        permanent: false,
      },
      {
        source: "/2019/05/artseen/Wendy-Red-Star-Accession",
        destination: "/2019/06/artseen/Wendy-Red-Star-Accession",
        permanent: false,
      },
      {
        source: "/2024/06/artseen/Willem-de-Kooning-and-Italy",
        destination: "/2024/07/artseen/Willem-de-Kooning-and-Italy",
        permanent: false,
      },
      {
        source: "/2024/06/artseen/Deborah-Buck-Witches-Bridges",
        destination: "/2024/07/artseen/Deborah-Buck-Witches-Bridges",
        permanent: false,
      },
      {
        source: "/2024/07/art/Davide-Ostrowski-with-Andrew-Woolbright",
        destination: "/2024/07/art/David-Ostrowski-with-Andrew-Woolbright",
        permanent: false,
      },
      {
        source: "/2024/07/special-report/This-Is-Not-a-Just-Image",
        destination: "/2024/07/dispatches/This-Is-Not-a-Just-Image",
        permanent: false,
      },
      {
        source: "/2024/07/special-report/Dispatch-on-the-political-conventions-2024",
        destination: "/2024/07/dispatches/Dispatch-on-the-political-conventions-2024",
        permanent: false,
      },
      {
        source: "/2024/07/special-report/",
        destination: "/2024/07/dispatches/",
        permanent: false,
      },
      {
        source: "/archives",
        destination: "/archive",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: false,
      },
      // The RSS feed will be coming back soon!
      {
        source: "/rss",
        destination: "/",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
