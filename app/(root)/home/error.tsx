'use client'

export default function HomeError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong while loading your home page.</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
