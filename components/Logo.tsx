/** Karthikeyan's mark: three inputs feeding one node, a tiny network. */
export function Mark({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6.5" fill="var(--lime)" />
      <g stroke="var(--lime-ink)" strokeWidth="1.7" strokeLinecap="round" fill="none">
        <path d="M7 6.5 L16.5 12" />
        <path d="M7 12 L16.5 12" />
        <path d="M7 17.5 L16.5 12" />
      </g>
      <g fill="var(--lime-ink)">
        <circle cx="7" cy="6.5" r="1.9" />
        <circle cx="7" cy="12" r="1.9" />
        <circle cx="7" cy="17.5" r="1.9" />
        <circle cx="16.8" cy="12" r="2.9" />
      </g>
    </svg>
  );
}

/** The big version, used in the lime statement and the footer card. */
export function MarkTile({ className = '' }: { className?: string }) {
  return (
    <div className={`mark-tile ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="46" height="46">
        <g stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M5 5 L18 12" />
          <path d="M5 12 L18 12" />
          <path d="M5 19 L18 12" />
        </g>
        <g fill="var(--lime)">
          <circle cx="5" cy="5" r="1.9" />
          <circle cx="5" cy="12" r="1.9" />
          <circle cx="5" cy="19" r="1.9" />
          <circle cx="18.3" cy="12" r="3.1" />
        </g>
      </svg>
    </div>
  );
}
