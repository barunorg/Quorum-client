'use client'

export default function FinanceError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong while loading finance.</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
