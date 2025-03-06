import { Issues, Sections } from "./types"
import { Articles, Homepage } from "./types"

export interface ArticleProps {
  navData: Homepage
  articleData: Articles
  thisIssueData: Issues
  currentSection: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
}
