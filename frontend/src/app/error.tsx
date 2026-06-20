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
    console.error("Global Error Boundary caught:", error)
  }, [error])

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-paper">
      <div className="max-w-2xl w-full editorial-panel p-12 md:p-16 text-center">
        <p className="text-[9px] font-label tracking-[0.25em] uppercase font-medium mb-6" style={{ color: 'var(--data-red)' }}>
          System Interruption
        </p>
        
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight mb-8 leading-tight">
          An Unexpected Error Occurred
        </h1>
        
        <p className="font-body text-sm text-ink-soft mb-10 leading-relaxed max-w-lg mx-auto">
          Our quantitative engine encountered a critical disruption. We apologize for the inconvenience. The details of this event have been securely logged.
        </p>

        <div className="border border-rule p-4 mb-10 text-left bg-paper">
          <p className="font-mono text-xs break-words" style={{ color: 'var(--data-red)' }}>
            {error.message || "Unknown Application Error"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="editorial-button px-8 py-3"
          >
            Attempt Recovery
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 font-label text-[10px] tracking-[0.1em] text-ink-soft hover:text-ink transition-colors border border-transparent hover:border-rule uppercase font-medium"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  )
}
