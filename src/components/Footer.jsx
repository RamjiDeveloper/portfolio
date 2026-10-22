const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: (
      <path d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4v11.5H3V9.75zm7 0h3.83v1.57h.05c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.13v5.87h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.25-3.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: (
      <path d="M21.6 7.2a2.5 2.5 0 00-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 002.4 7.2C2 8.78 2 12 2 12s0 3.22.4 4.8a2.5 2.5 0 001.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 001.76-1.77c.4-1.58.4-4.8.4-4.8s0-3.22-.4-4.8zM10 15V9l5.2 3L10 15z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:you@example.com",
    stroke: true,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </>
    ),
  },
];

export default function Footer({
  name = "Ram Ji",
  socials = SOCIALS,
  tagline = ["Build", "Learn", "Grow"],
}) {
  return (
    <footer className="relative border-t border-blue-900/50 bg-[#050a1f]">
      {/* soft glow line at the bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-5 text-xs text-slate-300 md:flex-row md:justify-between">
        {/* copyright */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} . All rights reserved by {name}.
        </p>

        {/* socials + tagline */}
        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-4">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="block text-white transition duration-200 hover:-translate-y-0.5 hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px]"
                    fill={s.stroke ? "none" : "currentColor"}
                    stroke={s.stroke ? "currentColor" : "none"}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* vertical divider */}
          <span className="hidden h-4 w-px bg-sky-500/50 sm:block" aria-hidden="true" />

          <p className="hidden items-center gap-2 text-[11px] text-slate-300 sm:flex">
            {tagline.map((word, i) => (
              <span key={word} className="flex items-center gap-2">
                {word}
                {i < tagline.length - 1 && <span className="text-slate-500">•</span>}
              </span>
            ))}
            <svg
              viewBox="0 0 24 24"
              className="footer-heart h-4 w-4 text-red-500"
              fill="currentColor"
              aria-label="love"
            >
              <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2 0 3.4 1.1 4.2 2.4h2.8c.8-1.3 2.2-2.4 4.2-2.4 3.7 0 5.5 3.9 4 7.3C19.500 16.400 12 21 12 21z" />
            </svg>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes footer-heart { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }
        .footer-heart { animation: footer-heart 1.6s ease-in-out infinite; filter: drop-shadow(0 0 4px rgba(239,68,68,.7)); }
        @media (prefers-reduced-motion: reduce) { .footer-heart { animation: none; } }
      `}</style>
    </footer>
  );
}