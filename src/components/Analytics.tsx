"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Matomo page view tracking
    if (typeof window !== 'undefined' && (window as any)._paq) {
      (window as any)._paq.push(['setCustomUrl', pathname]);
      (window as any)._paq.push(['setDocumentTitle', document.domain + "/" + document.title]);
      (window as any)._paq.push(['trackPageView']);
    }
  }, [pathname]);

  return (
    <>
      <Script id="matomo" strategy="afterInteractive">
        {`
          var _paq = window._paq = window._paq || [];
          _paq.push(["setCookieDomain", "*.poi5on.me"]);
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//matomo.p5n.lol/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '8']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>
      <Script 
        src="https://tianji.p5n.lol/tracker.js" 
        data-website-id="cmmoe88u400105fe7ozi3wgc2"
        strategy="afterInteractive"
        defer
      />
    </>
  );
}
