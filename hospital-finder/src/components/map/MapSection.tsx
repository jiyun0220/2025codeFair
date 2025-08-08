'use client';

import styled from '@emotion/styled';

const MapSection = () => {
  return (
    <MapContainer>
      <MapPlaceholder>
        <p>지도가 여기에 표시됩니다.</p>
      </MapPlaceholder>
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
