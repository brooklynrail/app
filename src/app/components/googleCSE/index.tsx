"use client"

import { useEffect } from "react"

const GoogleCSE = () => {
  useEffect(() => {
    // Create a script element
    const cx = "007271450232968356366:kkalbsbmc5s"
    const gcseScript = document.createElement("script")
    gcseScript.type = "text/javascript"
    gcseScript.async = true
    gcseScript.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//cse.google.com/cse.js?cx=" + cx

    // Append the script to the document
    const s = document.getElementsByTagName("script")[0]
    s.parentNode && s.parentNode.insertBefore(gcseScript, s)

    // Cleanup the script when the component is unmounted
    return () => {
      if (gcseScript.parentNode) {
        gcseScript.parentNode.removeChild(gcseScript)
      }
    }
  }, []) // Empty dependency array means this effect only runs once after the component mounts

  return (
    <div className="googleSearch">
      {/* The gcse:search element must be present in the DOM for the CSE to render */}
      <div className="gcse-search"></div>
    </div>
  )
}

export default GoogleCSE
