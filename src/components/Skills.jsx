import React, { useEffect, useRef, useState } from "react";

/**
 * Skills — mind-map style skills section with animated "light" flowing
 * along every connector line. Matches the Hero / About dark-blue neon style.
 * React + Tailwind CSS v3. No other dependencies.
 *
 *   <Skills />
 *   <Skills viewAllHref="/skills" />
 */

const FONTS =
  "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Outfit:wght@400;500;600;700;800&display=swap";

const handwriting = {
  fontFamily: "'Caveat', 'Segoe Print', cursive",
  color: "#13c7eb",
  textShadow: "0 0 12px rgba(56,170,255,.55), 0 0 2px rgba(120,210,255,.9)",
};

/* map canvas is 1000 x 310 — convert to % for absolute positioning */
const W = 1000;
const H = 310;
const at = (x, y) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

/* ---------- connector lines (SVG coordinates, 1000 x 310) ---------- */
const LINES = [
  // center -> React / Node / Mongo / Other
  { id: "l-react", d: "M500 128 C 480 92, 468 83, 443 83", dur: 2.4, delay: 0 },
  { id: "l-node", d: "M590 128 C 612 92, 624 83, 651 83", dur: 2.4, delay: 0.4 },
  { id: "l-mongo", d: "M590 170 C 612 204, 624 212, 654 212", dur: 2.4, delay: 0.8 },
  {
    id: "l-other",
    d: "M498 168 C 470 206, 448 216, 400 216 L 215 216 C 150 216, 120 212, 86 208",
    dur: 5,
    delay: 1.2,
  },
  // branch labels
  { id: "l-front", d: "M298 90 C 262 96, 232 124, 190 126", dur: 2.2, delay: 1.0, arrow: false },
  {
    id: "l-back",
    d: "M797 83 C 815 83, 820 98, 842 96 C 866 94, 890 98, 914 90",
    dur: 2.6,
    delay: 1.4,
    arrow: [914, 90],
  },
  {
    id: "l-data",
    d: "M823 212 C 845 212, 850 228, 872 226 C 894 224, 906 227, 916 224",
    dur: 2.6,
    delay: 1.8,
    arrow: [916, 224],
  },
];

function FlowLine({ id, d, dur, delay, arrow }) {
  return (
    <g>
      {/* dim base line */}
      <path
        id={id}
        d={d}
        fill="none"
        stroke="rgba(56,170,255,.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 3px rgba(56,170,255,.6))" }}
      />
      {arrow && (
        <path
          d={`M${arrow[0] - 11} ${arrow[1] - 8} L${arrow[0]} ${arrow[1]} L${arrow[0] - 12} ${arrow[1] + 5}`}
          fill="none"
          stroke="rgba(56,170,255,.8)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {/* travelling light streak */}
      <path
        d={d}
        pathLength="100"
        fill="none"
        stroke="#9be8ff"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="skills-flow"
        style={{
          animationDuration: `${dur}s`,
          animationDelay: `${delay}s`,
          filter: "drop-shadow(0 0 5px #4cc6ff) drop-shadow(0 0 10px #2f8dff)",
        }}
      />
      {/* glowing head */}
      <circle
        r="3.4"
        fill="#e6fbff"
        opacity="0"
        style={{ filter: "drop-shadow(0 0 6px #4cc6ff) drop-shadow(0 0 12px #2f8dff)" }}
      >
        <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite">
          <mpath href={`#${id}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.08;0.92;1"
          dur={`${dur}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

/* ---------- brand icons (simple inline SVG) ---------- */
const ReactIcon = () => (
  <svg viewBox="-12 -12 24 24" className="h-full w-full" fill="none" stroke="#4cc6ff" strokeWidth="1.1">
    <ellipse rx="10" ry="4" />
    <ellipse rx="10" ry="4" transform="rotate(60)" />
    <ellipse rx="10" ry="4" transform="rotate(120)" />
    <circle r="1.8" fill="#4cc6ff" stroke="none" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="rgba(108,194,74,.15)" stroke="#6cc24a" strokeWidth="1.8" strokeLinejoin="round" />
    <text x="12" y="15.2" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#6cc24a" fontFamily="Outfit, sans-serif">
      JS
    </text>
  </svg>
);

const MongoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    <path
      d="M12 1.5 C16 6.5 18 11 16 16 C15 18.5 13.6 20 12.4 21 L12.4 23.5 L11.6 23.5 L11.6 21 C10.4 20 9 18.5 8 16 C6 11 8 6.5 12 1.5 Z"
      fill="#3fa34d"
    />
    <path d="M12 6 L12 20" stroke="#b6e6a8" strokeWidth=".9" strokeLinecap="round" opacity=".8" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="2.5" transform="rotate(45 12 12)" fill="#f05133" />
    <path d="M12 7.6 V16.4 M12 12 L15.8 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="12" cy="7.4" r="1.4" fill="#fff" />
    <circle cx="12" cy="16.6" r="1.4" fill="#fff" />
    <circle cx="16" cy="8.8" r="1.4" fill="#fff" />
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-full w-full"
    fill="none"
    stroke="#fff"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    {/* blue snake */}
    <path
      d="M11.9 2.5c-3.4 0-3.2 1.5-3.2 1.5v1.6H12v.5H7.4S5 5.8 5 9.6s2.1 3.7 2.1 3.7h1.2v-1.8s-.1-2.1 2.1-2.1H14s2 0 2-2V4.5s.3-2-2.1-2z"
      fill="#3b8bd9"
    />
    <circle cx="10.3" cy="4.3" r=".65" fill="#fff" />
    {/* yellow snake (same shape, rotated 180deg) */}
    <g transform="rotate(180 12 12)">
      <path
        d="M11.9 2.5c-3.4 0-3.2 1.5-3.2 1.5v1.6H12v.5H7.4S5 5.8 5 9.6s2.1 3.7 2.1 3.7h1.2v-1.8s-.1-2.1 2.1-2.1H14s2 0 2-2V4.5s.3-2-2.1-2z"
        fill="#ffd43b"
      />
      <circle cx="10.3" cy="4.3" r=".65" fill="#fff" />
    </g>
  </svg>
);

const VsCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    <path d="M17 2 L22 4.5 V19.5 L17 22 L8 13.5 Z" fill="#2f9bff" />
    <path d="M3.5 8.5 L6 6.5 L11 12 L6 17.5 L3.5 15.5 L7 12 Z" fill="#1c6fd0" />
    <path d="M8 13.5 L17 22 V2 L8 10.5 Z" fill="#53b4ff" opacity=".9" />
  </svg>
);

/* ---------- building blocks ---------- */
const Chip = ({ children }) => (
  <span className="whitespace-nowrap rounded-full border border-sky-500/45 bg-[#030c33]/80 px-[1.3cqw] py-[0.45cqw] text-[1.1cqw] font-medium text-slate-100 shadow-[0_0_10px_rgba(30,120,255,.2)] transition hover:border-sky-300 hover:shadow-[0_0_16px_rgba(56,170,255,.5)]">
    {children}
  </span>
);

const ChipRow = ({ x, y, items }) => (
  <div
    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.9cqw]"
    style={at(x, y)}
  >
    {items.map((t) => (
      <Chip key={t}>{t}</Chip>
    ))}
  </div>
);

const PillNode = ({ x, y, w, label, children }) => (
  <div
    className="absolute flex h-[5.6cqw] -translate-x-1/2 -translate-y-1/2 items-center rounded-full border border-sky-400/70 bg-[#040e38] pr-[1.6cqw] shadow-[0_0_22px_rgba(30,120,255,.4),inset_0_0_14px_rgba(30,120,255,.25)] transition hover:border-sky-300 hover:shadow-[0_0_30px_rgba(56,170,255,.65)]"
    style={{ ...at(x, y), width: `${w / 10}cqw` }}
  >
    <span className="flex h-[5.6cqw] w-[5.6cqw] shrink-0 items-center justify-center rounded-full border border-sky-400/70 bg-[#06164a] shadow-[0_0_14px_rgba(56,170,255,.5)]">
      <span className="block h-[3.2cqw] w-[3.2cqw]">{children}</span>
    </span>
    <span className="flex-1 text-center text-[1.5cqw] font-semibold text-white">{label}</span>
  </div>
);

const Tile = ({ x, y, label, children }) => (
  <div
    className="absolute flex h-[7.4cqw] w-[7.6cqw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[0.5cqw] rounded-[1.6cqw] border border-sky-400/60 bg-[#040e38] shadow-[0_0_18px_rgba(30,120,255,.35),inset_0_0_12px_rgba(30,120,255,.2)] transition hover:-translate-y-[55%] hover:border-sky-300 hover:shadow-[0_0_26px_rgba(56,170,255,.6)]"
    style={at(x, y)}
  >
    <span className="block h-[3.4cqw] w-[3.4cqw]">{children}</span>
    <span className="text-[1.1cqw] font-medium text-slate-100">{label}</span>
  </div>
);

const Label = ({ x, y, rotate = -6, size = "2.7cqw", children }) => (
  <p
    className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold"
    style={{ ...at(x, y), ...handwriting, fontSize: size, transform: `translate(-50%,-50%) rotate(${rotate}deg)` }}
  >
    {children}
  </p>
);

/* ---------- SKILL RAIN: extra skills fall and pile up at the bottom ---------- */
const RAIN_SKILLS = [
  ["TypeScript", "#3b82f6"],
  ["Next.js", "#e5e7eb"],
  ["Redux Toolkit", "#a78bfa"],
  ["Vite", "#facc15"],
  ["REST APIs", "#38bdf8"],
  ["JWT Auth", "#f472b6"],
  ["Firebase", "#fb923c"],
  ["MySQL", "#60a5fa"],
  ["PostgreSQL", "#6ea8ff"],
  ["Python", "#fbbf24"],
  ["Java", "#f87171"],
  ["C++", "#818cf8"],
  ["Bootstrap", "#a855f7"],
  ["Sass", "#f472b6"],
  ["Figma", "#34d399"],
  ["Postman", "#fb923c"],
  ["Docker", "#38bdf8"],
  ["Vercel", "#e5e7eb"],
  ["Netlify", "#2dd4bf"],
  ["npm", "#f87171"],
  ["Responsive Design", "#4cc6ff"],
  ["Framer Motion", "#c084fc"],
  ["Axios", "#8b5cf6"],
  ["Socket.io", "#cbd5e1"],
  ["Jest", "#f87171"],
  ["Stripe", "#818cf8"],
  ["GraphQL", "#f472b6"],
  ["Material UI", "#38bdf8"],
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const RainChip = ({ name, color }) => (
  <span
    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border bg-[#030c33]/90 px-4 py-1.5 text-sm font-medium text-slate-100"
    style={{ borderColor: `${color}aa`, boxShadow: `0 0 12px ${color}55` }}
  >
    <span
      className="h-2 w-2 rounded-full"
      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
    />
    {name}
  </span>
);

function SkillRain() {
  const wrapRef = useRef(null);
  const chipRefs = useRef([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const COL = 4; // pile height-map resolution (px)
    const G = 0.5; // gravity
    let cw = 0;
    let ch = 0;
    let heights = [];
    let bodies = [];
    let queue = [];
    let phase = "rain"; // rain -> hold -> fade -> rain ...
    let timer = 0;
    let spawnAcc = 0;
    let raf = 0;
    let last = 0;

    const init = () => {
      cw = wrap.clientWidth;
      ch = wrap.clientHeight;
      heights = new Array(Math.ceil(cw / COL) + 1).fill(0);
      bodies = chipRefs.current.filter(Boolean).map((el) => {
        el.style.transition = "none";
        el.style.opacity = "0";
        el.style.transform = "translate3d(-9999px,0,0)";
        return { el, w: 0, h: 0, x: 0, y: 0, vy: 0, vr: 0, rot: 0, rest: 0, state: "idle" };
      });
      queue = shuffle(bodies.map((_, i) => i));
      phase = "rain";
      timer = 0;
      spawnAcc = 0;
    };

    const spawn = () => {
      const b = bodies[queue.pop()];
      b.w = b.el.offsetWidth;
      b.h = b.el.offsetHeight;
      b.x = 8 + Math.random() * Math.max(1, cw - b.w - 16);
      b.y = -b.h - Math.random() * 30;
      b.vy = 1 + Math.random() * 2;
      b.vr = (Math.random() - 0.5) * 1.4;
      b.rot = (Math.random() - 0.5) * 40;
      b.rest = (Math.random() - 0.5) * 7;
      b.state = "fall";
      b.el.style.opacity = "1";
    };

    const step = (b, dt) => {
      if (b.state === "fall") {
        b.vy += G * dt;
        b.y += b.vy * dt;
        b.rot += b.vr * dt;

        const c0 = Math.max(0, Math.floor(b.x / COL));
        const c1 = Math.min(heights.length - 1, Math.floor((b.x + b.w) / COL));
        let top = 0;
        for (let c = c0; c <= c1; c++) if (heights[c] > top) top = heights[c];
        const surface = ch - top;

        if (b.y + b.h >= surface) {
          b.y = surface - b.h;
          if (b.vy > 4) {
            // small bounce
            b.vy = -b.vy * 0.3;
            b.vr *= 0.4;
          } else {
            // settle into the pile
            b.state = "rest";
            b.vy = 0;
            const nh = ch - b.y;
            for (let c = c0; c <= c1; c++) heights[c] = nh;
          }
        }
      } else if (b.state === "rest") {
        b.rot += (b.rest - b.rot) * 0.2 * dt;
      } else {
        return;
      }
      b.el.style.transform = `translate3d(${b.x}px,${b.y}px,0) rotate(${b.rot}deg)`;
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const ms = Math.min(50, now - last);
      last = now;
      const dt = ms / 16.667;

      if (phase === "rain") {
        spawnAcc += ms;
        if (queue.length && spawnAcc >= 300) {
          spawnAcc = 0;
          spawn();
        }
        const tallest = Math.max(...heights);
        const settled = bodies.every((b) => b.state !== "fall");
        if ((!queue.length && settled) || (queue.length && tallest > ch - 70)) {
          phase = "hold";
          timer = 0;
        }
      } else if (phase === "hold") {
        timer += ms;
        if (timer > 3500) {
          phase = "fade";
          timer = 0;
          bodies.forEach((b) => {
            b.el.style.transition = "opacity .7s ease";
            b.el.style.opacity = "0";
          });
        }
      } else if (phase === "fade") {
        timer += ms;
        if (timer > 800) init();
      }

      bodies.forEach((b) => step(b, dt));
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    init();
    let lastW = wrap.clientWidth;

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.25 }
    );
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      if (wrap.clientWidth !== lastW) {
        lastW = wrap.clientWidth;
        init();
      }
    });
    ro.observe(wrap);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <div className="mt-2">
      <p className="text-3xl font-bold sm:text-4xl" style={handwriting}>
        More Skills
      </p>

      {reduced ? (
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {RAIN_SKILLS.map(([name, color]) => (
            <RainChip key={name} name={name} color={color} />
          ))}
        </div>
      ) : (
        <div
          ref={wrapRef}
          className="relative h-[300px] overflow-hidden sm:h-[230px]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 14%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 14%)",
          }}
          aria-label="More skills"
        >
          {/* rain streaks */}
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="skills-streak absolute top-0 w-px bg-gradient-to-b from-transparent via-sky-400/40 to-transparent"
              style={{
                left: `${(i * 6.3 + 3) % 100}%`,
                height: `${50 + ((i * 17) % 50)}px`,
                animationDuration: `${1.6 + (i % 5) * 0.35}s`,
                animationDelay: `${(i * 0.37) % 2}s`,
              }}
            />
          ))}

          {/* floor glow */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-sky-500/20 to-transparent" />

          {/* falling chips (moved by the physics loop) */}
          {RAIN_SKILLS.map(([name, color], i) => (
            <div
              key={name}
              ref={(el) => (chipRefs.current[i] = el)}
              className="absolute left-0 top-0 will-change-transform"
              style={{ opacity: 0, transform: "translate3d(-9999px,0,0)" }}
            >
              <RainChip name={name} color={color} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- FULL SECTION ---------- */
export default function Skills({ viewAllHref = "#all-skills", onViewAll }) {
  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden bg-[#020619] text-white"
      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('${FONTS}');
        @keyframes skills-flow {
          from { stroke-dashoffset: 12; }
          to   { stroke-dashoffset: -88; }
        }
        .skills-flow {
          stroke-dasharray: 12 200;
          stroke-dashoffset: 12;
          animation-name: skills-flow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes skills-pulse {
          0%, 100% { box-shadow: 0 0 28px rgba(40,120,255,.55), inset 0 0 22px rgba(40,120,255,.35); }
          50%      { box-shadow: 0 0 50px rgba(70,160,255,.85), inset 0 0 30px rgba(70,160,255,.5); }
        }
        @keyframes skills-streak {
          from { transform: translateY(-80px); opacity: 0; }
          15%  { opacity: 1; }
          to   { transform: translateY(320px); opacity: 0; }
        }
        .skills-streak {
          animation-name: skills-streak;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .skills-flow, .skills-core, .skills-streak { animation: none !important; }
        }
      `}</style>

      {/* background glow + hairlines */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40% 80% at 55% 50%, rgba(20,80,230,.25) 0%, transparent 70%), linear-gradient(180deg,#030a2e 0%,#020619 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />

      <div className="mx-auto max-w-[1500px] px-6 py-10 sm:px-10">
        {/* header: title + View All */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-bold sm:text-4xl">
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 text-sky-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="bg-gradient-to-r from-[#3ee0ff] to-[#4a7bff] bg-clip-text text-transparent"
              style={handwriting}>
                {"Skills"}
              </span>
            </h2>
            <span className="mt-2 block h-[3px] w-16 rounded-full bg-gradient-to-r from-sky-400 to-transparent" />
          </div>

          <a
            href={viewAllHref}
            onClick={onViewAll}
            className="group inline-flex items-center gap-2 rounded-full border border-sky-500/60 bg-[#030c33]/70 px-5 py-2 text-sm font-semibold text-slate-100 shadow-[0_0_14px_rgba(30,120,255,.3)] transition hover:border-sky-300 hover:text-sky-200 hover:shadow-[0_0_22px_rgba(56,170,255,.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:text-base"
          >
            View All
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* mind map (scrolls sideways on small screens so nothing gets tiny) */}
        <div className="-mx-6 mt-4 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <div className="relative mx-auto aspect-[1000/310] w-full min-w-[900px] max-w-[1200px] [container-type:inline-size]">
            {/* animated connector lines */}
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              {LINES.map((l) => (
                <FlowLine key={l.id} {...l} />
              ))}
            </svg>

            {/* hand-written labels */}
            <Label x={232} y={104} rotate={-6}>Frontend</Label>
            <Label x={140} y={184} rotate={-9}>Other Skills</Label>
            <Label x={876} y={70} rotate={-7}>Backend</Label>
            <Label x={892} y={200} rotate={-6}>Database</Label>

            {/* center node */}
            <div
              className="skills-core absolute flex h-[9.6cqw] w-[9.6cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-sky-400 bg-[#040e38]"
              style={{ ...at(545, 148), animation: "skills-pulse 3s ease-in-out infinite" }}
            >
              <span className="text-[2.1cqw] font-bold text-white">Skills</span>
            </div>

            {/* main nodes */}
            <PillNode x={370} y={83} w={145} label="React"><ReactIcon /></PillNode>
            <PillNode x={722} y={83} w={146} label="Node.js"><NodeIcon /></PillNode>
            <PillNode x={738} y={212} w={169} label="MongoDB"><MongoIcon /></PillNode>

            {/* chips */}
            <ChipRow x={322} y={141} items={["HTML", "CSS", "JS", "Tailwind CSS"]} />
            <ChipRow x={729} y={133} items={["Express.js", "API"]} />
            <ChipRow x={745} y={266} items={["MongoDB", "Mongoose"]} />

            {/* other skills tiles */}
            <Tile x={155} y={258} label="Git"><GitIcon /></Tile>
            <Tile x={241} y={258} label="GitHub"><GithubIcon /></Tile>
            <Tile x={327} y={258} label="Python"><PythonIcon /></Tile>
            <Tile x={413} y={258} label="VS Code"><VsCodeIcon /></Tile>
          </div>
        </div>

        {/* extra skills rain down and collect at the bottom */}
        <SkillRain />
      </div>
    </section>
  );
}