export default function CheckIcon({ stroke = 'var(--up)' }: { stroke?: string }) {
  return (
    <svg
      width="15"
      height="15"
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
