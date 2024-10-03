import { readItems } from "@directus/sdk"
import directus from "../directus"
import { cache } from "react"
import { Articles, People } from "../types"

export enum RevalidateType {
  Article = "article",
  Section = "section",
  Issue = "issue",
  Tribute = "tribute",
}

export const getRevalidateData = cache(async (id: string, type: RevalidateType) => {
  switch (type) {
    case RevalidateType.Article:
      const response = await fetch(`/api/article/id/${id}`)
      if (!response.ok) throw new Error("Failed to fetch article")
      const data: Articles = await response.json()
      // const data = await directus.request(
      //   readItems("articles", {
      //     fields: ["*"],
      //   }),
      // )
      // return data as Articles[]
      console.log("Util articleData: ", data)
      return data
    default:
      return null
  }
})
