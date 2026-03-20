from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DYNAMIC_PAGE = ROOT / "src" / "app" / "(main)" / "app" / "[section]" / "page.tsx"
LINKS = ROOT / "src" / "constants" / "links.ts"


def main() -> None:
    assert DYNAMIC_PAGE.exists(), f"missing dynamic section route: {DYNAMIC_PAGE}"
    links_source = LINKS.read_text()
    for route in [
        "/app/timeline",
        "/app/narratives",
        "/app/users",
        "/app/events",
        "/app/rhetoric",
        "/app/evidence",
    ]:
        assert route in links_source, f"missing workbench route link: {route}"


if __name__ == "__main__":
    main()
