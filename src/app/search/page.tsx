import { Issues } from "../../../lib/types"
import { getAllIssues, getPermalink, PageType } from "../../../lib/utils"
import SearchPage from "../components/search"

export default async function Search() {
  const data = await getData()

  if (!data.issues || !data.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <SearchPage />
}

async function getData() {
  const data: Issues[] | undefined = await getAllIssues()

  if (!data) {
    return { errorCode: 500, errorMessage: "There is no current issue set" }
  }
  const permalink = getPermalink({
    type: PageType.Search,
  })

  return {
    issues: data,
    permalink,
  }
}
