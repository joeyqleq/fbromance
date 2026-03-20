"use client";

import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/functions";

const navItems = [
  { href: "#timeline", label: "Timeline" },
  { href: "#narratives", label: "Narratives" },
  { href: "#users", label: "Users" },
  { href: "#methodology", label: "Method" },
];

export function PoisonTopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="panel-chassis gradient-outline mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-mono text-sm font-bold text-accent">
            p5
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-black tracking-[-0.08em]">
              poi<span className="text-primary">5</span>on.m<span className="text-primaryLight">3</span>
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
              evidence dossier
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="tertiary" asChild className="rounded-full px-4">
            <Link href="#methodology">Methodology</Link>
          </Button>
          <Button asChild className="rounded-full bg-primary text-primary-foreground hover:opacity-90">
            <Link href="/app">Open Workbench</Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </div>
      <div
        className={cn(
          "mx-auto mt-2 max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-card/90 px-4 py-0 backdrop-blur-xl transition-all duration-300 lg:hidden",
          open ? "max-h-72 py-4" : "max-h-0 border-transparent py-0",
        )}
      >
        <div className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="mt-2 rounded-full bg-primary text-primary-foreground">
            <Link href="/app">Open Workbench</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
