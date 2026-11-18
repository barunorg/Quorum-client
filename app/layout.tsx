import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import TanStackQueryClientProvider from '@/providers/TanStackQueryClientProvider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

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
    <html lang="en" className={cn('h-full', 'antialiased', 'font-sans', inter.variable)}>
      <body className="min-h-full flex flex-col">
        <TanStackQueryClientProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </TanStackQueryClientProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
