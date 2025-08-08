'use client';

import styled from '@emotion/styled';
import type { HospitalRoom } from '@/types/emergency';
import { useHospitalStore } from '@/store/useHospitalStore';

interface Props { hospital: HospitalRoom }

const HospitalCard = ({ hospital }: Props) => {
  const { setSelectedHospital, setViewMode } = useHospitalStore();
  const address = `${hospital.provinces} ${hospital.municipalities}`;
  const openLabel = hospital.available_emergency_room_count > 0 ? '여유 있음' : '혼잡';
  const openClass = hospital.available_emergency_room_count > 0 ? 'open' : 'closed';
  return (
    <Card onClick={() => { setSelectedHospital(hospital); setViewMode('map'); }}>
      <Info>
        <Name>{hospital.institution_name}</Name>
        <Address>{address}</Address>
        <Distance>응급실 여유: {hospital.available_emergency_room_count}개</Distance>
      </Info>
      <Status>
        <OpeningHours className={openClass}>{openLabel}</OpeningHours>
        <Tags>
          {hospital.isAvailableCT === 'Y' && <Tag>#CT</Tag>}
          {hospital.isAvailableMRI === 'Y' && <Tag>#MRI</Tag>}
          {hospital.isAvailableAmbulance === 'Y' && <Tag>#구급차</Tag>}
        </Tags>
      </Status>
    </Card>
  );
};

const Card = styled.button`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.2s ease-in-out;
  border: none;
  text-align: left;
  cursor: pointer;

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
