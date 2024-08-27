const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  staticPageGenerationTimeout: 1000,
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  images: {
    domains: ["localhost", "studio.brooklynrail.org", "brooklynrail.org", "storage.googleapis.com"],
  },
  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Redirects
  async redirects() {
    return [
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
      // The RSS feed will be coming back soon!
      {
        source: "/rss",
        destination: "/",
        permanent: false,
      },
      // Search is coming back shortly!
      {
        source: "/search",
        destination: "/",
        permanent: false,
      },
      // {
      //   source: "/article_image/image/:id/:filename",
      //   destination:
      //     "https://storage.googleapis.com/rail-legacy-media/production/content/article_image/image/:id/:filename",
      //   permanent: false,
      // },
    ]
  },
}
