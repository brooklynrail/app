import { DirectusFiles } from "./types"

export type IssuesSelect = {
  id: string
  month: number
  slug: string
  special_issue: boolean | null
  status: string
  title: string
  year: number
  issue_number: number
}
