'use client';

import styled from '@emotion/styled';
import HospitalCard from './HospitalCard';

const ResultsSection = () => {
  return (
    <Container>
      <Title>검색 결과</Title>
      <ResultsList>
        <HospitalCard />
        <HospitalCard />
        <HospitalCard />
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
