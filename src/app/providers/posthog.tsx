// app/providers.js
"use client"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

import { ReactNode } from "react"

export function CSPostHogProvider({ children }: { children: ReactNode }) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

  if (!posthogKey || !posthogHost) {
    return <>{children}</>
  }

  if (typeof window !== "undefined") {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: "always", // or 'always' to create profiles for anonymous users as well
      persistence: "localStorage", // or 'cookie' if you prefer
    })
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
