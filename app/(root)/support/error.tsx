'use client'

export default function SupportError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong while loading support.</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
