'use client';

import styled from '@emotion/styled';
import { useHospitalStore } from '@/store/useHospitalStore';

const DetailDrawer = () => {
  const { isDetailOpen, closeDetail, selectedHospital } = useHospitalStore();
  if (!isDetailOpen || !selectedHospital) return null;
  const h = selectedHospital;

  return (
    <Overlay onClick={closeDetail}>
      <Drawer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{h.institution_name}</Title>
          <CloseBtn onClick={closeDetail}>닫기</CloseBtn>
        </Header>
        <Body>
          <Row>
            <Label>주소</Label>
            <Value>{h.provinces} {h.municipalities}</Value>
          </Row>
          {h.emergency_tel && (
            <Row>
              <Label>응급실</Label>
              <Value>
                <a href={`tel:${h.emergency_tel}`}>{h.emergency_tel}</a>
              </Value>
            </Row>
          )}
          <Row>
            <Label>보유 현황</Label>
            <Value>
              응급실 {h.available_emergency_room_count ?? '-'} / 수술실 {h.available_surgery_room_count ?? '-'} / 병상 {h.available_hospital_room_count ?? '-'}
            </Value>
          </Row>
          <Row>
            <Label>장비</Label>
            <Value>
              {h.isAvailableCT === 'Y' && <Tag>#CT</Tag>}
              {h.isAvailableMRI === 'Y' && <Tag>#MRI</Tag>}
              {h.isAvailableAmbulance === 'Y' && <Tag>#구급차</Tag>}
            </Value>
          </Row>
          <UpdatedAt>업데이트: {h.updatedAt}</UpdatedAt>
        </Body>
      </Drawer>
    </Overlay>
  );
};

export default DetailDrawer;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

const Drawer = styled.div`
  width: 100%;
  max-width: 640px;
  background: #fff;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 16px;
  box-shadow: none;
  border-top: 1px solid #e5e7eb;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const CloseBtn = styled.button`
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  border-radius: 0;
  padding: 6px 12px;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const Label = styled.div`
  min-width: 64px;
  color: #666;
`;

const Value = styled.div`
  color: #111;
`;

const Tag = styled.span`
  background-color: #f3f4f6;
  color: #374151;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 0;
  margin-right: 6px;
`;

const UpdatedAt = styled.div`
  color: #888;
  font-size: 12px;
  margin-top: 4px;
`;
