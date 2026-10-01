/** Brand mark: a solid profile and its dotted digital mirror sharing one core. */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" className="logo">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7aa7ff" />
          <stop offset="1" stopColor="#8b7bff" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#0b1224" stroke="url(#logo-g)" strokeOpacity=".6" />
      <circle cx="11.5" cy="12" r="3.4" fill="#e8edf7" />
      <path d="M5.8 24.5c.8-3.8 3-5.7 5.7-5.7 1.6 0 2.9.6 3.9 1.8" fill="none" stroke="#e8edf7" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="20.5" cy="12" r="3.4" fill="none" stroke="url(#logo-g)" strokeWidth="1.5" strokeDasharray="2 1.6" />
      <path d="M16.6 20.6c1-1.2 2.3-1.8 3.9-1.8 2.7 0 4.9 1.9 5.7 5.7" fill="none" stroke="url(#logo-g)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2.2 1.8" />
      <circle cx="16" cy="16" r="1.6" fill="#7aa7ff" />
    </svg>
  );
}
