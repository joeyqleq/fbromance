import { PoisonHeroSection } from "@/components/poison/sections/hero";
import { TimelineRibbonSection } from "@/components/poison/sections/timeline-ribbon";
import { NarrativeGridSection } from "@/components/poison/sections/narrative-grid";
import { UserPreviewSection } from "@/components/poison/sections/user-preview";
import { MethodologyStripSection } from "@/components/poison/sections/methodology-strip";
import { generateMetadata } from "@/functions";

const DOSSIER_NAME = "poi5on.m3";
const DOSSIER_TARGET = "r/ForbiddenBromance";

export const metadata = generateMetadata({
  title: DOSSIER_NAME,
  description:
    "Public evidence dossier investigating timing, rhetoric, and identity-performance patterns around r/ForbiddenBromance.",
});

const HomePage = () => {
  return (
    <>
      <div className="sr-only">
        {DOSSIER_NAME} public evidence dossier for {DOSSIER_TARGET}. Jump to methodology for data handling notes.
      </div>
      <PoisonHeroSection />
      <TimelineRibbonSection />
      <NarrativeGridSection />
      <UserPreviewSection />
      <MethodologyStripSection />
    </>
  );
};

export default HomePage;
