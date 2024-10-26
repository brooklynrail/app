import { algoliasearch } from "algoliasearch" // Main client import

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!

const searchClient = algoliasearch(appId, apiKey)

export const customSearchClient = {
  search(requests: any) {
    // You can replace `any` with specific types as needed
    return searchClient.search(requests)
  },
  searchForFacetValues(requests: any) {
    return searchClient.searchForFacetValues(requests)
  },
}
