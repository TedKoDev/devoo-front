"use client"

import { useEffect, useRef } from "react"

interface GoogleAdBannerProps {
  format?: "horizontal" | "vertical" | "rectangle"
  className?: string
}

export default function GoogleAdBanner({ format = "horizontal", className = "" }: GoogleAdBannerProps) {
  const adContainerRef = useRef<HTMLDivElement>(null)

  // Determine dimensions based on format
  let width: string
  let height: string

  switch (format) {
    case "vertical":
      width = "160px"
      height = "600px"
      break
    case "rectangle":
      width = "300px"
      height = "250px"
      break
    case "horizontal":
    default:
      width = "728px"
      height = "90px"
      // For mobile, we'll adjust with CSS
      break
  }

  useEffect(() => {
    // This is a placeholder for Google AdSense code
    // In a real implementation, you would load the Google AdSense script
    // and initialize the ad with your publisher ID

    // Example of how the real implementation might look:
    /*
    const adScript = document.createElement('script')
    adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    adScript.async = true
    adScript.setAttribute('data-ad-client', 'YOUR-PUBLISHER-ID')
    document.head.appendChild(adScript)
    
    // Then initialize the ad
    if (window.adsbygoogle) {
      window.adsbygoogle.push({})
    }
    */

    // For now, we'll just add a placeholder
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = `
        <div style="background-color: #f0f0f0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 1px dashed #ccc; color: #666; font-size: 14px;">
          광고 영역 (${width} x ${height})
        </div>
      `
    }
  }, [width, height])

  return (
    <div
      ref={adContainerRef}
      className={`ad-container ${className}`}
      style={{
        width: "100%",
        maxWidth: width,
        height,
        margin: "0 auto",
        overflow: "hidden",
      }}
    />
  )
}
