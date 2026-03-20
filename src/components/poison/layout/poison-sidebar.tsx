"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftIcon, SearchIcon } from "lucide-react";
import { SIDEBAR_LINKS } from "@/constants/links";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/functions";

function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {SIDEBAR_LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "vertical-tab-link group flex items-center gap-3 rounded-[1.2rem] border px-4 py-3 font-mono text-xs uppercase tracking-[0.24em] transition-colors",
              active
                ? "border-primaryLight/40 bg-primaryLight/10 text-foreground"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground",
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

export function PoisonSidebar() {
  return (
    <>
      <aside className="hidden w-[18rem] shrink-0 lg:block">
        <div className="sticky top-24 flex flex-col gap-4">
          <div className="panel-chassis p-4">
            <div className="signal-label">atlas navigation</div>
            <div className="mt-3 flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-muted-foreground">
              <SearchIcon className="h-4 w-4" />
              search disabled in v1
            </div>
          </div>
          <SidebarLinks />
        </div>
      </aside>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="tertiary" className="rounded-full">
              <PanelLeftIcon className="mr-2 h-4 w-4" />
              Sections
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="border-white/10 bg-[#090b12]">
            <div className="mt-8 flex flex-col gap-4">
              <div className="font-display text-2xl font-black tracking-[-0.06em]">
                poi<span className="text-primary">5</span>on.m<span className="text-primaryLight">3</span>
              </div>
              <SidebarLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
