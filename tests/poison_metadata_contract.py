from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LAYOUT = ROOT / "src" / "app" / "layout.tsx"
SITEMAP = ROOT / "src" / "app" / "sitemap.ts"
ROBOTS = ROOT / "src" / "app" / "robots.ts"
MANIFEST = ROOT / "src" / "app" / "manifest.ts"
CONTACT = ROOT / "src" / "app" / "api" / "contact" / "route.ts"
ANALYTICS = ROOT / "src" / "components" / "Analytics.tsx"


def main() -> None:
    layout_source = LAYOUT.read_text()
    assert "ziopsyop.tech" in layout_source, "layout metadata should use new site branding"
    assert "https://zi0psy0p.tech" in layout_source, "layout metadata should use new primary domain"

    sitemap_source = SITEMAP.read_text()
    assert "https://zi0psy0p.tech" in sitemap_source, "sitemap should use new domain"

    robots_source = ROBOTS.read_text()
    assert "https://zi0psy0p.tech/sitemap.xml" in robots_source, "robots sitemap should use new domain"
    assert "host: \"https://zi0psy0p.tech\"" in robots_source, "robots host should use new domain"

    manifest_source = MANIFEST.read_text()
    assert "ziopsyop.tech" in manifest_source, "manifest should use new branding"
    assert "secondary_ascii_logo.png" in manifest_source, "manifest should point to secondary ascii logo favicon"

    contact_source = CONTACT.read_text()
    assert "contact@zi0psy0p.tech" in contact_source, "contact form sender should use new domain"
    assert "ziopsyop.tech" in contact_source, "contact subject should use new branding"

    analytics_source = ANALYTICS.read_text()
    assert "NEXT_PUBLIC_MATOMO_URL" in analytics_source, "matomo integration should be env-driven"
    assert "NEXT_PUBLIC_TIANJI_URL" in analytics_source, "tianji integration should be env-driven"
    assert "matomo.myhayat.app" not in analytics_source, "old matomo endpoint should be removed"
    assert "tianji.myhayat.app" not in analytics_source, "old tianji endpoint should be removed"


if __name__ == "__main__":
    main()
