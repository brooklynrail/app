// app/providers.js
"use client"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { ReactNode, useEffect } from "react"

export function RailPostHogProvider({ children }: { children: ReactNode }) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

  if (!posthogKey || !posthogHost) {
    return <>{children}</>
  }

  useEffect(() => {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: "always",
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      persistence: "localStorage", // or 'cookie' if you prefer
      capture_pageleave: true, // Enable pageleave capture
    })
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
