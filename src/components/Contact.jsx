import React, { useEffect, useRef, useState } from "react";
import assets from "../assets/assets";

/**
 * Contact — "Get In Touch / Let's Work Together" section.
 * Matches the Hero / About / Skills / Projects dark-blue neon style.
 * React + Tailwind CSS v3. No other dependencies.
 *
 *   <Contact />
 *   <Contact
 *     email="you@gmail.com"
 *     phone="+91 98765 43210"
 *     location="Agra, Uttar Pradesh, India"
 *     endpoint="https://formspree.io/f/XXXXXXX"   // optional: where the form posts (JSON)
 *     socials={[{ label: "GitHub", href: "https://github.com/you", icon: "github" }]}
 *   />
 *
 * Form sending priority:  onSubmit(data)  ->  endpoint (fetch POST)  ->  mailto fallback.
 */

const FONTS =
  "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Outfit:wght@400;500;600;700;800&display=swap";

const handwriting = {
  fontFamily: "'Caveat', 'Segoe Print', cursive",
  color: "#13c7eb",
  textShadow: "0 0 12px rgba(56,170,255,.55), 0 0 2px rgba(120,210,255,.9)",
};

/* ---------- icons ---------- */
const Svg = ({ children, className = "h-5 w-5", strokeWidth = 2, style }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const I = {
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  pin: (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </>
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  subject: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 8h2" />
      <path d="M7 12h2" />
      <path d="M7 16h2" />
      <path d="M13 8h4" />
      <path d="M13 12h4" />
      <path d="M13 16h4" />
    </>
  ),
  send: (
    <>
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </>
  ),
  lock: (
    <>
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  copy: (
    <>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </>
  ),
  youtube: (
    <>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
};

/* ====================================================================
   DEFAULT CONTENT  (change via props)
   ==================================================================== */
const DEFAULT_SOCIALS = [
  { label: "GitHub", href: "#", icon: "github" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Email", href: "mailto:rameditor@example.com", icon: "mail" },
];

const DEFAULT_SUBJECTS = [
  "General Inquiry",
  "Project / Freelance Work",
  "Job Opportunity",
  "Collaboration",
  "Just Saying Hello",
];

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "", company: "" };
const MAX_MSG = 500;

/* ====================================================================
   SMALL HELPERS
   ==================================================================== */
function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

const d = (n) => ({ "--d": `${n * 90}ms` });

const seeded = (n) => {
  const x = Math.sin(n * 9301.7) * 10000;
  return x - Math.floor(x);
};
const STARS = Array.from({ length: 55 }, (_, i) => ({
  left: seeded(i + 1) * 100,
  top: seeded(i + 101) * 100,
  size: 1 + seeded(i + 201) * 2,
  dur: 2.6 + seeded(i + 301) * 4.5,
  delay: seeded(i + 401) * 6,
  glow: seeded(i + 501) > 0.72,
}));

function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 70% at 78% 50%, rgba(20,80,230,.22) 0%, transparent 70%), radial-gradient(35% 60% at 12% 90%, rgba(30,70,220,.25) 0%, transparent 70%), linear-gradient(180deg,#030a2e 0%,#020619 100%)",
        }}
      />
      {STARS.map((st, i) => (
        <span
          key={i}
          className="ct-star absolute rounded-full bg-white"
          style={{
            left: `${st.left}%`,
            top: `${st.top}%`,
            width: st.size,
            height: st.size,
            boxShadow: st.glow ? "0 0 6px 1px rgba(150,210,255,.75)" : "none",
            animationDuration: `${st.dur}s`,
            animationDelay: `${st.delay}s`,
          }}
        />
      ))}
      {/* bottom-left blob */}
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(30,100,255,.55),rgba(20,60,200,.15)_60%,transparent_72%)] blur-xl" />
      {/* bottom-right flowing lines */}
      <svg viewBox="0 0 520 200" className="absolute bottom-0 right-0 w-[min(520px,60%)] opacity-70" fill="none">
        {[0, 1, 2, 3].map((k) => (
          <path
            key={k}
            className="ct-wave"
            d={`M0 ${190 - k * 8} C 120 ${200 - k * 14}, 220 ${90 - k * 6}, 330 ${100 - k * 4} S 470 ${40 + k * 5}, 520 ${20 + k * 6}`}
            stroke={k % 2 ? "rgba(138,99,255,.55)" : "rgba(58,160,255,.6)"}
            strokeWidth="1.2"
            style={{ animationDelay: `${k * 0.6}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ====================================================================
   ILLUSTRATION  (developer + laptop, all inline SVG)
   ==================================================================== */
function ContactArt() {
  return (
    <svg viewBox="0 0 520 360" className="h-auto w-full" role="img" aria-label="Developer at a laptop">
      {/* <defs>
        <linearGradient id="ct-desk" x1="0" x2="1">
          <stop offset="0" stopColor="#1a3fe0" />
          <stop offset="1" stopColor="#2f8dff" />
        </linearGradient>
        <linearGradient id="ct-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f33b0" />
          <stop offset="1" stopColor="#0b1860" />
        </linearGradient>
      </defs> */}

      <defs>
    {/* glow ka gradient: beech se bahar ki taraf fade */}
    <radialGradient id="ct-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0.85" />
      <stop offset="45%"  stopColor="#3b82f6" stopOpacity="0.45" />
      <stop offset="75%"  stopColor="#8b5cf6" stopOpacity="0.18" />
      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
    </radialGradient>

    {/* soft blur */}
    <filter id="ct-blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="18" />
    </filter>
  </defs>

   {/* 1. GLOW (sabse piche) */}
  <g className="ct-pulse">
    <ellipse cx="260" cy="200" rx="210" ry="150" fill="url(#ct-glow)" filter="url(#ct-blur)" />
    {/* chhota tez glow beech mein */}
    <ellipse cx="260" cy="210" rx="110" ry="80" fill="#22d3ee" opacity="0.35" filter="url(#ct-blur)" />
  </g>

  {/* 2. speech bubble */}
  <g className="ct-float">
    {/* ...same bubble code... */}
  </g>

      {/* blob + dots */}
      <path
        d="M70 150 C40 80 120 30 210 45 C290 58 360 30 420 90 C470 140 460 240 400 290 C330 345 190 345 120 290 C70 250 95 200 70 150 Z"
        fill="url(#ct-blob)"
        opacity=".9"
      />
      <circle cx="440" cy="112" r="7" fill="#3b4cc4" />
      <circle cx="456" cy="146" r="4" fill="#3b4cc4" />
      <circle cx="84" cy="96" r="3.5" fill="#3b4cc4" />

      {/* speech bubble */}
      <g className="ct-float">
        <g transform="rotate(-12 412 66)">
          <path
            d="M350 34 Q350 18 370 18 H452 Q474 18 474 38 V64 Q474 84 452 84 H400 L384 102 L388 84 H372 Q350 84 350 64 Z"
            fill="#06143f"
            stroke="#3aa0ff"
            strokeWidth="2.2"
            style={{ filter: "drop-shadow(0 0 6px rgba(56,170,255,.7))" }}
          />
          <text x="412" y="46" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="24" fontWeight="600" fill="#13c7eb">
            Send
          </text>
          <text x="412" y="70" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="24" fontWeight="600" fill="#13c7eb">
            Message
          </text>
        </g>
      </g>

       <image
    href={assets.contactPng}
    x="-80"
    y="-10"
    width="700"
    height="400"
    preserveAspectRatio="xMidYMid meet" style={{ filter: "drop-shadow(0 0 30px rgba(56,170,255,.55))" }}
  />

      {/* accent strokes near the head */}
      {/* <g stroke="#4cc6ff" strokeWidth="2.4" strokeLinecap="round" className="ct-pulse">
        <path d="M262 96 L276 88" />
        <path d="M268 114 L284 112" />
        <path d="M254 80 L258 66" />
        <path d="M150 92 L140 84" />
      </g> */}

      {/* desk */}
      {/* <rect x="60" y="268" width="380" height="16" rx="8" fill="url(#ct-desk)" style={{ filter: "drop-shadow(0 4px 12px rgba(30,100,255,.6))" }} /> */}

      {/* chair */}
      {/* <rect x="116" y="150" width="58" height="124" rx="18" fill="#0a1450" stroke="#1a3fe0" strokeWidth="2" /> */}

      {/* hoodie */}
      {/* <path d="M138 270 C138 205 165 180 205 180 C245 180 272 205 272 270 Z" fill="#16225f" stroke="#2a3fa8" strokeWidth="1.5" />
      <path d="M172 176 Q205 164 238 176 Q242 198 205 204 Q168 198 172 176 Z" fill="#0f1a52" />
      <text x="190" y="240" textAnchor="middle" fill="#7fb4ff" fontSize="12" fontWeight="700" fontFamily="Outfit, sans-serif">
        {"</>"}
      </text> */}

      {/* head */}
      {/* <g className="ct-bob">
        <circle cx="172" cy="130" r="6" fill="#e9a87a" />
        <circle cx="238" cy="130" r="6" fill="#e9a87a" />
        <circle cx="205" cy="128" r="32" fill="#f2b385" />
        <path d="M170 126 C164 82 218 70 242 100 C250 112 246 124 242 128 C232 108 208 104 188 112 C178 118 174 122 170 126 Z" fill="#0b102c" />
        <g className="ct-blink">
          <circle cx="194" cy="134" r="2.6" fill="#0b102c" />
          <circle cx="216" cy="134" r="2.6" fill="#0b102c" />
        </g>
        <path d="M196 146 Q205 153 214 146" stroke="#0b102c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g> */}

      {/* laptop (back) */}
      {/* <g style={{ filter: "drop-shadow(0 6px 14px rgba(20,100,255,.5))" }}>
        <polygon points="208,188 322,176 330,262 214,266" fill="#3a47b5" stroke="#8aa0ff" strokeWidth="2" strokeLinejoin="round" />
        <path d="M200 266 L336 258 L348 272 L206 276 Z" fill="#2f5bff" />
      </g>
      <circle cx="270" cy="226" r="7" fill="#cfd8ff" opacity=".9" />
      <circle cx="217" cy="268" r="8" fill="#f2b385" />
      <circle cx="243" cy="270" r="8" fill="#f2b385" /> */}

      {/* mug */}
      {/* <rect x="106" y="244" width="26" height="24" rx="5" fill="#eef2ff" />
      <ellipse cx="119" cy="244" rx="13" ry="3" fill="#3a2a24" />
      <path d="M132 250 Q146 252 132 262" stroke="#eef2ff" strokeWidth="4" fill="none" strokeLinecap="round" /> */}

      {/* plant */}
      {/* <path d="M408 250 Q384 222 396 186 Q420 214 412 250 Z" fill="#19b5a5" />
      <path d="M410 250 Q418 212 446 198 Q448 228 418 250 Z" fill="#2bd1a0" />
      <path d="M404 250 Q380 242 372 216 Q398 216 408 250 Z" fill="#0f8f93" />
      <polygon points="392,248 424,248 420,270 396,270" fill="#3a5bff" /> */}

      {/* floating code window */}
      <g className="ct-float2">
        <g transform="translate(300 286) rotate(-8)">
          <rect width="104" height="62" rx="7" fill="#06143f" fillOpacity=".92" stroke="#3aa0ff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px rgba(56,170,255,.7))" }} />
          {[
            [0, 40, "#ff9f43"],
            [1, 62, "#4cc6ff"],
            [1, 48, "#8a63ff"],
            [2, 70, "#ff6b81"],
            [1, 36, "#3ee0a0"],
          ].map(([ind, w, c], i) => (
            <rect key={i} x={10 + ind * 8} y={12 + i * 9} width={w} height="4" rx="2" fill={c} />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ====================================================================
   LEFT SIDE PIECES
   ==================================================================== */
function ContactItem({ icon, label, value, href, i }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — ignore */
    }
  };
  return (
    <li className="ct-rise group flex items-center gap-4" style={d(i)}>
      <span className="ct-iconbubble flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-sky-400/70 bg-gradient-to-br from-[#0b2b95] to-[#061244] text-sky-300 shadow-[0_0_18px_rgba(56,170,255,.45)] transition group-hover:scale-110 group-hover:text-white group-hover:shadow-[0_0_26px_rgba(56,170,255,.8)]">
        <Svg className="h-6 w-6">{icon}</Svg>
      </span>
      <div className="min-w-0">
        <p className="text-base font-semibold text-white">{label}</p>
        <div className="flex items-center gap-2">
          <a
            href={href}
            className="truncate text-[15px] text-slate-300 transition hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            {value}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${label}`}
            className="flex h-6 items-center gap-1 rounded-md px-1.5 text-xs text-sky-300/80 opacity-0 transition hover:bg-sky-500/10 hover:text-sky-200 focus:opacity-100 group-hover:opacity-100"
          >
            <Svg className="h-3.5 w-3.5" strokeWidth={2.2}>
              {copied ? I.check : I.copy}
            </Svg>
            {copied && <span>Copied!</span>}
          </button>
        </div>
      </div>
    </li>
  );
}

/* ====================================================================
   FORM
   ==================================================================== */
function Field({ icon, error, multiline, children }) {
  return (
    <div>
      <div
        className={`flex gap-3 rounded-xl border bg-[#050f3a]/60 px-4 transition ${
          multiline ? "items-start" : "items-center"
        } ${
          error
            ? "border-rose-400/70 shadow-[0_0_14px_rgba(251,113,133,.25)]"
            : "border-sky-500/40 focus-within:border-sky-300 focus-within:shadow-[0_0_0_3px_rgba(56,170,255,.16),0_0_22px_rgba(56,170,255,.3)]"
        }`}
      >
        <Svg className={`h-5 w-5 shrink-0 text-sky-300/80 ${multiline ? "mt-4" : ""}`}>{icon}</Svg>
        {children}
      </div>
      {error && (
        <p className="mt-1.5 pl-1 text-xs text-rose-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full bg-transparent py-3.5 text-[15px] text-white outline-none placeholder:text-slate-300/60";

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "That email doesn't look right.";
  if (v.phone && !/^[+()\d\s-]{7,20}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!v.subject) e.subject = "Pick a subject.";
  if (v.message.trim().length < 10) e.message = "Tell me a little more (at least 10 characters).";
  return e;
}

function SentView({ name, onReset }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-10 text-center" aria-live="polite">
      <div className="relative h-32 w-32">
        <span className="ct-ripple absolute inset-0 rounded-full border border-sky-400/60" />
        <span className="ct-ripple absolute inset-0 rounded-full border border-sky-400/60" style={{ animationDelay: "1s" }} />
        <span className="ct-check absolute inset-3 flex items-center justify-center rounded-full bg-gradient-to-br from-[#16a7ff] to-[#9b5bff] shadow-[0_0_40px_rgba(70,130,255,.7)]">
          <Svg className="h-12 w-12 text-white" strokeWidth={3}>
            {I.check}
          </Svg>
        </span>
        <span className="ct-fly absolute left-1/2 top-1/2 text-sky-200">
          <Svg className="h-8 w-8">{I.send}</Svg>
        </span>
      </div>
      <h3 className="mt-6 text-3xl font-bold text-white">Message sent!</h3>
      <p className="mt-2 max-w-xs text-slate-300">
        Thanks{name ? `, ${name.split(" ")[0]}` : ""}! I’ll read it and get back to you as soon as I can.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 rounded-full border border-sky-400/60 bg-[#030c33]/70 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,170,255,.45)]"
      >
        Send another message
      </button>
    </div>
  );
}

function ContactForm({ email, subjects, endpoint, onSubmit }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (k) => (e) => {
    const val = k === "message" ? e.target.value.slice(0, MAX_MSG) : e.target.value;
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const send = async (data) => {
    if (onSubmit) return onSubmit(data);
    if (endpoint) {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error("Request failed");
      return undefined;
    }
    // fallback: open the visitor's mail app with everything pre-filled
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\n\n${data.message}`
    );
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(data.subject)}&body=${body}`;
    return undefined;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (values.company) {
      setStatus("sent"); // honeypot filled -> bot, pretend success
      return;
    }
    setStatus("sending");
    try {
      await send(values);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
  };

  if (status === "sent") return <SentView name={values.name} onReset={reset} />;

  return (
    <form onSubmit={submit} noValidate className="p-6 sm:p-8">
      {/* header */}
      <div className="flex items-center gap-4">
        <span className="ct-iconbubble flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-2xl border border-sky-400/60 bg-gradient-to-br from-[#0b2b95] to-[#061244] text-sky-300 shadow-[0_0_20px_rgba(56,170,255,.45)]">
          <Svg className="ct-plane h-7 w-7">{I.send}</Svg>
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300/80">Get in touch</p>
          <h3 className="text-2xl font-bold text-white sm:text-[28px]">Send Me a Message</h3>
          <p className="mt-0.5 text-[13px] text-slate-300">
            Fill out the form below and I’ll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <Field icon={I.user} error={errors.name}>
            <input
              className={inputCls}
              placeholder="Your Name *"
              autoComplete="name"
              value={values.name}
              onChange={set("name")}
              aria-label="Your name"
              aria-invalid={!!errors.name}
            />
          </Field>
          <Field icon={I.mail} error={errors.email}>
            <input
              className={inputCls}
              type="email"
              placeholder="Your Email *"
              autoComplete="email"
              value={values.email}
              onChange={set("email")}
              aria-label="Your email"
              aria-invalid={!!errors.email}
            />
          </Field>
        </div>

        <Field icon={I.phone} error={errors.phone}>
          <input
            className={inputCls}
            type="tel"
            placeholder="Your Phone (Optional)"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
            aria-label="Your phone"
          />
        </Field>

        <Field icon={I.subject} error={errors.subject}>
          <select
            className={`${inputCls} cursor-pointer appearance-none pr-8 ${values.subject ? "" : "text-slate-300/60"}`}
            value={values.subject}
            onChange={set("subject")}
            aria-label="Subject"
            aria-invalid={!!errors.subject}
          >
            <option value="" disabled>
              Subject *
            </option>
            {subjects.map((s) => (
              <option key={s} value={s} className="bg-[#050f3a] text-white">
                {s}
              </option>
            ))}
          </select>
          <Svg className="pointer-events-none -ml-7 h-5 w-5 shrink-0 text-sky-300">{I.chevron}</Svg>
        </Field>

        <Field icon={I.message} error={errors.message} multiline>
          <div className="w-full">
            <textarea
              className={`${inputCls} min-h-[120px] resize-y py-4`}
              placeholder="Tell me about your project, idea or just say hello..."
              value={values.message}
              onChange={set("message")}
              aria-label="Your message"
              aria-invalid={!!errors.message}
            />
            <p className="pb-2 text-right text-[11px] text-slate-400">
              {values.message.length}/{MAX_MSG}
            </p>
          </div>
        </Field>

        {/* honeypot (hidden from people, bots fill it) */}
        <input
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={set("company")}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
          name="company"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="ct-btn group relative mt-6 flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#16a7ff] via-[#3b7bff] to-[#9b5bff] text-base font-semibold text-white shadow-[0_8px_30px_rgba(60,120,255,.45)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-wait disabled:opacity-80"
      >
        {status === "sending" ? (
          <>
            <span className="ct-spin h-5 w-5 rounded-full border-2 border-white/40 border-t-white" />
            Sending…
          </>
        ) : (
          <>
            <Svg className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-1">{I.send}</Svg>
            Send Message
            <Svg className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={2.4}>
              {I.arrow}
            </Svg>
          </>
        )}
      </button>

      {status === "error" && (
        <p className="mt-3 text-center text-sm text-rose-300" role="alert">
          Couldn’t send right now. Please try again, or email me directly at {email}.
        </p>
      )}

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-300">
        <Svg className="h-3.5 w-3.5 text-sky-300" strokeWidth={2.2}>
          {I.lock}
        </Svg>
        Your information is safe with me.
      </p>
    </form>
  );
}

/* ====================================================================
   FULL SECTION
   ==================================================================== */
export default function Contact({
  email = "rameditor@example.com",
  phone = "+91 98765 43210",
  location = "Agra, Uttar Pradesh, India",
  socials = DEFAULT_SOCIALS,
  subjects = DEFAULT_SUBJECTS,
  endpoint = "",
  onSubmit,
}) {
  const [ref, seen] = useInView();

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative isolate overflow-hidden bg-[#020619] text-white ${seen ? "ct-in" : ""}`}
      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('${FONTS}');
        .ct-rise { opacity: 0; }
        .ct-in .ct-rise { animation: ct-rise .7s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: var(--d, 0ms); }
        @keyframes ct-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @keyframes ct-twinkle { 0%,100% { opacity: .12; transform: scale(.8); } 50% { opacity: .85; transform: scale(1.3); } }
        .ct-star { animation: ct-twinkle 4s ease-in-out infinite; }
        @keyframes ct-wave { from { stroke-dashoffset: 700; } to { stroke-dashoffset: 0; } }
        .ct-wave { stroke-dasharray: 700; animation: ct-wave 5s ease-out forwards; }
        @keyframes ct-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        .ct-float  { animation: ct-float 4s ease-in-out infinite; }
        .ct-float2 { animation: ct-float 5s ease-in-out infinite reverse; }
        @keyframes ct-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); } }
        .ct-bob { animation: ct-bob 3.5s ease-in-out infinite; }
        @keyframes ct-blink { 0%,93%,100% { transform: scaleY(1); } 96% { transform: scaleY(.1); } }
        .ct-blink { transform-box: fill-box; transform-origin: center; animation: ct-blink 5s infinite; }
        @keyframes ct-pulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
        .ct-pulse { animation: ct-pulse 2.2s ease-in-out infinite; }
        @keyframes ct-spin { to { transform: rotate(360deg); } }
        .ct-spin { animation: ct-spin .8s linear infinite; }
        .ct-border-spin { animation: ct-spin 7s linear infinite; }
        @keyframes ct-shine { to { background-position: 200% center; } }
        .ct-shine { background-size: 200% auto; animation: ct-shine 6s linear infinite; }
        @keyframes ct-sheen { to { transform: translateX(120%); } }
        .ct-btn::after { content: ""; position: absolute; inset: 0; transform: translateX(-120%);
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.35) 50%, transparent 70%); pointer-events: none; }
        .ct-btn:hover::after { animation: ct-sheen .9s ease; }
        @keyframes ct-plane { 0%,100% { transform: translate(0,0); } 50% { transform: translate(2px,-2px); } }
        .ct-plane { animation: ct-plane 2.4s ease-in-out infinite; }
        @keyframes ct-fly {
          0%   { transform: translate(-90px, 60px) rotate(0deg) scale(.6); opacity: 0; }
          25%  { opacity: 1; }
          70%  { transform: translate(40px, -60px) scale(1); opacity: 1; }
          100% { transform: translate(110px, -110px) scale(.7); opacity: 0; }
        }
        .ct-fly { margin: -16px 0 0 -16px; animation: ct-fly 1.3s ease-in forwards; }
        @keyframes ct-pop { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
        .ct-check { opacity: 0; animation: ct-pop .6s cubic-bezier(.2,.9,.3,1.3) 1s forwards; }
        @keyframes ct-ripple { 0% { transform: scale(.8); opacity: .7; } 100% { transform: scale(1.5); opacity: 0; } }
        .ct-ripple { animation: ct-ripple 2.4s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ct-rise { opacity: 1 !important; animation: none !important; }
          .ct-star, .ct-wave, .ct-float, .ct-float2, .ct-bob, .ct-blink, .ct-pulse,
          .ct-border-spin, .ct-shine, .ct-plane, .ct-ripple { animation: none !important; }
          .ct-wave { stroke-dasharray: none; }
        }
      `}</style>

      <Backdrop />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />

      <div className="mx-auto grid max-w-[1500px] items-center gap-12 px-6 py-14 sm:grid-cols-[1fr_1fr] sm:gap-6 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:gap-8 lg:gap-14 lg:px-10 lg:py-20">
        {/* ================= LEFT ================= */}
        <div className="min-w-0">
          <p className="ct-rise -rotate-3 text-3xl font-bold" style={{ ...handwriting, ...d(0) }}>
            Let’s Connect
            <svg viewBox="0 0 120 14" className="mt-0.5 h-3 w-28" fill="none" aria-hidden="true">
              <path d="M2 10 Q40 2 80 8 T118 4" stroke="#13c7eb" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </p>

          <h2 className="ct-rise mt-3 text-4xl font-extrabold leading-[1.08] sm:text-[34px] md:text-[40px] lg:text-[52px] xl:text-[40px]" style={{ ...handwriting, ...d(0) }}>
            Get In Touch
            <br />
            <span className="ct-shine bg-gradient-to-r from-[#2fd0ff] via-[#4a8bff] to-[#9b5bff] bg-clip-text text-transparent [background-image:linear-gradient(90deg,#2fd0ff,#4a8bff,#9b5bff,#2fd0ff)]">
              Let’s Work Together
            </span>
          </h2>

          <p className="ct-rise relative z-10 mt-5 max-w-[30rem] text-base leading-relaxed text-slate-200 sm:max-w-[22rem] sm:text-[15px] lg:max-w-[24rem] lg:text-[15px]" style={d(2)}>
            Have a project in mind, a question, or just want to say hi? I’d love to hear from you! Feel free to
            reach out through the form or connect with me directly.
          </p>

          <div className="mt-8 grid items-center gap-4 sm:grid-cols-[0.95fr_1.05fr] lg:gap-6">
            {/* info list */}
            <div>
              <ul className="space-y-5">
                <ContactItem i={3} icon={I.mail} label="Email" value={email} href={`mailto:${email}`} />
                <ContactItem i={4} icon={I.phone} label="Phone" value={phone} href={`tel:${phone.replace(/\s/g, "")}`} />
                <ContactItem
                  i={5}
                  icon={I.pin}
                  label="Location"
                  value={location}
                  href={`https://www.google.com/maps/search/${encodeURIComponent(location)}`}
                />
              </ul>

              <div className="ct-rise mt-7" style={d(6)}>
                <div className="flex items-center gap-4">
                  <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border border-sky-400/70 bg-gradient-to-br from-[#0b2b95] to-[#061244] text-sky-300 shadow-[0_0_18px_rgba(56,170,255,.45)]">
                    <Svg className="h-5 w-5">{I.share}</Svg>
                  </span>
                  <div>
                    <p className="text-base font-semibold text-white">Follow Me</p>
                    <p className="text-xs text-slate-300">Stay connected for updates, projects and more!</p>
                  </div>
                </div>
                <ul className="mt-3 flex flex-nowrap items-center gap-3 sm:pl-16">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        target={s.href?.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-500/50 bg-[#030c33]/80 text-slate-100 transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:text-sky-200 hover:shadow-[0_0_20px_rgba(56,170,255,.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                      >
                        <Svg className="h-[18px] w-[18px]">{I[s.icon] || I.share}</Svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* illustration */}
            <div className="ct-rise mx-auto w-full max-w-[330px] sm:-mt-20 sm:max-w-none lg:-mt-28" style={d(4)}>
              <ContactArt />
            </div>
          </div>

          <p className="ct-rise mt-4 -rotate-6 text-2xl font-bold" style={{ ...handwriting, ...d(7) }}>
            Thanks for
            <br />
            stopping by! <span aria-hidden="true">:)</span>
          </p>
        </div>

        {/* ================= RIGHT: form card ================= */}
        <div className="ct-rise relative mx-auto w-full min-w-0 max-w-[560px] sm:max-w-none" style={d(3)}>
          <div className="relative overflow-hidden rounded-[28px] p-px">
            {/* light sweeping around the border */}
            <span
              className="ct-border-spin absolute -inset-[60%]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0 62%, rgba(62,224,255,.9) 78%, rgba(138,99,255,.9) 90%, transparent 100%)",
              }}
            />
            <div className="relative rounded-[27px] border border-sky-500/20 bg-[#040b2e]/95 backdrop-blur">
              <ContactForm email={email} subjects={subjects} endpoint={endpoint} onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}