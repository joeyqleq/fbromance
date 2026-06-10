"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MatrixText } from "@/components/kokonutui/matrix-text";

export default function AnalystLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "OVERVIEW", path: "/analyst/overview" },
    { name: "TIMELINE", path: "/analyst/timeline" },
    { 
      name: "ACTORS", 
      path: "/analyst/users",
      sub: ["By Flair", "Context Shifts", "Identity Review"] 
    },
    { 
      name: "RHETORIC", 
      path: "/analyst/rhetoric",
      sub: ["Narrative Trends", "Fight Threads", "Language Patterns"]
    },
    { name: "HEBREW SUBSET", path: "/analyst/hebrew" },
    { 
      name: "EVENTS", 
      path: "/analyst/events",
      sub: ["Conflict Timeline", "Spike Correlation"]
    },
    { name: "SOURCES", path: "/analyst/sources" },
  ];

  return (
    <div className="relative flex h-screen bg-[#0c0e0f] text-[#ffffff] font-mono overflow-hidden scanline-overlay">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 absolute md:relative z-40 w-64 h-full bg-[#121415] border-r border-[#ffabf3]/20 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-6 border-b border-[#ffabf3]/20 flex-shrink-0">
          <MatrixText text="ZI0PSY0P.TECH" className="font-heading font-black text-xl tracking-tighter text-[#ffabf3]" />
          <div className="text-[10px] tracking-widest uppercase mt-2 opacity-60">Analyst Console</div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-4 scrollbar-hide">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.path);
            return (
              <div key={link.name} className="flex flex-col">
                <Link 
                  href={link.path}
                  className={`flex items-center text-sm ${isActive ? 'text-[#ff00ff]' : 'text-[#b7bac4] hover:text-white'} transition-colors`}
                >
                  <span className={`mr-2 ${isActive ? 'opacity-100' : 'opacity-0'}`}>▸</span>
                  {link.name}
                </Link>
                {link.sub && isActive && (
                  <div className="ml-6 mt-2 space-y-2 border-l border-[#111111] pl-4">
                    {link.sub.map((subItem) => (
                      <Link 
                        key={subItem} 
                        href={`${link.path}#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-[11px] text-[#8f93a3] hover:text-[#00fbfb] transition-colors"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#ffabf3]/20 flex-shrink-0">
          <Link href="/dossier" className="text-xs text-[#b7bac4] hover:text-white transition-colors flex items-center">
            <span className="mr-2">←</span> DOSSIER
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 border-b border-[#ffabf3]/20 bg-[#121415] flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <button 
              className="md:hidden text-[#00fbfb] mr-4"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              [MENU]
            </button>
            <div className="hidden sm:block text-xs font-mono text-[#444] uppercase tracking-widest">
              TERMINAL: {pathname.toUpperCase()}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Placeholder (using @kokonutui/action-search-bar component in real execution) */}
            <div className="relative hidden md:block group">
               <input 
                 type="text" 
                 placeholder="Search archives..." 
                 className="bg-[#0c0e0f] border border-[#ffabf3]/20 text-[#00fbfb] px-4 py-1 text-xs focus:outline-none focus:border-[#ff00ff] transition-colors w-48 group-hover:border-[#00fbfb]/50"
               />
               <span className="absolute right-2 top-1.5 opacity-40 text-xs">⌘K</span>
            </div>
            
            <button className="text-[10px] border border-[#ffabf3]/40 text-[#ffabf3] px-3 py-1 hover:bg-[#ff00ff]/15 transition-colors uppercase tracking-widest">
              Export CSV
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#0c0e0f] p-4 sm:p-8">
          {children}
        </main>
      </div>

      {/* Click-away overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
