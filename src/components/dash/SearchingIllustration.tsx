export default function SearchingIllustration({ className = "h-64 w-64" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 340"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Backdrop */}
      <ellipse cx="200" cy="175" rx="190" ry="150" fill="#F1F0FB" />

      {/* Question bubble */}
      <g>
        <path
          d="M60 150c0-22 18-40 40-40s40 18 40 30-18 22-32 24l-4 18-14-14c-19-3-30-13-30-18Z"
          fill="#DCE6F7"
        />
        <text x="90" y="150" fontSize="28" fontWeight="700" fill="#7C8CB0" textAnchor="middle">
          ?
        </text>
      </g>

      {/* Plant leaves behind the folder */}
      <g stroke="#4C8C5B" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M215 205c0-45 10-70 28-92" />
        <path d="M243 113c-4 10-16 14-26 12" />
        <path d="M243 113c6 9 4 22-4 30" />
        <path d="M226 150c-10 2-20-4-24-13" />
        <path d="M226 150c8 4 12 15 9 24" />
      </g>

      {/* Folder back tab */}
      <path
        d="M150 150h100l18 18h100v130a10 10 0 0 1-10 10H160a10 10 0 0 1-10-10V150Z"
        fill="#2B2F55"
      />
      {/* Folder front */}
      <path
        d="M132 178h236a10 10 0 0 1 10 10v118a10 10 0 0 1-10 10H132a10 10 0 0 1-10-10V188a10 10 0 0 1 10-10Z"
        fill="#6C7BE0"
      />
      <rect x="205" y="222" width="90" height="8" rx="4" fill="#525FC4" />
      <circle cx="250" cy="266" r="22" fill="none" stroke="#525FC4" strokeWidth="4" />
      <path d="M238 266l8 8 16-16" stroke="#525FC4" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Person */}
      <g>
        {/* hair bun */}
        <circle cx="330" cy="118" r="9" fill="#231F20" />
        {/* head */}
        <circle cx="333" cy="140" r="19" fill="#231F20" />
        <path d="M320 140a13 13 0 0 1 26 0v6a13 13 0 0 1-26 0Z" fill="#F2C29A" />
        {/* ear */}
        <circle cx="320" cy="146" r="3" fill="#F2C29A" />
        {/* sweater / torso */}
        <path
          d="M300 168c8-10 20-16 33-16s25 6 33 16l14 55c2 9-4 17-13 17h-8l-6 60h-42l-6-60h-8c-9 0-15-8-13-17Z"
          fill="#8FB89B"
        />
        {/* collar */}
        <path d="M320 158l13 14 13-14" fill="none" stroke="#F4F1EA" strokeWidth="6" strokeLinecap="round" />
        {/* extended arm holding magnifier */}
        <path
          d="M300 190c-20 6-38 20-50 38"
          fill="none"
          stroke="#8FB89B"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <circle cx="246" cy="232" r="9" fill="#F2C29A" />
        {/* other arm */}
        <path
          d="M366 190c10 8 16 20 16 33"
          fill="none"
          stroke="#8FB89B"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <circle cx="382" cy="226" r="9" fill="#F2C29A" />
        {/* legs */}
        <path d="M318 298l-10 78" stroke="#1C1C1C" strokeWidth="18" strokeLinecap="round" />
        <path d="M348 298l14 78" stroke="#1C1C1C" strokeWidth="18" strokeLinecap="round" />
        {/* shoes */}
        <ellipse cx="304" cy="380" rx="14" ry="7" fill="#1C1C1C" />
        <ellipse cx="366" cy="380" rx="14" ry="7" fill="#1C1C1C" />
      </g>

      {/* Magnifying glass */}
      <g>
        <circle cx="222" cy="210" r="26" fill="none" stroke="#3B4CC0" strokeWidth="7" />
        <line x1="241" y1="229" x2="256" y2="244" stroke="#3B4CC0" strokeWidth="9" strokeLinecap="round" />
      </g>
    </svg>
  );
}
