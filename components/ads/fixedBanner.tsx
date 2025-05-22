const fetchAds = async () => {
  try {
    const adsResponse = await fetch(`/api/ads/?type=${AdTypes.FixedBanner}&t=${Date.now()}`)
    if (!adsResponse.ok) {
      throw new Error("Failed to fetch ads")
    }
    const adsData = await adsResponse.json()
    setAds(adsData)
  } catch (error) {
    console.error("Error fetching ads:", error)
  }
}
