from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "src" / "app" / "page.tsx"
HERO = ROOT / "src" / "components" / "LandingHero.tsx"


def main() -> None:
    source = PAGE.read_text()
    required_strings = [
        "LandingHero",
        "min-h-screen",
    ]
    for item in required_strings:
        assert item in source, f"missing homepage contract item: {item}"

    hero_source = HERO.read_text()
    hero_required_strings = [
        "r/ForbiddenBromance",
        "ziopsyop.tech",
        "secondary_ascii_logo.png",
        "h-screen",
        "from-[#ffabf3] to-[#ff00ff]",
    ]
    for item in hero_required_strings:
        assert item in hero_source, f"missing hero contract item: {item}"


if __name__ == "__main__":
    main()
