const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  images: {
    domains: ["localhost", "studio.brooklynrail.org", "brooklynrail.org", "storage.googleapis.com"],
  },
}
