"use server"

import { Redirects } from "@/lib/types"
import { redirect } from "next/navigation"

export async function AddRedirect(props: Redirects) {
  const { articles, events, contributors, issues, type } = props
  let redirectPath = ""

  switch (type) {
    case "article": {
      if (!articles || typeof articles === "string") {
        throw new Error("Article data is required for article redirects")
      }
      const articleMonth = articles.issue.month.toString().padStart(2, "0")
      redirectPath = `/${articles.issue.year}/${articleMonth}/${articles.section.slug}/${articles.slug}`
      redirect(redirectPath)
      break
    }
    case "event": {
      if (!events || typeof events === "string") {
        throw new Error("Event data is required for event redirects")
      }
      const startDate = new Date(events.start_date)
      const year = startDate.getFullYear()
      const month = (startDate.getMonth() + 1).toString().padStart(2, "0")
      const day = startDate.getDate().toString().padStart(2, "0")
      redirectPath = `/event/${year}/${month}/${day}/${events.slug}`
      redirect(redirectPath)
      break
    }
    case "contributor": {
      if (!contributors || typeof contributors === "string") {
        throw new Error("Contributor data is required for contributor redirects")
      }
      redirectPath = `/contributor/${contributors.slug}`
      redirect(redirectPath)
      break
    }
    case "issue": {
      if (!issues || typeof issues === "string") {
        throw new Error("Issue data is required for issue redirects")
      }
      redirectPath = `/issues/${issues.slug}`
      redirect(redirectPath)
      break
    }
    default:
      return
  }
}
