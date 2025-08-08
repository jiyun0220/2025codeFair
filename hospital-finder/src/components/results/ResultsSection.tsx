'use client';

import styled from '@emotion/styled';
import HospitalCard from './HospitalCard';
import DetailDrawer from './DetailDrawer';
import { useHospitalStore } from '@/store/useHospitalStore';
import type { HospitalRoom } from '@/types/emergency';

const ResultsSection = () => {
  const { results, isLoading, error, userLocation } = useHospitalStore();
  const sorted: HospitalRoom[] = [...results].sort((a, b) => {
    if (!userLocation) return 0;
    const da = distanceKm(userLocation, a);
    const db = distanceKm(userLocation, b);
    return da - db;
  });
  return (
    <Container>
      <Title>검색 결과</Title>
      {isLoading && <InfoText>불러오는 중...</InfoText>}
      {error && <InfoText style={{ color: '#e53e3e' }}>{error}</InfoText>}
      {!isLoading && !error && sorted.length === 0 && (
        <InfoText>결과가 없습니다.</InfoText>
      )}
      <ResultsList>
        {sorted.map((h) => (
          <HospitalCard key={h.hospitalId} hospital={h} />
        ))}
      </ResultsList>
      <DetailDrawer />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default ResultsSection;

const InfoText = styled.p`
  margin: 0;
  color: #666;
`;

function distanceKm(user: { latitude: number; longitude: number }, h: HospitalRoom): number {
  if (!h.latitude || !h.longitude) return Number.POSITIVE_INFINITY;
  const R = 6371; // km
  const dLat = toRad(h.latitude - user.latitude);
  const dLon = toRad(h.longitude - user.longitude);
  const lat1 = toRad(user.latitude);
  const lat2 = toRad(h.latitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}
