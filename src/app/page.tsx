import { LandingHero } from "@/components/LandingHero";
import { BackgroundDecorations } from "@/components/BackgroundDecorations";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full selection:bg-[#ff00ff]/30">
      <BackgroundDecorations />
      <LandingHero />
    </main>
  );
}
