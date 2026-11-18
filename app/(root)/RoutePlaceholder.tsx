export function RoutePlaceholder({ title }: { title: string }) {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted-foreground">This section is coming soon.</p>
    </main>
  )
}
