"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Redirects } from "@/lib/types"

export async function AddRedirect(props: Redirects) {
  const { articles, events, contributors, type } = props
  let redirectPath = ""
  switch (type) {
    case "article":
      if (!articles || typeof articles === "string") {
        throw new Error("Article data is required for article redirects")
      }
      const articleMonth = articles.issue.month.toString().padStart(2, "0")
      redirectPath = `/${articles.issue.year}/${articleMonth}/${articles.section.slug}/${articles.slug}`
      revalidatePath(redirectPath)
      redirect(redirectPath)
    case "event":
      if (!events || typeof events === "string") {
        throw new Error("Event data is required for event redirects")
      }
      const startDate = new Date(events.start_date)
      const year = startDate.getFullYear()
      const month = (startDate.getMonth() + 1).toString().padStart(2, "0")
      const day = startDate.getDate().toString().padStart(2, "0")
      redirectPath = `/event/${year}/${month}/${day}/${events.slug}`
      revalidatePath(redirectPath)
      redirect(redirectPath)
    case "contributor":
      if (!contributors || typeof contributors === "string") {
        throw new Error("Contributor data is required for contributor redirects")
      }
      redirectPath = `/contributor/${contributors.slug}`
      revalidatePath(redirectPath)
      redirect(redirectPath)
    default:
      return
  }
}
