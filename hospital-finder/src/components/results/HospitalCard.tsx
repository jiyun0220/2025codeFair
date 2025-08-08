'use client';

import styled from '@emotion/styled';
import type { HospitalRoom } from '@/types/emergency';
import { useHospitalStore } from '@/store/useHospitalStore';

interface Props { hospital: HospitalRoom }

const HospitalCard = ({ hospital }: Props) => {
  const { setSelectedHospital, setViewMode, userLocation, openDetail } = useHospitalStore();
  const address = `${hospital.provinces} ${hospital.municipalities}`;
  const distKm = userLocation && hospital.latitude && hospital.longitude
    ? haversine(userLocation.latitude, userLocation.longitude, hospital.latitude, hospital.longitude)
    : null;
  return (
    <Card role="button" tabIndex={0} onClick={() => { setSelectedHospital(hospital); setViewMode('map'); }}>
      <Info>
        <Name>{hospital.institution_name}</Name>
        <Address>{address}</Address>
        {distKm !== null && (
          <Distance>{distKm.toFixed(1)} km</Distance>
        )}
      </Info>
      <Status>
        <Counts>
          응급실 {hospital.available_emergency_room_count ?? '-'} / 수술실 {hospital.available_surgery_room_count ?? '-'} / 병상 {hospital.available_hospital_room_count ?? '-'}
        </Counts>
        <Tags>
          {hospital.isAvailableCT === 'Y' && <Tag>#CT</Tag>}
          {hospital.isAvailableMRI === 'Y' && <Tag>#MRI</Tag>}
          {hospital.isAvailableAmbulance === 'Y' && <Tag>#구급차</Tag>}
        </Tags>
        <Actions>
          {hospital.emergency_tel && (
            <ActionLink href={`tel:${hospital.emergency_tel}`} onClick={(e) => e.stopPropagation()}>전화</ActionLink>
          )}
          <ActionButton onClick={(e) => { e.stopPropagation(); setSelectedHospital(hospital); openDetail(); }}>자세히</ActionButton>
        </Actions>
      </Status>
    </Card>
  );
};

const Card = styled.div`
  background: #fff;
  border-radius: 0;
  padding: 16px;
  box-shadow: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e7eb;
  text-align: left;
  cursor: pointer;
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

const Counts = styled.div`
  font-size: 13px;
  color: #374151;
`;

// Availability label removed due to unreliable data

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  background-color: #f3f4f6;
  color: #374151;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const ActionLink = styled.a`
  background: #e03a3a;
  border: 1px solid #dc2626;
  color: #fff;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 0;
  text-decoration: none;
`;

const ActionButton = styled.button`
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #374151;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 0;
  cursor: pointer;
`;

export default HospitalCard;

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
