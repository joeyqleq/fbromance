"use client";

import Script from "next/script";

const TIANJI_SRC = "https://tianji.p5n.lol/tracker.js";
const TIANJI_WEBSITE_ID = "cmmoe88u400105fe7ozi3wgc2";

function getMatomoConfig() {
  const url = process.env.NEXT_PUBLIC_MATOMO_URL;
  const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

  if (!url || !siteId) {
    return null;
  }

  return {
    url: url.endsWith("/") ? url : `${url}/`,
    siteId,
  };
}

export function PoisonAnalytics() {
  const matomo = getMatomoConfig();

  return (
    <>
      <Script
        id="tianji"
        src={TIANJI_SRC}
        data-website-id={TIANJI_WEBSITE_ID}
        strategy="afterInteractive"
      />
      {matomo ? (
        <Script
          id="matomo"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(["setCookieDomain", "*.poi5on.me"]);
              _paq.push(["setDomains", ["*.poi5on.me","*.www.poi5on.me"]]);
              _paq.push(["enableCrossDomainLinking"]);
              _paq.push(["trackPageView"]);
              _paq.push(["enableLinkTracking"]);
              (function() {
                var u="${matomo.url}";
                _paq.push(["setTrackerUrl", u + "matomo.php"]);
                _paq.push(["setSiteId", "${matomo.siteId}"]);
                var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
                g.async=true; g.src=u + "matomo.js"; s.parentNode.insertBefore(g,s);
              })();
            `,
          }}
        />
      ) : null}
    </>
  );
}
