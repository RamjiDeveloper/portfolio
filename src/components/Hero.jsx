import React, { useEffect, useState } from "react";
import assets from "../assets/assets";

/**
 * Hero — "Hello, I'm Ram / Web Developer" portfolio hero.
 * React + Tailwind CSS v3 (arbitrary values). No other dependencies.
 *
 *   <Hero photo="/me.png" />   // transparent PNG cutout recommended
 *   <Hero />                   // artwork only, no photo
 */

const FONTS =
  "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Outfit:wght@400;500;600;700;800&display=swap";

const handwriting = {
  fontFamily: "'Caveat', 'Segoe Print', cursive",
  color: "#13c7eb",
  textShadow: "0 0 14px rgba(56,170,255,.55), 0 0 2px rgba(120,210,255,.9)",
};



const neon = { filter: "drop-shadow(0 0 5px rgba(56,170,255,.8))" };

/* ---------- small helpers ---------- */
const Slab = ({ className = "", style = {} }) => (
  <div
    className={`absolute ${className}`}
    style={{ clipPath: "polygon(28% 0, 100% 0, 72% 100%, 0 100%)", ...style }}
  />
);

const Icon = ({ children, className = "h-6 w-6" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const socials = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </>
    ),
  },
  {
    label: "Email",
    href: "#",
    icon: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  },
];

/* ---------- RIGHT SIDE: artwork ---------- */
function HeroArt({ photo }) {
  return (
    <div
      className="relative aspect-[819/564] w-full [container-type:inline-size]"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, #000 14%, #000 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, #000 14%, #000 100%)",
      }}
    >
      {/* blue bloom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 52% 42%, rgba(24,92,255,.75) 0%, rgba(10,45,160,.45) 38%, rgba(2,6,25,0) 75%)," +
            "radial-gradient(40% 50% at 12% 100%, rgba(20,110,255,.4) 0%, rgba(2,6,25,0) 70%)",
        }}
      />

      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(120,170,255,.55) 1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(70% 70% at 50% 40%, #000 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 50% 40%, #000 20%, transparent 80%)",
        }}
      />

      {/* slanted slabs */}
      <Slab
        className="left-[47%] top-[18%] h-[90%] w-[26%] blur-[1px]"
        style={{
          background:
            "linear-gradient(160deg, rgba(150,120,255,.85) 0%, rgba(60,90,255,.55) 35%, rgba(20,60,200,.15) 100%)",
        }}
      />
      <Slab
        className="left-[55%] top-[26%] h-[80%] w-[12%]"
        style={{
          background:
            "linear-gradient(160deg, rgba(5,15,70,.85) 0%, rgba(5,15,70,.2) 100%)",
        }}
      />
      <Slab
        className="left-[66%] top-[44%] h-[60%] w-[10%] opacity-70"
        style={{
          background:
            "linear-gradient(180deg, rgba(60,130,255,.7), rgba(20,60,200,0))",
        }}
      />
      <Slab
        className="left-[75%] top-[56%] h-[50%] w-[8%] opacity-60"
        style={{
          background:
            "linear-gradient(180deg, rgba(70,150,255,.7), rgba(20,60,200,0))",
        }}
      />
      <Slab
        className="-left-[4%] top-[30%] h-[75%] w-[22%] opacity-60"
        style={{
          background:
            "linear-gradient(200deg, rgba(40,120,255,.55), rgba(20,60,200,0) 80%)",
        }}
      />
      <Slab
        className="left-[14%] top-[10%] h-[55%] w-[16%] opacity-40"
        style={{
          background:
            "linear-gradient(200deg, rgba(60,150,255,.55), rgba(20,60,200,0) 80%)",
        }}
      />

      {/* sparkles */}
      {[
        ["60%", "12%"],
        ["88%", "20%"],
        ["38%", "10%"],
        ["92%", "52%"],
        ["30%", "70%"],
      ].map(([l, t], i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-sky-300/80 shadow-[0_0_8px_2px_rgba(80,170,255,.7)]"
          style={{ left: l, top: t }}
        />
      ))}

      {/* photo */}
      {photo && (
        <img
          src={photo}
          alt="Ram"
          className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain"
        />
      )}

      {/* crown */}
      <svg
        viewBox="0 0 48 40"
        className="absolute left-[9.5%] top-[14%] w-[6%]"
        fill="none"
        stroke="#4cc6ff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={neon}
        aria-hidden="true"
      >
        <path d="M6 32 L4 12 L16 22 L24 6 L32 22 L44 12 L42 32 Z" />
        <path d="M8 37 H40" />
        <circle cx="4" cy="10" r="1.6" />
        <circle cx="24" cy="4" r="1.6" />
        <circle cx="44" cy="10" r="1.6" />
      </svg>

      <p
        className="absolute left-[3.8%] top-[23%] -rotate-[7deg] whitespace-pre-line text-[6.3cqw] font-bold leading-[1.02]"
        style={handwriting}
      >
        {"Code\nBuild\nCreate"}
      </p>

      {/* small arrow */}
      <svg
        viewBox="0 0 40 30"
        className="absolute left-[19.5%] top-[41%] w-[4.5%]"
        fill="none"
        stroke="#4cc6ff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={neon}
        aria-hidden="true"
      >
        <path d="M36 24 Q22 20 10 8" />
        <path d="M8 18 L10 6 L21 10" />
      </svg>

      {/* laptop */}
      <svg
        viewBox="0 0 170 130"
        className="absolute bottom-[19%] left-[3.2%] w-[19%]"
        aria-hidden="true"
        style={{ filter: "drop-shadow(0 8px 18px rgba(20,100,255,.55))" }}
      >
        <defs>
          <linearGradient id="hero-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#06143f" />
            <stop offset="1" stopColor="#0b2a7a" />
          </linearGradient>
          <linearGradient id="hero-base" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2f8dff" />
            <stop offset="1" stopColor="#7fd0ff" />
          </linearGradient>
        </defs>
        <g transform="rotate(-6 80 50)">
          <rect x="12" y="6" width="130" height="88" rx="8" fill="url(#hero-screen)" stroke="#3aa0ff" strokeWidth="3" />
          <g fill="none" stroke="#4cc6ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 6px #3aa0ff)" }}>
            <path d="M52 36 L36 50 L52 64" />
            <path d="M92 36 L108 50 L92 64" />
            <path d="M78 30 L66 70" strokeWidth="5" />
          </g>
        </g>
        <path d="M4 104 L150 96 L166 112 Q168 118 160 119 L28 126 Q14 126 8 118 Z" fill="url(#hero-base)" opacity=".95" />
        <path d="M60 112 L110 109" stroke="#06143f" strokeWidth="3" strokeLinecap="round" opacity=".5" />
      </svg>

      {/* right handwriting */}
      <p
        className="absolute left-[79%] top-[31%] -rotate-[9deg] whitespace-pre-line text-[5.4cqw] font-bold leading-[1.08]"
        style={handwriting}
      >
        {"Big\nDreams\nBigger\nProjects"}
      </p>

      <svg
        viewBox="0 0 70 56"
        className="absolute left-[70.5%] top-[60%] w-[9%]"
        fill="none"
        stroke="#4cc6ff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={neon}
        aria-hidden="true"
      >
        <path d="M8 50 L62 6" />
        <path d="M8 36 L6 51 L21 50" />
        <path d="M49 6 L63 5 L61 20" />
      </svg>

      <svg
        viewBox="0 0 90 40"
        className="absolute left-[83.5%] top-[59%] w-[11%]"
        fill="none"
        stroke="#4cc6ff"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={neon}
        aria-hidden="true"
      >
        <path d="M4 34 Q40 26 86 6" />
      </svg>
    </div>
  );
}

/* ---------- TYPING EFFECT ---------- */
const roles = [
  "Web Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
];

function DeveloperTitle() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let delay = deleting ? 50 : 100;

    // pause when the full word is typed
    if (!deleting && text === currentRole) {
      delay = 1200;
    }

    const timer = setTimeout(() => {
      if (!deleting && text === currentRole) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setText(currentRole.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  // FIX: this return was missing, so nothing was rendered
  return (
    <h2 className="mt-2 flex min-h-[3rem] items-center text-3xl font-semibold text-slate-100 sm:text-4xl">
      <span className="bg-gradient-to-r from-[#3ee0ff] to-[#8a63ff] bg-clip-text text-transparent">
        {text}
      </span>
      <span className="ml-1 inline-block h-8 w-[3px] bg-sky-300 sm:h-10 [animation:blink_1s_step-end_infinite]" />
    </h2>
  );
}

/* ---------- FULL HERO ---------- */
export default function Hero({ photo = null }) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#020619] text-white"
      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('${FONTS}');
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      {/* page-wide subtle glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 80% at 78% 45%, rgba(20,80,230,.28) 0%, transparent 70%), linear-gradient(180deg,#030a2e 0%,#020619 100%)",
        }}
      />
      {/* bottom hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />

      <div className="mx-auto grid max-w-[1500px] items-center gap-6 px-6 py-10 sm:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:py-0">
        {/* LEFT */}
        <div className="relative z-10 lg:py-16">
          <p className="flex items-center gap-3 text-2xl font-bold text-slate-100 sm:text-[28px]" style={handwriting}>
            <span className="text-3xl" aria-hidden="true">
              👋
            </span>
            {"Hello, I 'm"}
          </p>

          <h1 className="mt-1 bg-gradient-to-r from-[#3ee0ff] via-[#4aa8ff] to-[#8a63ff] bg-clip-text pb-2 text-[88px] font-extrabold leading-[1] tracking-tight text-transparent sm:text-[120px] lg:text-[132px]" style={handwriting}>
            {"Ram Ji"}
          </h1>

          {/* typing text */}
          <DeveloperTitle />

          <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-slate-200 sm:text-xl">
            I build modern and responsive websites with clean code and creative
            ideas.
          </p>

          {/* buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#login"
              className="inline-flex h-14 min-w-[190px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#1f7bff] to-[#4cc0ff] px-8 text-lg font-semibold text-white shadow-[0_8px_30px_rgba(30,120,255,.45)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <Icon className="h-5 w-5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </Icon>
              Login
            </a>

            {/* gradient-border outline button */}
            <a
              href="#start"
              className="rounded-full bg-gradient-to-r from-[#7a4dff] to-[#2fb4ff] p-[1.5px] transition hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <span className="inline-flex h-[53px] min-w-[190px] items-center justify-center gap-3 rounded-full bg-[#030c33] px-8 text-lg font-semibold text-white">
                <Icon className="h-5 w-5">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </Icon>
                Get Started
              </span>
            </a>
          </div>

          {/* socials */}
          <ul className="mt-10 flex items-center gap-7">
            {socials.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="text-white/90 transition hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
                >
                  <Icon className="h-7 w-7">{icon}</Icon>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="relative overflow-hidden lg:-ml-10">
          {/* Background artwork */}
          <HeroArt photo={photo} />

          {/* Bigger portrait with blue glow */}
          <img
            src={assets.hero}
            alt=""
            className="absolute inset-0 z-10 h-full w-full scale-125 object-contain opacity-100 [filter:drop-shadow(0_0_12px_rgba(0,140,255,0.65))_drop-shadow(0_0_30px_rgba(0,100,255,0.4))]"
          />
        </div>
      </div>
    </section>
  );
}