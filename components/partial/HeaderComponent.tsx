import Link from 'next/link'
import { LogoMark, MoonIcon, SunIcon } from '../icons'

export default function HeaderComponent() {
  return (
    <header className="sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-280 px-7 flex items-center gap-3 h-16">
        <Link href="#top" className="flex items-center gap-2.25 text-lg font-semibold tracking-[-0.01em]">
          <LogoMark /> Quorum
        </Link>
        <nav className="hidden md:flex gap-7 ml-9">
          {[
            ['#crew', 'Departments'],
            ['#how', 'How it works'],
            ['#control', 'Control'],
            ['#pricing', 'Pricing'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-ink-2 transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <button
            className="inline-flex items-center gap-2 rounded-[10px] px-4.5 py-2.5 text-sm font-medium border cursor-pointer transition-all duration-150 whitespace-nowrap btn-ghost text-ink-2"
            // onClick={toggleTheme}
            aria-label={true ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {true ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link
            className="items-center gap-2 rounded-[10px] px-4.5 py-2.5 text-sm font-medium border cursor-pointer transition-all duration-150 whitespace-nowrap btn-ghost text-ink-2 hidden sm:inline-flex"
            href="/sign-in?mode=login"
          >
            Log in
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-[10px] px-4.5 py-2.5 text-sm font-medium border cursor-pointer transition-all duration-150 whitespace-nowrap text-accent-ink hover:brightness-95"
            href="/sign-in"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
