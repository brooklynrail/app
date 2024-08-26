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
  // Redirects
  async redirects() {
    return [
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
        permanent: false,
      },
      {
        source: "/search",
        destination: "/",
        permanent: false,
      },
      {
        source: "/admin",
        destination: "/",
        permanent: false,
      },
    ]
  },
}
