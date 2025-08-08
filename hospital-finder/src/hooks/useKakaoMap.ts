'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao?: any;
  }
}

export function useKakaoLoader() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.kakao && window.kakao.maps) {
      setLoaded(true);
      return;
    }

    const appkey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    if (!appkey) {
      setError('Kakao API key is missing');
      return;
    }
    // Diagnostics: show origin and key presence (not the key value)
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'ssr';
      // eslint-disable-next-line no-console
      console.info('[KakaoLoader] origin:', origin, 'keyPresent:', !!appkey);
    } catch {}

    // Prevent duplicate script injection
    const existing = document.getElementById('kakao-maps-sdk') as HTMLScriptElement | null;
    if (existing) {
      if (window.kakao && window.kakao.maps) {
        setLoaded(true);
      } else {
        existing.addEventListener('load', () => {
          // @ts-ignore
          window.kakao.maps.load(() => setLoaded(true));
        });
        existing.addEventListener('error', () => setError('Failed to load Kakao Map'));
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-maps-sdk';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      try {
        window.kakao.maps.load(() => setLoaded(true));
      } catch (e) {
        console.error('Kakao maps load error', e);
        setError('Failed to initialize Kakao Map');
      }
    };
    script.onerror = () => {
      console.error('Kakao SDK script failed to load. Check domain whitelist and app key.');
      setError('Failed to load Kakao Map');
    };
    document.head.appendChild(script);

  }, []);

  return { loaded, error };
}
