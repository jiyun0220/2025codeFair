'use client';

/* global kakao */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const kakao: any;
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useKakaoLoader } from '@/hooks/useKakaoMap';
import { useHospitalStore } from '@/store/useHospitalStore';
import type { HospitalRoom } from '@/types/emergency';

const MapSection = () => {
  const { loaded, error } = useKakaoLoader();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { selectedHospital, results } = useHospitalStore();

  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    // Determine center: selected hospital or first result with coordinates, fallback to Seoul City Hall
    const center = getCenter(selectedHospital, results);
    // @ts-ignore kakao global
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 6,
    });

    // Add marker for selected or list items that have coordinates
    const markers: any[] = [];
    const items: HospitalRoom[] = selectedHospital ? [selectedHospital] : (results || []);
    items.forEach((h) => {
      if (h.latitude && h.longitude) {
        // @ts-ignore
        const marker = new kakao.maps.Marker({
          // @ts-ignore
          position: new kakao.maps.LatLng(h.latitude, h.longitude),
          map,
        });
        markers.push(marker);
      }
    });

    return () => {
      markers.forEach((m) => m.setMap(null));
    };
  }, [loaded, selectedHospital, results]);

  return (
    <MapContainer>
      {error ? (
        <MapPlaceholder>{error}</MapPlaceholder>
      ) : (
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      )}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 100%;
  min-height: 500px; /* Ensure a minimum height */
  background: #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapPlaceholder = styled.div`
  color: #666;
  font-size: 16px;
`;

export default MapSection;

function getCenter(selected: HospitalRoom | null, list?: HospitalRoom[]) {
  if (selected?.latitude && selected?.longitude) {
    return { lat: selected.latitude, lng: selected.longitude };
  }
  const first = list?.find((x) => x.latitude && x.longitude);
  if (first) return { lat: first.latitude as number, lng: first.longitude as number };
  // Fallback: Seoul City Hall
  return { lat: 37.5662952, lng: 126.9779451 };
}
