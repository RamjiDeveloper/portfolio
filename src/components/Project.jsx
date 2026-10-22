import React, { useEffect, useState } from "react";

/**
 * Projects — dynamic "My Projects" section.
 * Left: project details card. Right: animated orbit of that project's features.
 * Everything is driven by the PROJECTS array below — add an object, get a new slide.
 * React + Tailwind CSS v3. No other dependencies.
 *
 *   <Projects />
 *   <Projects projects={myProjects} viewAllHref="/projects" autoPlayMs={10000} />
 *
 * ──────────────── PROJECT TEMPLATE (copy & fill) ────────────────
 * {
 *   id: "my-project",                  // unique
 *   badge: "Featured Project",         // small pill on top
 *   title: "ToolzHub",                 // gradient part of the heading
 *   tagline: "Tools Website",          // shown after the dash
 *   description: "Short paragraph…",
 *   tech: ["HTML", "CSS", "React"],    // chips
 *   features: [
 *     "Plain feature text",
 *     { text: "Email notifications", highlight: "(Nodemailer)" },
 *   ],
 *   liveUrl: "https://…",              // optional -> "View Project" button
 *   codeUrl: "https://github.com/…",   // optional -> "View Code" button
 *   center: { name: "ToolzHub", tagline: "All Tools in One Place", icon: "wrench" },
 *   orbit: [                           // any number of items (6–10 looks best)
 *     { label: "PDF Tools", icon: "file-text", color: "#ff4d79" },
 *     { label: "AI Logo",   icon: "text:AI" },          // "text:XYZ" = badge with text
 *     { label: "Custom",    icon: "/images/custom.png" } // image URL also works
 *   ],
 * }
 * Built-in icon names: wrench, file-text, file-check, image, arrow-left-right, qr-code,
 * coins, sparkles, pen-square, mail, download, upload, layout, user, briefcase, target,
 * eye, cloud, shield-check, code, zap, globe, palette, chart, folder
 */

const FONTS =
  "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Outfit:wght@400;500;600;700;800&display=swap";

    const handwriting = {
  fontFamily: "'Caveat', 'Segoe Print', cursive",
  color: "#13c7eb",
  textShadow: "0 0 14px rgba(56,170,255,.55), 0 0 2px rgba(120,210,255,.9)",
};

const neon = { filter: "drop-shadow(0 0 5px rgba(56,170,255,.8))" };


/* ====================================================================
   PROJECT DATA  (edit / add your own here)
   ==================================================================== */
const PROJECTS = [
  {
    id: "toolzhub",
    badge: "Featured Project",
    title: "ToolzHub",
    tagline: "Tools Website",
    description:
      "A modern tools website with 20+ useful utilities like PDF tools, image converters, text tools, QR code, unit converter, AI logo generator and more.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    features: [
      "20+ Tools (PDF, Image, Text, File, etc.)",
      "File upload & download",
      { text: "Email notifications", highlight: "(Nodemailer / Formspree)" },
      "Responsive design (Desktop + Mobile)",
    ],
    liveUrl: "#",
    codeUrl: "#",
    center: { name: "ToolzHub", tagline: "All Tools in One Place", icon: "wrench" },
    orbit: [
      { label: "PDF Tools", icon: "file-text", color: "#ff4d79" },
      { label: "Text Tools", icon: "file-text", color: "#e6f0ff" },
      { label: "Converters", icon: "arrow-left-right", color: "#4cc6ff" },
      { label: "QR & Barcode", icon: "qr-code", color: "#e6f0ff" },
      { label: "Unit & Currency", icon: "coins", color: "#ffc83d" },
      { label: "AI Logo", icon: "text:AI" },
      { label: "Logo Editor", icon: "pen-square", color: "#3ee0a0" },
      { label: "Image Tools", icon: "image", color: "#e6f0ff" },
    ],
  },
  {
    id: "resume-builder",
    badge: "AI Powered",
    title: "Resume Builder",
    tagline: "AI Powered",
    description:
      "Build a professional, ATS-friendly resume in minutes. AI writes and improves your content, you pick a template, preview live and export a polished PDF.",
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB", "AI API"],
    features: [
      "AI-generated summary, skills & bullet points",
      "Multiple modern resume templates",
      { text: "Live preview while typing", highlight: "(real-time)" },
      "One-click PDF download",
    ],
    liveUrl: "#",
    codeUrl: "#",
    center: { name: "Resume AI", tagline: "Your Career, Upgraded", icon: "file-check" },
    orbit: [
      { label: "AI Writer", icon: "sparkles", color: "#c9a8ff" },
      { label: "Templates", icon: "layout", color: "#4cc6ff" },
      { label: "Live Preview", icon: "eye", color: "#e6f0ff" },
      { label: "PDF Export", icon: "download", color: "#ff4d79" },
      { label: "ATS Check", icon: "shield-check", color: "#3ee0a0" },
      { label: "Cover Letter", icon: "mail", color: "#ffc83d" },
      { label: "Job Match", icon: "target", color: "#4cc6ff" },
      { label: "Auto Save", icon: "cloud", color: "#e6f0ff" },
    ],
  },
];

/* ====================================================================
   ICONS  (lucide-style paths, 24x24 stroke icons)
   ==================================================================== */
const ICONS = {
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  "file-text": (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </>
  ),
  "file-check": (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  image: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </>
  ),
  "arrow-left-right": (
    <>
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </>
  ),
  "qr-code": (
    <>
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </>
  ),
  coins: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </>
  ),
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </>
  ),
  "pen-square": (
    <>
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
    </>
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </>
  ),
  upload: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m17 8-5-5-5 5" />
      <path d="M12 3v12" />
    </>
  ),
  layout: (
    <>
      <rect width="18" height="7" x="3" y="3" rx="1" />
      <rect width="9" height="7" x="3" y="14" rx="1" />
      <rect width="5" height="7" x="16" y="14" rx="1" />
    </>
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  briefcase: (
    <>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  eye: (
    <>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  "shield-check": (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  code: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  zap: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  palette: (
    <>
      <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
    </>
  ),
  chart: (
    <>
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </>
  ),
  folder: <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />,
};

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

/** Renders an orbit/center icon from: icon name | "text:AI" | image URL | React node */
function Glyph({ icon, size, color = "#e6f0ff" }) {
  const box = { width: size, height: size, display: "inline-flex" };

  if (React.isValidElement(icon)) {
    return <span style={{ ...box, color }}>{icon}</span>;
  }
  if (typeof icon === "string" && icon.startsWith("text:")) {
    return (
      <span
        className="items-center justify-center rounded-[24%] bg-gradient-to-br from-[#6a63ff] to-[#9b6bff] font-extrabold text-white shadow-[0_0_14px_rgba(130,100,255,.6)]"
        style={{ ...box, fontSize: `calc(${size} * 0.5)`, lineHeight: 1 }}
      >
        {icon.slice(5)}
      </span>
    );
  }
  if (typeof icon === "string" && /^(https?:|\/|data:)/.test(icon)) {
    return <img src={icon} alt="" style={box} className="object-contain" />;
  }
  return (
    <Svg
      className="shrink-0"
      strokeWidth={1.7}
      style={{
        width: size,
        height: size,
        color,
        filter: `drop-shadow(0 0 6px ${color}88)`,
      }}
    >
      {ICONS[icon] || ICONS.sparkles}
    </Svg>
  );
}

/* ====================================================================
   ORBIT  (center orb + rotating ring of items)
   ==================================================================== */
function Orbit({ project }) {
  const items = project.orbit || [];
  const n = items.length;
  const center = project.center || {};
  const R = 37; // orbit radius  (cqw)
  const S = n > 9 ? 14 : n > 7 ? 17 : 19; // node size (cqw)

  return (
    <div className="proj-orbit relative aspect-square w-full [container-type:inline-size]">
      {/* soft background bloom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(24,92,255,.35) 0%, rgba(10,45,160,.18) 55%, transparent 80%)",
        }}
      />

      {/* dashed rings + travelling dots */}
      <svg viewBox="0 0 100 100" className="proj-spin-rev absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="37" stroke="rgba(80,170,255,.45)" strokeWidth=".35" strokeDasharray="1 2.4" />
        {[0, 120, 240].map((a) => (
          <circle
            key={a}
            cx="50"
            cy="13"
            r=".9"
            fill="#9be8ff"
            transform={`rotate(${a} 50 50)`}
            style={{ filter: "drop-shadow(0 0 2px #4cc6ff)" }}
          />
        ))}
      </svg>
      <svg viewBox="0 0 100 100" className="proj-spin-slow absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="47" stroke="rgba(120,110,255,.35)" strokeWidth=".3" strokeDasharray="4 3" />
        <circle cx="50" cy="50" r="27" stroke="rgba(80,170,255,.18)" strokeWidth=".3" />
        {[60, 180, 300].map((a) => (
          <rect
            key={a}
            x="49.3"
            y="2.4"
            width="1.4"
            height="1.4"
            fill="#7fd0ff"
            transform={`rotate(${a} 50 50) rotate(45 50 3.1)`}
          />
        ))}
      </svg>

      {/* center orb */}
      <div className="absolute left-1/2 top-1/2 h-[37cqw] w-[37cqw] -translate-x-1/2 -translate-y-1/2">
        <span className="proj-ripple absolute inset-0 rounded-full border border-sky-400/50" />
        <span className="proj-ripple absolute inset-0 rounded-full border border-sky-400/50" style={{ animationDelay: "1.6s" }} />
        <div
          className="proj-pop absolute inset-0"
          style={{ animationDelay: "0.05s" }}
        >
          <div
            className="proj-ring absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #3ee0ff, #3b63ff, #8a63ff, #3ee0ff 70%, #3b63ff 85%, #3ee0ff)",
              boxShadow: "0 0 40px rgba(40,130,255,.65), 0 0 90px rgba(40,110,255,.35)",
            }}
          />
          <div
            className="absolute inset-[1cqw] flex flex-col items-center justify-center rounded-full text-center"
            style={{
              background: "radial-gradient(circle at 50% 30%, #0b2b95 0%, #05123f 62%, #030a2a 100%)",
              boxShadow: "inset 0 0 30px rgba(50,130,255,.45)",
            }}
          >
            <Glyph icon={center.icon || "sparkles"} size="8cqw" color="#4cc6ff" />
            <p
              className="mt-[1cqw] bg-gradient-to-r from-white to-[#5db4ff] bg-clip-text font-bold leading-none text-transparent"
              style={{ fontSize: "max(14px, 5cqw)" }}
            >
              {center.name || project.title}
            </p>
            {center.tagline && (
              <p className="mt-[0.9cqw] text-slate-200/90" style={{ fontSize: "max(9px, 2cqw)" }}>
                {center.tagline}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* rotating ring of satellites */}
      <div className="proj-spin absolute inset-0">
        {items.map((it, i) => {
          const a = (360 / n) * i;
          return (
            <div
              key={`${it.label}-${i}`}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${a}deg) translateY(-${R}cqw) rotate(${-a}deg)` }}
            >
              {/* counter-rotation keeps the label upright */}
              <div
                className="proj-counter absolute"
                style={{
                  width: `${S}cqw`,
                  height: `${S}cqw`,
                  marginLeft: `${-S / 2}cqw`,
                  marginTop: `${-S / 2}cqw`,
                }}
              >
                <div className="proj-pop h-full w-full" style={{ animationDelay: `${0.25 + i * 0.1}s` }}>
                  <div
                    className="proj-node flex h-full w-full flex-col items-center justify-center gap-[0.6cqw] rounded-full text-center transition-transform duration-300 hover:scale-110"
                    style={{
                      background: "radial-gradient(circle at 50% 25%, #0e2c96 0%, #061244 70%)",
                      border: "0.3cqw solid rgba(125,120,255,.8)",
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    <Glyph icon={it.icon} size={`${S * 0.34}cqw`} color={it.color} />
                    <span
                      className="px-[1cqw] font-medium leading-tight text-slate-100"
                      style={{ fontSize: "max(9px, 2.2cqw)" }}
                    >
                      {it.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ====================================================================
   DETAILS CARD (left side)
   ==================================================================== */
const rise = (i) => ({ animationDelay: `${i * 90}ms` });

function Details({ project: p }) {
  let step = 0;
  return (
    <div>
      <span
        className="proj-rise inline-flex rounded-full border border-sky-400/50 bg-[#06164a]/70 px-5 py-1.5 text-sm font-medium text-slate-100 shadow-[0_0_14px_rgba(40,130,255,.3)]"
        style={rise(step++)}
      >
        {p.badge}
      </span>

      <h3 className="proj-rise mt-5 text-3xl font-bold leading-tight md:text-[28px] lg:text-[40px]" style={rise(step++)}>
        <span className="bg-gradient-to-r from-[#3ee0ff] via-[#4aa8ff] to-[#8a63ff] bg-clip-text text-transparent">
          {p.title}
        </span>
        {p.tagline && <span className="text-white"> – {p.tagline}</span>}
      </h3>

      <p className="proj-rise mt-4 max-w-[34rem] text-base leading-relaxed text-slate-200 md:text-[15px] lg:text-[15px]" style={rise(step++)}>
        {p.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2.5">
        {(p.tech || []).map((t) => (
          <li
            key={t}
            className="proj-rise rounded-full border border-sky-500/45 bg-[#030c33]/80 px-4 py-1.5 text-sm font-medium text-slate-100 shadow-[0_0_10px_rgba(30,120,255,.2)]"
            style={rise(step++)}
          >
            {t}
          </li>
        ))}
      </ul>

      <ul className="mt-6 space-y-2.5">
        {(p.features || []).map((f, i) => {
          const text = typeof f === "string" ? f : f.text;
          const hl = typeof f === "string" ? null : f.highlight;
          return (
            <li key={i} className="proj-rise flex items-start gap-3 text-base text-slate-100 md:text-[15px] lg:text-[17px]" style={rise(step++)}>
              <Svg className="mt-1 h-5 w-5 shrink-0 text-sky-400" strokeWidth={2.6}>
                <path d="M20 6 9 17l-5-5" />
              </Svg>
              <span>
                {text}
                {hl && <span className="text-sky-300"> {hl}</span>}
              </span>
            </li>
          );
        })}
      </ul>

      {(p.liveUrl || p.codeUrl) && (
        <div className="proj-rise mt-8 flex flex-wrap items-center gap-4" style={rise(step++)}>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[120px] lg:min-w-[140px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1f7bff] to-[#4cc0ff] px-7 text-[13px] font-semibold text-white shadow-[0_8px_30px_rgba(30,120,255,.45)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              View Project
              <Svg className="h-4 w-4" strokeWidth={2.4}>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </Svg>
            </a>
          )}
          {p.codeUrl && (
            <a
              href={p.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[120px] lg:min-w-[140px] items-center justify-center gap-2.5 rounded-full border border-sky-400/60 bg-[#030c33]/70 px-7 text-[13px] font-semibold text-white transition hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,170,255,.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <Svg className="h-5 w-5">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </Svg>
              View Code
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ====================================================================
   STAR FIELD  (twinkling stars + shooting stars behind the section)
   ==================================================================== */
const seeded = (n) => {
  const x = Math.sin(n * 9301.7) * 10000;
  return x - Math.floor(x);
};

const STARS = Array.from({ length: 70 }, (_, i) => ({
  left: seeded(i + 1) * 100,
  top: seeded(i + 101) * 100,
  size: 1 + seeded(i + 201) * 2,
  dur: 2.6 + seeded(i + 301) * 4.5,
  delay: seeded(i + 401) * 6,
  glow: seeded(i + 501) > 0.72,
  tint: i % 3 === 0 ? "#bfe6ff" : "#ffffff",
}));

const SHOOTING = [
  { left: 8, top: 6, dur: 7, delay: 1, len: 130 },
  { left: 42, top: 2, dur: 9, delay: 4.5, len: 110 },
  { left: 70, top: 14, dur: 8, delay: 2.8, len: 150 },
  { left: 24, top: 38, dur: 11, delay: 7, len: 100 },
  { left: 88, top: 4, dur: 10, delay: 9, len: 120 },
];

function StarField() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {STARS.map((st, i) => (
        <span
          key={i}
          className="proj-star absolute rounded-full"
          style={{
            left: `${st.left}%`,
            top: `${st.top}%`,
            width: st.size,
            height: st.size,
            background: st.tint,
            boxShadow: st.glow ? "0 0 6px 1px rgba(150,210,255,.75)" : "none",
            animationDuration: `${st.dur}s`,
            animationDelay: `${st.delay}s`,
          }}
        />
      ))}

      {SHOOTING.map((sh, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${sh.left}%`, top: `${sh.top}%`, transform: "rotate(32deg)" }}
        >
          <div
            className="proj-shoot relative h-[2px] rounded-full"
            style={{
              width: sh.len,
              background: "linear-gradient(90deg, rgba(120,200,255,0), rgba(190,234,255,.95))",
              animationDuration: `${sh.dur}s`,
              animationDelay: `${sh.delay}s`,
            }}
          >
            <span
              className="absolute -right-[1px] top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full bg-white"
              style={{ boxShadow: "0 0 8px 2px rgba(130,210,255,.9)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ====================================================================
   FULL SECTION
   ==================================================================== */
export default function Projects({
  projects = PROJECTS,
  viewAllHref = "#all-projects",
  autoPlayMs = 10000, // set 0 to turn auto-slide off
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = projects.length;

  useEffect(() => {
    if (!autoPlayMs || count < 2 || paused) return undefined;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), autoPlayMs);
    return () => clearTimeout(t);
  }, [index, paused, autoPlayMs, count]);

  if (!count) return null;

  const current = Math.min(index, count - 1);
  const project = projects[current];
  const go = (i) => setIndex((i + count) % count);

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[#020619] text-white"
      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style>{`
        @import url('${FONTS}');
        @keyframes proj-spin { to { transform: rotate(360deg); } }
        @keyframes proj-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes proj-pop {
          from { opacity: 0; transform: scale(.15); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes proj-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes proj-ripple {
          0%   { transform: scale(.9);  opacity: .6; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes proj-glow {
          0%, 100% { box-shadow: 0 0 14px rgba(70,120,255,.45), inset 0 0 14px rgba(70,100,255,.25); }
          50%      { box-shadow: 0 0 28px rgba(110,140,255,.85), inset 0 0 20px rgba(110,110,255,.45); }
        }
        @keyframes proj-twinkle {
          0%, 100% { opacity: .12; transform: scale(.8); }
          50%      { opacity: .85; transform: scale(1.3); }
        }
        @keyframes proj-shoot {
          0%   { transform: translateX(-80px); opacity: 0; }
          2%   { opacity: 1; }
          13%  { transform: translateX(520px); opacity: 0; }
          100% { transform: translateX(520px); opacity: 0; }
        }
        .proj-star  { animation: proj-twinkle 4s ease-in-out infinite; }
        .proj-shoot { animation: proj-shoot 8s ease-out infinite; opacity: 0; }
        .proj-spin      { animation: proj-spin 70s linear infinite; }
        .proj-counter   { animation: proj-spin-rev 70s linear infinite; }
        .proj-spin-rev  { animation: proj-spin-rev 90s linear infinite; }
        .proj-spin-slow { animation: proj-spin 120s linear infinite; }
        .proj-ring      { animation: proj-spin 6s linear infinite; }
        .proj-pop       { animation: proj-pop .8s cubic-bezier(.2,.9,.3,1.25) backwards; }
        .proj-rise      { animation: proj-rise .6s ease backwards; }
        .proj-ripple    { animation: proj-ripple 3.2s ease-out infinite; }
        .proj-node      { animation: proj-glow 3.4s ease-in-out infinite; }
        .proj-orbit:hover .proj-spin,
        .proj-orbit:hover .proj-counter { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .proj-spin, .proj-counter, .proj-spin-rev, .proj-spin-slow,
          .proj-ring, .proj-ripple, .proj-node, .proj-star { animation: none !important; }
          .proj-shoot { display: none; }
        }
      `}</style>

      {/* background glow + hairlines */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 80% at 78% 55%, rgba(20,80,230,.28) 0%, transparent 70%), linear-gradient(180deg,#030a2e 0%,#020619 100%)",
        }}
      />
      <StarField />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />

      <div className="mx-auto max-w-[1500px] px-6 py-12 sm:px-10">
        {/* header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-4 text-3xl font-bold sm:text-5xl">
            <Svg className="h-9 w-9 text-sky-400 sm:h-10 sm:w-10" strokeWidth={1.8}>
              {ICONS.folder}
            </Svg>
            <span>
              
              <span className="bg-gradient-to-r from-[#3ea8ff] to-[#8a63ff] bg-clip-text text-transparent" style={handwriting}>
                {"My Projects"}
              </span>
            </span>
          </h2>

          <a
            href={viewAllHref}
            className="group inline-flex items-center gap-2 text-base font-semibold text-sky-400 transition hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
          >
            View All
            <Svg className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={2.4}>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </Svg>
          </a>
        </div>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-6 lg:gap-10">
          {/* LEFT: details card */}
          <div className="relative p-6 md:-mr-20 md:min-h-[420px] md:pr-[6.5rem] lg:-mr-44 lg:p-9 lg:pr-[13.25rem]">
            {/* box background: wider than the text and fades out behind the orbit */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[28px] border border-sky-500/30 bg-gradient-to-br from-[#06164a]/60 via-[#030c33]/50 to-transparent"
              style={{
                maskImage: "linear-gradient(to right, #000 0%, #000 60%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, #000 0%, #000 60%, transparent 100%)",
              }}
            />
            <div className="relative">
              <Details key={project.id} project={project} />
            </div>
          </div>

          {/* RIGHT: orbit + controls */}
          <div className="relative z-10 mx-auto w-full max-w-[340px] md:max-w-[420px] lg:max-w-[460px]">
            <Orbit key={project.id} project={project} />

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(current - 1)}
                  aria-label="Previous project"
                  className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-sky-500/50 bg-[#030c33]/80 text-sky-300 shadow-[0_0_16px_rgba(30,120,255,.35)] transition hover:border-sky-300 hover:text-white lg:-left-4"
                >
                  <Svg className="h-6 w-6" strokeWidth={2.4}>
                    <path d="m15 18-6-6 6-6" />
                  </Svg>
                </button>
                <button
                  type="button"
                  onClick={() => go(current + 1)}
                  aria-label="Next project"
                  className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-sky-500/50 bg-[#030c33]/80 text-sky-300 shadow-[0_0_16px_rgba(30,120,255,.35)] transition hover:border-sky-300 hover:text-white lg:-right-4"
                >
                  <Svg className="h-6 w-6" strokeWidth={2.4}>
                    <path d="m9 18 6-6-6-6" />
                  </Svg>
                </button>
              </>
            )}

            {/* dots */}
            {count > 1 && (
              <div className="mt-2 flex items-center justify-center gap-3">
                {projects.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${p.title}`}
                    aria-current={i === current}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-7 bg-sky-400 shadow-[0_0_10px_rgba(56,170,255,.9)]"
                        : "w-2.5 bg-slate-600 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}