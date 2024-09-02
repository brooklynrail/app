"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { Redirects } from "../../../lib/types"

export async function AddRedirect(props: Redirects) {
  const { path, articles } = props
  const { slug, issue, section } = articles

  // path: /special/River_Rail_Colby/river-rail/Why-Occupy-Colby-Now/
  // article: "Why-Occupy-Colby"

  let redirectPath = ""
  // if the first part of the path is /special, then we know it's a special issue
  if (path.includes("/special/")) {
    // const issueSlug = path.split("/")[2]
    // const sectionSlug = path.split("/")[3]
    // const articleSlug = path.split("/")[4]
    redirectPath = `/special/${issue.slug}/${section.slug}/${slug}`
  } else {
    redirectPath = `/${issue.year}/${issue.month}/${section.slug}/${slug}`
  }
  revalidatePath(redirectPath) // Update cached special issue
  redirect(redirectPath) // Navigate to the new article page
}
