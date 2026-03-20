from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "src" / "app" / "(marketing)" / "page.tsx"


def main() -> None:
    source = PAGE.read_text()
    required_strings = [
        "poi5on.m3",
        "r/ForbiddenBromance",
        "methodology",
        "TimelineRibbonSection",
        "NarrativeGridSection",
        "UserPreviewSection",
    ]
    for item in required_strings:
        assert item in source, f"missing homepage contract item: {item}"


if __name__ == "__main__":
    main()
