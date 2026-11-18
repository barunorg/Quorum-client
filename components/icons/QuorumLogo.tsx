export default function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="text-accent">
      <g fill="currentColor">
        <circle cx="7" cy="7" r="2.6" />
        <circle cx="17" cy="7" r="2.6" />
        <circle cx="7" cy="17" r="2.6" />
        <circle cx="17" cy="17" r="2.6" />
      </g>
      <g stroke="currentColor" strokeWidth="1.1" opacity="0.55" fill="none">
        <line x1="7" y1="7" x2="17" y2="7" />
        <line x1="7" y1="7" x2="7" y2="17" />
        <line x1="17" y1="7" x2="17" y2="17" />
        <line x1="7" y1="17" x2="17" y2="17" />
        <line x1="7" y1="7" x2="17" y2="17" />
        <line x1="17" y1="7" x2="7" y2="17" />
      </g>
    </svg>
  )
}
