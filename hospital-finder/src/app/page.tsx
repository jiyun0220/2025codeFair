'use client';

import styled from '@emotion/styled';
import Header from '@/components/layout/Header';
import SearchSection from '@/components/search/SearchSection';
import ResultsSection from '@/components/results/ResultsSection';
import MapSection from '@/components/map/MapSection';
import { useHospitalStore } from '@/store/useHospitalStore';
import ChatWidget from '@/components/chat/ChatWidget';

export default function Home() {
  const { viewMode } = useHospitalStore();
  return (
    <>
      <Header />
      <Main viewMode={viewMode}>
        <div>
          <SearchSection />
          <ResultsSection />
        </div>
        {viewMode === 'map' && <MapSection />}
      </Main>
      <ChatWidget />
    </>
  );
}

const Main = styled.main<{ viewMode: 'list' | 'map' }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: ${({ viewMode }) =>
    viewMode === 'map' ? '1fr 420px' : '1fr'};
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;

