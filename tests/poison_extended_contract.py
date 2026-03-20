from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ADAPTER = ROOT / "src" / "data" / "poison-dashboard.ts"
LINKS = ROOT / "src" / "constants" / "links.ts"
WORKBENCH = ROOT / "src" / "components" / "poison" / "workbench" / "workbench-screen.tsx"


def main() -> None:
    adapter = ADAPTER.read_text()
    for name in [
        "poisonKeywordSeries",
        "poisonHebrewActivity",
        "poisonHebrewHighlights",
        "poisonSourceInventory",
        "poisonWatchlist",
        "poisonMajorEvents",
        "poisonCeasefireEvents",
        "poisonCrossReference",
    ]:
        assert name in adapter, f"missing extended export: {name}"

    links = LINKS.read_text()
    for route in ["/app/hebrew", "/app/sources"]:
        assert route in links, f"missing extended route link: {route}"

    workbench = WORKBENCH.read_text()
    for section in ['"hebrew"', '"sources"']:
        assert section in workbench, f"missing section handling in workbench: {section}"


if __name__ == "__main__":
    main()
