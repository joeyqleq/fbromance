"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MatrixText } from "@/components/kokonutui/matrix-text";

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bootCompleted, setBootCompleted] = useState(false);
  const [bootText, setBootText] = useState("");

  const isVisible = !isHome || hasScrolled;

  useEffect(() => {
    if (!isHome) {
      setBootCompleted(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (isHome && hasScrolled && !bootCompleted && bootText === "") {
      // Run sequence only once
      const sequence = [
        "> INITIALIZING POI5ON.M3...",
        "> LOADING DOSSIER MODULES............. OK",
        "> LOADING ANALYST WORKBENCH........... OK",
        "> MOUNTING EVIDENCE STORE............. OK",
        "> SIGNAL READY."
      ];
      
      let index = 0;
      setBootText(sequence[0]);
      
      const interval = setInterval(() => {
        index++;
        if (index < sequence.length) {
          setBootText(prev => prev + "\n" + sequence[index]);
        } else {
          clearInterval(interval);
          setTimeout(() => setBootCompleted(true), 800);
        }
      }, 400);

      return () => clearInterval(interval);
    }
  }, [isHome, hasScrolled, bootCompleted, bootText]);

  if (!isVisible) return null;

  if (isHome && !bootCompleted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="font-mono text-[#00ff41] text-lg whitespace-pre-wrap max-w-2xl w-full p-8 border border-[#ff0080]/30 shadow-[0_0_20px_rgba(255,0,128,0.2)] bg-[#0a0a0a]">
          {bootText}
          <span className="animate-pulse">_</span>
        </div>
      </div>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-[#ff0080]/30 custom-toolbar-anim">
      <div className="container mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <MatrixText text="POI5ON.M3" className="font-heading font-black text-2xl tracking-tighter cursor-pointer text-[#ff0080] hover:text-[#00ff41] transition-colors" />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 font-heading text-xl tracking-wide">
          <Link href="/dossier" className="text-white hover:text-[#ff0080] transition-colors relative group">
            [DOSSIER]
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff0080] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/analyst" className="text-white hover:text-[#ff0080] transition-colors relative group">
            [ANALYST]
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff0080] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/method" className="text-[#888888] hover:text-[#00ff41] text-lg transition-colors">[METHOD]</Link>
          <Link href="/dispatch" className="text-[#888888] hover:text-[#00ff41] text-lg transition-colors">[DISPATCH]</Link>
        </div>

        <div className="md:hidden flex items-center">
           <button className="text-[#00ff41] font-mono hover:text-white transition-colors">[MENU]</button>
        </div>
      </div>
    </nav>
  );
}
