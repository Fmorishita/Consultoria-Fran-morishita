"use client";

import Script from "next/script";
import { useEffect } from "react";
import { capturarAtribucion } from "@/lib/atribucion";

/**
 * Captura de UTMs + píxel de Meta + GA4.
 * Si no hay IDs configurados, no se carga ningún script.
 */
export function Analitica({ pixelId, ga4Id }: { pixelId?: string; ga4Id?: string }) {
  useEffect(() => {
    capturarAtribucion();
  }, []);

  return (
    <>
      {pixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {ga4Id ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${ga4Id}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
