import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quorum',
  description:
    "A quorum is the minimum group needed to make a decision. For a product that's a team of agents that make decisions with your approval, that's a genuinely clever fit",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
