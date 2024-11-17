import { parse } from "cookie"
import { NextApiRequest, NextApiResponse } from "next"
import { cookies } from "next/headers"

// Set Cookie
export const setCookie = (name: string, value: string, days: number, res?: NextApiResponse) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  const cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`

  if (res) {
    // Server-side: set cookie in response header
    res.setHeader("Set-Cookie", cookie)
  } else if (typeof window !== "undefined") {
    // Client-side: set cookie via document.cookie
    document.cookie = cookie
  } else {
    // Server-side: set cookie using next/headers
    cookies().set(name, value, { expires })
  }
}

// Get Cookie
export const getCookie = (name: string, req?: NextApiRequest): string | null => {
  if (req) {
    // Server-side: use req.headers.cookie
    const cookies = parse(req.headers.cookie || "")
    return cookies[name] || null
  } else if (typeof window !== "undefined") {
    // Client-side: use document.cookie
    const nameEQ = `${name}=`
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim()
      if (c.startsWith(nameEQ)) {
        return c.substring(nameEQ.length)
      }
    }
    return null
  } else {
    // Server-side: get cookie using next/headers
    const cookieStore = cookies()
    return cookieStore.get(name)?.value || null
  }
  return null
}
