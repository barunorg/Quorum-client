'use client'

export default function HiringError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong while loading hiring.</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
