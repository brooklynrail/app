"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { Redirects } from "../../../lib/types"

export async function AddRedirect(props: Redirects) {
  const { path, articles, events, type } = props
  let redirectPath = ""
  switch (type) {
    case "article":
      // path: /2024/10/art/robert-longo-with-amanda-gluibizzi/
      // Building the redirect path based on the current article data
      redirectPath = `/${articles.issue.year}/${articles.issue.month}/${articles.section.slug}/${articles.slug}`
      revalidatePath(redirectPath)
      redirect(redirectPath)
    case "event":
      // Building the redirect path based on the current article data
      const startDate = new Date(events.start_date)
      const year = startDate.getFullYear()
      const month = (startDate.getMonth() + 1).toString().padStart(2, "0")
      const day = startDate.getDate().toString().padStart(2, "0")
      redirectPath = `/event/${year}/${month}/${day}/${events.slug}`
      revalidatePath(redirectPath)
      redirect(redirectPath)
    default:
      return
  }
}
