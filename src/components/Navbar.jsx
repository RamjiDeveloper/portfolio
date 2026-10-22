import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Moon, Sun, Menu, X } from "lucide-react";
import assets from "../assets/assets";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

/* ------------------------------------------------------------------ */
/*  Beam ke liye lambe CSS values: Tailwind arbitrary class mein ye     */
/*  toot jaate hain, isliye inhe inline style ke roop mein rakha hai.   */
/* ------------------------------------------------------------------ */
const BEAM_FILTER =
  "blur(0.5px) drop-shadow(2px 0px 8px rgba(0, 117, 255, 0.4)) drop-shadow(1px 0px 2px rgba(0, 128, 255, 0.8)) drop-shadow(0px 0px 3px rgba(153, 204, 255, 0.4)) drop-shadow(2px 0px 8px rgba(137, 196, 255, 0.45)) drop-shadow(8px 0px 16px rgba(153, 204, 255, 0.5))";

const STRIKE_MASK =
  "linear-gradient(to right, transparent calc(0% + var(--active-element-mask-position)), black calc(15% + var(--active-element-mask-position)), black 80%, transparent)";

const STRIKE_SVG_BASE = {
  display: "block",
  overflow: "visible",
  height: 12,
  width: "calc(var(--active-element-width) * 2)",
};

const STRIKE_PATH =
  "M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5";

/* original ke 3 paths: ek sharp + do blur wale (glow ke liye) */
function StrikeLines() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
      {[0, 2, 4].map((blur) => (
        <path key={blur} d={STRIKE_PATH} style={blur ? { filter: `blur(${blur}px)` } : undefined} />
      ))}
    </g>
  );
}

/* ================================================================== */
/*  NAVBAR                                                             */
/* ================================================================== */
const Navbar = () => {
  const [active, setActive] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null); // desktop links ka wrapper (relative)
  const barRef = useRef(null); // .active-element
  const linkRefs = useRef([]);
  const activeIdx = useRef(0); // state ka copy (handlers ke liye)
  const busy = useRef(false);

  /* ---- button ke center ke hisaab se x position ---- */
  const getOffsetLeft = (index) => {
    const link = linkRefs.current[index];
    const nav = navRef.current;
    const bar = barRef.current;
    if (!link || !nav || !bar) return 0;
    const l = link.getBoundingClientRect();
    return l.left - nav.getBoundingClientRect().left + (l.width - bar.offsetWidth) / 2;
  };

  /* ---- first load: fonts ready hone par bar ko active link par rakho ---- */
  useEffect(() => {
    const bar = barRef.current;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      gsap.set(bar, { x: getOffsetLeft(activeIdx.current) });
      gsap.to(bar, { "--active-element-show": 1, duration: 0.2 });
    });

    const onResize = () => {
      if (!busy.current) gsap.set(bar, { x: getOffsetLeft(activeIdx.current) });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(bar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- click par beam animation ---- */
  const handleSelect = (index) => {
    setMenuOpen(false);

    const bar = barRef.current;
    const nav = navRef.current;
    const from = activeIdx.current;
    if (!bar || !nav || index === from || busy.current) {
      setActive(index);
      activeIdx.current = index;
      return;
    }

    busy.current = true;
    const x = getOffsetLeft(index);
    const spacing = Math.abs(x - getOffsetLeft(from));
    const maxWidth = nav.offsetWidth - 60;

    activeIdx.current = index;
    setActive(index);

    // peeche jaate waqt beam ko ulta kar do
    gsap.set(bar, { rotateY: index > from ? 0 : 180 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.killTweensOf(bar);
        gsap.set(bar, {
          rotateY: 0,
          x: getOffsetLeft(index),
          "--active-element-width": "0px",
          "--active-element-opacity": 0,
          "--active-element-scale-x": 1,
          "--active-element-scale-y": 1,
          "--active-element-strike-x": "0%",
          "--active-element-mask-position": "0%",
          "--active-element-show": 1,
        });
        busy.current = false;
      },
    });

    // 1) beam lamba hota hai
    tl.to(bar, {
      "--active-element-width": `${Math.min(spacing, maxWidth)}px`,
      duration: 0.3,
      ease: "none",
      onStart: () => gsap.to(bar, { "--active-element-opacity": 1, duration: 0.1 }),
    });

    // 2) beam sikud kar gayab ho jaata hai
    tl.to(bar, {
      "--active-element-scale-x": 0,
      "--active-element-scale-y": 0.25,
      "--active-element-width": "0px",
      duration: 0.3,
      onStart: () => {
        gsap.to(bar, { "--active-element-mask-position": "40%", duration: 0.5 });
        gsap.to(bar, { "--active-element-opacity": 0, delay: 0.45, duration: 0.25 });
      },
    });

    // bar naye link tak slide karta hai (beam ke saath-saath)
    gsap.to(bar, {
      x,
      "--active-element-strike-x": "-50%",
      duration: 0.6,
      ease: "none",
    });
  };

  /* ---------------- theme classes ---------------- */
  const linkClass = (i) => {
    const isActive = active === i;
    if (isActive) {
      return "font-semibold text-[#00fffc] drop-shadow-[0_0_10px_rgba(0,255,252,0.55)]";
    }
    return darkMode
      ? "text-slate-200 hover:-translate-y-0.5 hover:text-[#00fffc] hover:drop-shadow-[0_0_12px_rgba(0,255,252,0.7)]"
      : "text-slate-600 hover:-translate-y-0.5 hover:text-cyan-600 hover:drop-shadow-[0_0_10px_rgba(8,145,178,0.5)]";
  };

  return (
    <nav
      className={` sticky inset-x-0 top-0 z-50 w-full border-b border-cyan-500/60 px-4 py-3 backdrop-blur-md sm:px-8 md:px-12 lg:px-20 ${
        darkMode ? "bg-[#020b18]/90 text-white" : "bg-white/90 text-slate-900"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => handleSelect(0)}
          className="flex shrink-0 items-center gap-2 rounded-full border border-cyan-500/70 px-3 py-1"
        >
          <img
            src={assets.logo}
            alt="Ram Logo"
            className={`h-10 w-auto object-contain ${darkMode ? "mix-blend-screen" : ""}`}
          />
        </a>

        {/* Desktop navigation
            `isolate` zaroori hai: beam mix-blend-multiply use karta hai, isolate na ho
            to wo navbar ke dark background ke saath multiply hoke kala dikhega. */}
        <div ref={navRef} className="relative isolate z-[1] hidden md:block">
          <ul className="m-0 flex list-none items-center gap-6 p-0 lg:gap-10">
            {NAV_LINKS.map((link, i) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  ref={(el) => (linkRefs.current[i] = el)}
                  onClick={() => handleSelect(i)}
                  className={`group relative block px-1 py-2.5 text-base transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${linkClass(i)}`}
                >
                  {link}
                  {/* hover par neeche ek patli glowing line phailti hai (sirf non-active par) */}
                  {active !== i && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-1 bottom-1 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* .active-element */}
          <div
            ref={barRef}
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 left-0 h-[3px] w-9 rounded-sm opacity-[var(--active-element-show)] [--active-element-scale-x:1] [--active-element-scale-y:1] [--active-element-show:0] [--active-element-opacity:0] [--active-element-width:0px] [--active-element-strike-x:0%] [--active-element-mask-position:0%] ${
              darkMode ? "bg-white text-white" : "bg-cyan-500 text-cyan-500"
            }`}
          >
            {/* beam */}
            <svg
              viewBox="0 0 116 5"
              preserveAspectRatio="none"
              className="absolute right-0 top-1/2 block h-[5px] w-[var(--active-element-width)] -translate-y-1/2 overflow-visible opacity-[var(--active-element-opacity)] mix-blend-multiply"
              style={{ filter: BEAM_FILTER }}
            >
              <path
                d="M0.5 2.5L113 0.534929C114.099 0.515738 115 1.40113 115 2.5C115 3.59887 114.099 4.48426 113 4.46507L0.5 2.5Z"
                fill="url(#gradient-beam)"
              />
              <defs>
                <linearGradient id="gradient-beam" x1="2" y1="2.5" x2="115" y2="2.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0270ff" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>

            {/* strike (bijli jaisi zig-zag line) */}
            <div
              className="absolute right-0 top-1/2 w-[var(--active-element-width)] -translate-y-1/2 py-6 opacity-[var(--active-element-opacity)] mix-blend-multiply"
              style={{ maskImage: STRIKE_MASK, WebkitMaskImage: STRIKE_MASK }}
            >
              <svg
                viewBox="0 0 114 12"
                preserveAspectRatio="none"
                style={{
                  ...STRIKE_SVG_BASE,
                  transform:
                    "translate(var(--active-element-strike-x), 30%) scale(var(--active-element-scale-x), var(--active-element-scale-y))",
                }}
              >
                <StrikeLines />
              </svg>
              <svg
                viewBox="0 0 114 12"
                preserveAspectRatio="none"
                style={{
                  ...STRIKE_SVG_BASE,
                  transform: "translate(var(--active-element-strike-x), -30%) scale(-1)",
                }}
              >
                <StrikeLines />
              </svg>
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="flex items-center gap-1 rounded-full border border-blue-500/60 p-1.5 transition hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(34,211,238,0.45)] sm:gap-2 sm:px-2"
          >
            <Moon size={18} />
            <span
              className={`h-4 w-4 rounded-full border ${
                darkMode ? "border-cyan-500 bg-[#061426]" : "border-yellow-500 bg-yellow-300"
              }`}
            />
            <Sun size={18} className="text-yellow-400" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-md p-1 text-cyan-400 md:hidden"
          >
            {menuOpen ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul
          className={`absolute left-0 top-full z-50 flex w-full flex-col gap-1 border-b border-cyan-500/40 p-4 shadow-lg md:hidden ${
            darkMode ? "bg-[#020b18]" : "bg-white"
          }`}
        >
          {NAV_LINKS.map((link, i) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => handleSelect(i)}
                className={`block rounded-md px-4 py-3 transition ${
                  active === i
                    ? "bg-cyan-500/10 font-semibold text-[#00fffc]"
                    : darkMode
                    ? "text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400"
                    : "text-slate-600 hover:bg-cyan-500/10 hover:text-cyan-600"
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;