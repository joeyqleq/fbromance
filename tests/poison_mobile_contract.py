from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TIMELINE = ROOT / "src" / "components" / "poison" / "workbench" / "timeline-panel.tsx"
NETWORK = ROOT / "src" / "components" / "poison" / "workbench" / "network-panel.tsx"
OVERVIEW = ROOT / "src" / "components" / "poison" / "workbench" / "overview-panel.tsx"
HERO = ROOT / "src" / "components" / "poison" / "sections" / "hero.tsx"


def main() -> None:
    timeline_source = TIMELINE.read_text()
    assert "lg:hidden" in timeline_source and "hidden lg:block" in timeline_source, "timeline panel should have mobile and desktop-specific chart treatments"

    network_source = NETWORK.read_text()
    assert "lg:hidden" in network_source and "hidden lg:block" in network_source, "network panel should have mobile and desktop-specific treatments"

    overview_source = OVERVIEW.read_text()
    assert "overflow-x-auto" in overview_source or "snap-x" in overview_source, "overview spike cards should have a mobile scrolling treatment"

    hero_source = HERO.read_text()
    assert "sm:flex-row" in hero_source and "w-full sm:w-auto" in hero_source, "hero actions should stack cleanly on mobile before expanding on larger screens"


if __name__ == "__main__":
    main()
