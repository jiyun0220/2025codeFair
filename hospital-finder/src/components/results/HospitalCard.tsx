'use client';

import styled from '@emotion/styled';

const HospitalCard = () => {
  return (
    <Card>
      <Info>
        <Name>서울삼성병원</Name>
        <Address>서울시 강남구 삼성로 123</Address>
        <Distance>500m</Distance>
      </Info>
      <Status>
        <OpeningHours className="open">진료중</OpeningHours>
        <Tags>
          <Tag>#소아과</Tag>
          <Tag>#내과</Tag>
          <Tag>#야간진료</Tag>
        </Tags>
      </Status>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const Address = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const Distance = styled.p`
  font-size: 14px;
  color: #e53e3e;
  font-weight: 500;
  margin: 0;
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const OpeningHours = styled.span`
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;

  &.open {
    color: #38a169;
    background-color: #f0fff4;
  }

  &.closed {
    color: #e53e3e;
    background-color: #fff5f5;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  background-color: #edf2f7;
  color: #4a5568;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

export default HospitalCard;
