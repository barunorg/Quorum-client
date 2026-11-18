export default function CheckIcon({ size = 15, stroke = 'var(--up)' }: { size?: number; stroke?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10l4 4 8-8" />
    </svg>
  )
}
