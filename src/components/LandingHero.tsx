"use client";

import Image from "next/image";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="relative z-10 h-screen min-h-screen overflow-hidden px-6 py-10 md:px-12 md:py-12">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-between bg-[rgba(18,20,21,0.78)] p-6 md:p-10 lg:p-12 glass-panel scanline-overlay">
        <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.25em] text-[#ffabf3]">
          <span>open investigation // zi0psy0p.tech</span>
          <span>forensic terminal</span>
        </div>

        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.35fr_0.8fr]">
          <div className="space-y-6">
            <h1 className="font-heading text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
              A data-led dossier into
              <span className="text-[#ff00ff]"> r/ForbiddenBromance</span>
              <br />
              with
              <span className="text-[#00fbfb]"> ziopsyop.tech</span>
            </h1>
            <p className="max-w-2xl font-mono text-sm leading-relaxed text-white/85 md:text-base">
              Six years of signal, rhetoric, and actor-pattern evidence presented in a forensic interface. Explore the dossier, audit the method, and inspect the analyst workbench.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dossier"
                className="inline-flex w-full items-center justify-center bg-gradient-to-r from-[#ffabf3] to-[#ff00ff] px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[#0c0e0f] transition-all duration-200 hover:brightness-110 sm:w-auto"
              >
                Open Dossier
              </Link>
              <Link
                href="/analyst"
                className="inline-flex w-full items-center justify-center bg-[rgba(0,251,251,0.14)] px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[#00fbfb] transition-all duration-200 hover:bg-[rgba(0,251,251,0.22)] sm:w-auto"
              >
                Launch Workbench
              </Link>
              <Link
                href="/method"
                className="inline-flex w-full items-center justify-center bg-[rgba(255,171,243,0.12)] px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[#ffabf3] transition-all duration-200 hover:bg-[rgba(255,171,243,0.2)] sm:w-auto"
              >
                Method
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="tonal-layer p-4 md:p-6">
              <Image
                src="/images/brand/secondary_ascii_logo.png"
                alt="ziopsyop.tech secondary ascii logo"
                width={640}
                height={640}
                priority
                className="h-auto w-[220px] max-w-full object-contain md:w-[320px] lg:w-[380px]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between text-[10px] uppercase tracking-[0.2em] text-white/70">
          <span>archive: 88,094 comments // 4,895 posts</span>
          <span className="text-[#00fbfb]">viewport-calibrated hero</span>
        </div>
      </div>
    </section>
  );
}
