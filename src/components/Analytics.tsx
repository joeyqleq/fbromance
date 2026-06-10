"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

export function Analytics() {
  const pathname = usePathname();
  const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL?.replace(/\/+$/, '');
  const matomoSiteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
  const matomoCookieDomain = process.env.NEXT_PUBLIC_MATOMO_COOKIE_DOMAIN ?? '*.zi0psy0p.tech';
  const tianjiUrl = process.env.NEXT_PUBLIC_TIANJI_URL?.replace(/\/+$/, '');
  const tianjiWebsiteId = process.env.NEXT_PUBLIC_TIANJI_SITE_ID;

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any)._paq) {
      (window as any)._paq.push(['setCustomUrl', pathname]);
      (window as any)._paq.push(['setDocumentTitle', document.domain + "/" + document.title]);
      (window as any)._paq.push(['trackPageView']);
    }
  }, [pathname]);

  return (
    <>
      {matomoUrl && matomoSiteId ? (
        <>
          <Script id="matomo-init" strategy="afterInteractive">
            {`
              var _paq = window._paq = window._paq || [];
              _paq.push(['setCookieDomain', '${matomoCookieDomain}']);
              _paq.push(['setTrackerUrl', '${matomoUrl}/matomo.php']);
              _paq.push(['setSiteId', '${matomoSiteId}']);
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
            `}
          </Script>
          <Script id="matomo-script" src={`${matomoUrl}/matomo.js`} strategy="afterInteractive" />
        </>
      ) : null}
      {tianjiUrl && tianjiWebsiteId ? (
        <Script
          id="tianji-script"
          src={`${tianjiUrl}/tracker.js`}
          data-website-id={tianjiWebsiteId}
          strategy="afterInteractive"
          defer
        />
      ) : null}
    </>
  );
}
