'use client'

export default function MarketingError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong while loading marketing.</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
