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
  async headers() {
    return [
      {
        // Preview route
        source: "/preview",
        headers: [
          {
            key: "Permissions-Policy",
            value: "clipboard-read=(self), clipboard-write=(self)", // Set your desired permissions policy here
          },
        ],
      },
      {
        // Preview route
        source: "/api/preview",
        headers: [
          {
            key: "Permissions-Policy",
            value: "clipboard-read=(self), clipboard-write=(self)", // Set your desired permissions policy here
          },
        ],
      },
    ]
  },
}
