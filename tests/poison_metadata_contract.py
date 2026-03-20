from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MARKETING_PAGE = ROOT / "src" / "app" / "(marketing)" / "page.tsx"
APP_PAGE = ROOT / "src" / "app" / "(main)" / "app" / "page.tsx"
SECTION_PAGE = ROOT / "src" / "app" / "(main)" / "app" / "[section]" / "page.tsx"


def main() -> None:
    marketing_source = MARKETING_PAGE.read_text()
    assert "generateMetadata" in marketing_source, "homepage should define metadata"

    app_source = APP_PAGE.read_text()
    assert "generateMetadata" in app_source or "export const metadata" in app_source, "overview route should define metadata"
    assert "poi5on.m3" in app_source, "overview route metadata should use poi5on.m3 branding"

    section_source = SECTION_PAGE.read_text()
    assert "generateMetadata" in section_source, "dynamic workbench route should define route-specific metadata"
    assert "timeline" in section_source and "evidence" in section_source, "dynamic route metadata should understand named sections"


if __name__ == "__main__":
    main()
