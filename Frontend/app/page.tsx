
import Link from "next/link";
import { Code, Code2, Mail, ArrowDown, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100svh-73px)] overflow-hidden bg-[#090D19] text-white">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute right-[5%] top-[10%] h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />

      {/* HERO SECTION */}
      <section className="relative mx-auto flex min-h-[calc(100svh-73px)] max-w-7xl items-center px-6 py-16 lg:px-12">

        <div className="grid w-full items-center gap-10 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="relative z-10">

            {/* STATUS */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />

              <span className="text-[11px] font-semibold tracking-widest text-blue-300">
                ASPIRING SOFTWARE ENGINEER
              </span>

            </div>

            {/* NAME */}
            <h1 className="text-5xl font-bold tracking-tight text-slate-100 sm:text-6xl md:text-7xl">
              Hi, I'm Nat.
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              A Computer Science student passionate about
              building modern software, scalable APIs,
              and innovative web applications.
            </p>

            {/* ROLE */}
            <div className="mt-7 flex items-center gap-3">

              <span className="font-mono text-blue-400">
                -
              </span>

              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-300">
                Full-Stack Software Engineer
              </span>

            </div>

            {/* BUTTONS */}
            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                href="/about"
                className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 transition hover:bg-indigo-500"
              >
                View My Work

                <ArrowDown
                  size={16}
                  className="transition-transform group-hover:translate-y-1"
                />
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:bg-blue-500/10"
              >
                Get In Touch

                <ArrowUpRight size={16} />
              </Link>

            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-10 flex items-center gap-5">

              <a
                href="https://github.com/naromero-spec"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-slate-500 transition hover:text-blue-400"
              >
                <Code2 size={21} />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-slate-500 transition hover:text-blue-400"
              >
                <Code size={21} />
              </a>

              <a
                href="mailto:your@email.com"
                aria-label="Email"
                className="text-slate-500 transition hover:text-blue-400"
              >
                <Mail size={21} />
              </a>

            </div>

          </div>

          {/* RIGHT SIDE - ANIMATED SPIRAL */}
          <div className="relative flex h-[400px] items-center justify-center lg:h-[520px]">

            {/* SPIRAL BACKGROUND GLOW */}
            <div className="absolute h-64 w-64 rounded-full bg-indigo-600/20 blur-[100px]" />

            {/* SVG SPIRAL */}
            <svg
              viewBox="0 0 320 420"
              className="relative z-10 h-full w-full max-w-[350px] overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Animated glowing particle spiral"
            >

              <defs>

                <linearGradient
                  id="spiralGradient"
                  x1="30"
                  y1="20"
                  x2="280"
                  y2="400"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#60A5FA" />
                  <stop offset="70%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>

                <filter
                  id="spiralGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="5" result="blur" />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>

                </filter>

              </defs>

              {/* MAIN SPIRAL */}
              <path
                d="
                  M160 30
                  C230 30 245 75 160 90
                  C65 105 65 145 160 155
                  C255 165 255 200 160 215
                  C65 230 65 265 160 280
                  C255 295 255 330 160 345
                  C90 360 100 385 160 395
                "
                stroke="url(#spiralGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="14 5 3 5"
                filter="url(#spiralGlow)"
                className="spiral-flow"
              />

              {/* LIGHT TRAIL */}
              <path
                d="
                  M160 30
                  C230 30 245 75 160 90
                  C65 105 65 145 160 155
                  C255 165 255 200 160 215
                  C65 230 65 265 160 280
                  C255 295 255 330 160 345
                  C90 360 100 385 160 395
                "
                stroke="#A5B4FC"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="2 9"
                className="spiral-flow-slow"
              />

              {/* FLOATING PARTICLES */}
              {[
                [75, 95, 3],
                [245, 145, 4],
                [55, 235, 2],
                [260, 310, 3],
                [105, 365, 2],
                [215, 65, 2],
              ].map(([cx, cy, r], index) => (

                <circle
                  key={index}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="#A5B4FC"
                  className="spiral-particle"
                  style={{
                    animationDelay: `${index * 0.35}s`,
                  }}
                />

              ))}

            </svg>

            {/* FLOATING LIGHTS */}
            <div className="absolute right-[12%] top-[25%] h-5 w-5 animate-pulse rounded-full border border-indigo-400/30 bg-indigo-400/10" />

            <div className="absolute bottom-[22%] left-[15%] h-3 w-3 animate-pulse rounded-full bg-blue-400/30 blur-sm" />

          </div>

        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-600">

          <ArrowDown size={17} className="animate-bounce" />

          <span className="text-[9px] font-medium tracking-[0.3em]">
            SCROLL
          </span>

        </div>

      </section>

    </main>
  );
}
