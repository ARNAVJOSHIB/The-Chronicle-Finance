'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary caught:", error)
  }, [error])

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-ivory">
      <div className="max-w-2xl w-full editorial-panel border-black p-12 md:p-16 text-center">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] font-inter text-red-700 mb-6">
          System Interruption
        </h2>
        
        <h1 className="text-4xl md:text-5xl font-black font-playfair text-foreground tracking-tight mb-8 leading-tight">
          An Unexpected Error Occurred
        </h1>
        
        <p className="text-sm text-dark-charcoal/80 font-ibm mb-10 leading-relaxed max-w-lg mx-auto">
          Our quantitative engine encountered a critical disruption. We apologize for the inconvenience. The details of this event have been securely logged.
        </p>

        <div className="bg-red-50 border border-red-900/30 p-4 mb-10 text-left">
          <p className="text-xs font-mono text-red-800 break-words">
            {error.message || "Unknown Application Error"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="editorial-button px-8 py-3 text-[11px] font-bold uppercase tracking-[0.1em] font-inter text-dark-charcoal"
          >
            Attempt Recovery
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 text-[11px] font-bold uppercase tracking-[0.1em] font-inter text-dark-charcoal/60 hover:text-dark-charcoal transition-colors border border-transparent hover:border-dark-charcoal/20"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  )
}
