import React from "react";
import assets from "../assets/assets";


/**
 * About — "About Me" section that matches the Hero's dark-blue neon style.
 * React + Tailwind CSS v3. No other dependencies.
 *
 *   <About />
 *   <About image="/about.png" />   // optional: use your own illustration instead of the built-in SVG
 */

const FONTS =
  "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Outfit:wght@400;500;600;700;800&display=swap";

  const handwriting = {
  fontFamily: "'Caveat', 'Segoe Print', cursive",
  color: "#13c7eb",
  textShadow: "0 0 14px rgba(56,170,255,.55), 0 0 2px rgba(120,210,255,.9)",
};

const neon = { filter: "drop-shadow(0 0 5px rgba(56,170,255,.8))" };

const Icon = ({ children, className = "h-5 w-5" }) => (
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

const traits = [
  {
    label: "Creative",
    icon: (
      <>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </>
    ),
  },
  {
    label: "Focused",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
  },
  {
    label: "Fast Learner",
    icon: (
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    ),
  },
  {
    label: "Team Player",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

/* ---------- code window used in the illustration ---------- */
// const COLORS = ["#ff9f43", "#4cc6ff", "#8a63ff", "#ff6b81", "#3ee0a0"];

// function CodeWindow({ x, y, w, h, rows }) {
//   return (
//     <g>
//       <rect
//         x={x}
//         y={y}
//         width={w}
//         height={h}
//         rx="8"
//         fill="#06143f"
//         fillOpacity=".85"
//         stroke="#3aa0ff"
//         strokeWidth="2"
//         style={{ filter: "drop-shadow(0 0 6px rgba(56,170,255,.7))" }}
//       />
//       <circle cx={x + 10} cy={y + 9} r="2" fill="#4cc6ff" opacity=".7" />
//       <circle cx={x + 18} cy={y + 9} r="2" fill="#4cc6ff" opacity=".7" />
//       {rows.map(([indent, len, c], i) => (
//         <rect
//           key={i}
//           x={x + 12 + indent * 8}
//           y={y + 22 + i * 10}
//           width={len}
//           height="4"
//           rx="2"
//           fill={COLORS[c]}
//         />
//       ))}
//     </g>
//   );
// }

// const Code = ({ d, ...rest }) => (
//   <path
//     d={d}
//     fill="none"
//     stroke="#4cc6ff"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...rest}
//   />
// );

/* ---------- built-in illustration ---------- */
// function AboutArt() {
//   return (
//     <svg
//       viewBox="0 0 600 320"
//       className="h-auto w-full"
//       role="img"
//       aria-label="Developer working on a laptop surrounded by code windows"
//     >
//       <defs>
//         <radialGradient id="about-glow" cx="50%" cy="55%" r="55%">
//           <stop offset="0" stopColor="#1b4dff" stopOpacity=".55" />
//           <stop offset="1" stopColor="#020619" stopOpacity="0" />
//         </radialGradient>
//         <linearGradient id="about-desk" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0" stopColor="#1a3fe0" />
//           <stop offset="1" stopColor="#2f8dff" />
//         </linearGradient>
//       </defs>

//       <rect width="600" height="320" fill="url(#about-glow)" />

//       {/* floating code windows */}
//       <CodeWindow
//         x="20"
//         y="58"
//         w="150"
//         h="105"
//         rows={[[0, 40, 0], [1, 70, 1], [1, 55, 2], [2, 80, 3], [1, 45, 1], [0, 60, 4], [1, 90, 1], [0, 30, 0]]}
//       />
//       <CodeWindow
//         x="190"
//         y="22"
//         w="135"
//         h="88"
//         rows={[[0, 55, 1], [1, 75, 2], [1, 50, 0], [2, 85, 1], [1, 40, 4], [0, 65, 3]]}
//       />
//       <CodeWindow
//         x="400"
//         y="128"
//         w="150"
//         h="74"
//         rows={[[0, 70, 1], [1, 90, 2], [1, 55, 4], [0, 40, 0], [1, 80, 1]]}
//       />

//       {/* speech bubble with </> */}
//       <g style={{ filter: "drop-shadow(0 0 6px rgba(56,170,255,.7))" }}>
//         <path
//           d="M360 16 H450 Q462 16 462 28 V66 Q462 78 450 78 H400 L384 96 L386 78 H360 Q348 78 348 66 V28 Q348 16 360 16 Z"
//           fill="#06143f"
//           fillOpacity=".85"
//           stroke="#3aa0ff"
//           strokeWidth="2.2"
//         />
//       </g>
//       <Code d="M385 38 L373 47 L385 56" strokeWidth="4" />
//       <Code d="M425 38 L437 47 L425 56" strokeWidth="4" />
//       <Code d="M410 34 L400 60" strokeWidth="3.5" />

//       {/* handwriting + arrow */}
//       <text
//         x="552"
//         y="62"
//         transform="rotate(-18 552 62)"
//         fontFamily="'Caveat', 'Segoe Print', cursive"
//         fontSize="30"
//         fontWeight="500"
//         fill="#13c7eb"
//         style={{ filter: "drop-shadow(0 0 6px rgba(56,170,255,.7))" }}
//       >
//         Better
//       </text>
//       <text
//         x="540"
//         y="92"
//         transform="rotate(-18 540 92)"
//         fontFamily="'Caveat', 'Segoe Print', cursive"
//         fontSize="30"
//         fontWeight="500"
//         fill="#13c7eb"
//         style={{ filter: "drop-shadow(0 0 6px rgba(56,170,255,.7))" }}
//       >
//         Everyday
//       </text>
//       <Code d="M588 120 Q590 190 520 218" strokeWidth="2.2" />
//       <Code d="M520 218 L536 208 M520 218 L538 224" strokeWidth="2.2" />

//       {/* desk */}
//       <rect x="10" y="286" width="580" height="14" rx="7" fill="url(#about-desk)" />

//       {/* left plant */}
//       <g>
//         <path d="M62 286 Q40 250 58 214 Q80 240 70 286 Z" fill="#17a6c9" />
//         <path d="M70 286 Q72 240 98 222 Q106 252 82 286 Z" fill="#2b7fff" />
//         <path d="M58 286 Q36 270 30 246 Q56 252 66 286 Z" fill="#0f7fa8" />
//         <path d="M82 286 Q104 268 112 252 Q90 254 80 286 Z" fill="#1d5fe0" />
//       </g>

//       {/* chair */}
//       <rect x="196" y="172" width="64" height="116" rx="16" fill="#0b1a5a" stroke="#1a3fe0" strokeWidth="2" />

//       {/* hoodie body */}
//       <path d="M214 288 C214 228 240 206 290 206 C340 206 366 228 366 288 Z" fill="#2f6bff" />
//       <path d="M248 202 Q290 186 332 202 Q338 228 290 236 Q242 228 248 202 Z" fill="#2457e6" />
//       <path d="M278 232 L276 258 M302 232 L304 258" stroke="#bcd3ff" strokeWidth="2" strokeLinecap="round" />

//       {/* head */}
//       <circle cx="257" cy="156" r="6" fill="#f0a878" />
//       <circle cx="323" cy="156" r="6" fill="#f0a878" />
//       <circle cx="290" cy="152" r="34" fill="#f6b88c" />
//       <path
//         d="M254 152 C246 108 300 98 326 124 C334 136 332 146 328 152 C316 132 292 128 272 136 C262 141 258 146 254 152 Z"
//         fill="#0c1230"
//       />
//       <circle cx="279" cy="158" r="2.6" fill="#0c1230" />
//       <circle cx="301" cy="158" r="2.6" fill="#0c1230" />
//       <path d="M281 170 Q290 177 299 170" stroke="#0c1230" strokeWidth="2.4" fill="none" strokeLinecap="round" />

//       {/* mug */}
//       <rect x="234" y="262" width="28" height="24" rx="5" fill="#1f3ea8" />
//       <path d="M262 268 Q276 270 262 280" stroke="#1f3ea8" strokeWidth="4" fill="none" strokeLinecap="round" />
//       <path d="M240 256 Q244 250 240 246 M250 256 Q254 250 250 246" stroke="#7fd0ff" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".7" />

//       {/* arm */}
//       <path d="M328 238 Q352 262 378 270" stroke="#2f6bff" strokeWidth="16" fill="none" strokeLinecap="round" />
//       <circle cx="384" cy="272" r="8" fill="#f6b88c" />

//       {/* laptop */}
//       <g style={{ filter: "drop-shadow(0 6px 14px rgba(20,100,255,.6))" }}>
//         <path d="M356 214 L458 196 L470 270 L362 276 Z" fill="#3b6cff" stroke="#7fb4ff" strokeWidth="2.5" strokeLinejoin="round" />
//         <path d="M346 276 L474 268 L486 286 L352 288 Z" fill="#2f8dff" />
//       </g>
//       <Code d="M398 234 L388 244 L398 254" stroke="#e8f3ff" strokeWidth="3.5" />
//       <Code d="M428 232 L438 242 L428 252" stroke="#e8f3ff" strokeWidth="3.5" />
//       <Code d="M418 228 L408 258" stroke="#e8f3ff" strokeWidth="3" />
//       <circle cx="388" cy="272" r="8" fill="#f6b88c" />

//       {/* right plant + pot */}
//       <path d="M538 268 Q520 236 540 206 Q556 232 548 268 Z" fill="#17a6c9" />
//       <path d="M548 268 Q552 236 574 222 Q580 246 560 268 Z" fill="#2b7fff" />
//       <path d="M530 268 H564 L560 286 H534 Z" fill="#2f6bff" />

//       {/* sparkles */}
//       {[[150, 190], [330, 126], [520, 50], [30, 200]].map(([cx, cy], i) => (
//         <circle key={i} cx={cx} cy={cy} r="2" fill="#7fd0ff" opacity=".8" />
//       ))}
//     </svg>
//   );
// }

/* ---------- FULL ABOUT SECTION ---------- */
export default function About({ image = null }) {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#020619] text-white"
      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
    >
      <style>{`@import url('${FONTS}');`}</style>

      {/* background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 90% at 75% 50%, rgba(20,80,230,.28) 0%, transparent 70%), linear-gradient(180deg,#030a2e 0%,#020619 100%)",
        }}
      />
      {/* top + bottom hairlines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />

      <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
        {/* LEFT */}
        <div className="relative z-10">
          <h2 className="flex items-center gap-4 text-4xl font-bold sm:text-5xl">
            <Icon className="h-10 w-10 text-sky-400 sm:h-12 sm:w-12">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </Icon>
            <span style={handwriting}>
              About{" "}
              <span className="bg-gradient-to-r from-[#3ea8ff] to-[#6a63ff] bg-clip-text text-transparent" style={handwriting}>
                Me
              </span>
            </span>
          </h2>

          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-slate-200 sm:text-[15px]">
            I am a passionate web developer, always eager to learn new
            technologies and build creative solutions. I love turning ideas into
            real projects and enjoy working with modern web technologies.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {traits.map(({ label, icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2.5 rounded-full border border-sky-500/50 bg-[#030c33]/70 px-5 py-2.5 text-sm font-medium text-slate-100 shadow-[0_0_14px_rgba(30,120,255,.25)] transition hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,170,255,.45)]"
              >
                <Icon className="h-5 w-5 text-sky-400">{icon}</Icon>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="relative">
                <img src={assets.aboutImg} alt="" className="object-contain mix-blend-plus-darker" />


                {/* right handwriting */}
      <p
        className="absolute right-[89%] top-[-11%] -rotate-[9deg] whitespace-pre-line text-[2cqw] font-bold leading-[1.08] "
        style={handwriting}
      >
        {"Better Everyday"}
      </p>

      {/* <svg
        viewBox="0 0 70 56"
        className="absolute right-[89.5%] top-[10%] w-[9%]"
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
      </svg> */}

      <svg
        viewBox="0 0 90 40"
        className="absolute right-[85.5%] top-[5%] w-[21%]"
        fill="none"
        stroke="#4cc6ff"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={neon}
        aria-hidden="true"
      >
        <path d="M4 34 Q40 26 86 6" />
      </svg>
          {/* {image ? (
            <img src={image} alt="About me illustration" className="h-auto w-full object-contain" />
          ) : (
            <AboutArt />
          )} */}
        </div>
      </div>
    </section>
  );
}
