import { LandingHero } from "@/components/LandingHero";
import { BackgroundDecorations } from "@/components/BackgroundDecorations";

export default function Home() {
  return (
    <main className="relative min-h-[200vh] w-full selection:bg-[#ff0080]/30">
      <BackgroundDecorations />
      
      {/* Sticky container keeps the Hero visible while we scroll down 
          so the background doesn't just disappear abruptly before boot */}
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
        <LandingHero />
        
        {/* Deep scroll area styling if needed for fading out the hero */}
        <div className="absolute inset-0 bg-black pointer-events-none opacity-0 transition-opacity duration-1000" id="hero-fade-overlay" />
      </div>
    </main>
  );
}
