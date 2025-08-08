'use client';

import styled from '@emotion/styled';
import HospitalCard from './HospitalCard';
import { useHospitalStore } from '@/store/useHospitalStore';

const ResultsSection = () => {
  const { results, isLoading, error } = useHospitalStore();
  return (
    <Container>
      <Title>검색 결과</Title>
      {isLoading && <InfoText>불러오는 중...</InfoText>}
      {error && <InfoText style={{ color: '#e53e3e' }}>{error}</InfoText>}
      <ResultsList>
        {results.map((h) => (
          <HospitalCard key={h.hospitalId} hospital={h} />
        ))}
      </ResultsList>
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
