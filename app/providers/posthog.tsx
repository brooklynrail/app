// app/providers.js
"use client"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { ReactNode, Suspense, useEffect } from "react"

export function RailPostHogProvider({ children }: { children: ReactNode }) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

  if (!posthogKey || !posthogHost) {
    return <>{children}</>
  }

  useEffect(() => {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      // autocapture: false,
      person_profiles: "identified_only",
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      persistence: "localStorage", // or 'cookie' if you prefer
      capture_pageleave: false, // Enable pageleave capture
    })
  }, [])

  return (
    <Suspense fallback={null}>
      <PostHogProvider client={posthog}>{children}</PostHogProvider>
    </Suspense>
  )
}
