'use client';

import styled from '@emotion/styled';
import { useHospitalStore } from '@/store/useHospitalStore';
import SearchIcon from '@/components/icons/SearchIcon';
import ListIcon from '@/components/icons/ListIcon';
import MapIcon from '@/components/icons/MapIcon';
import { fetchEmergencyByCoordinate, fetchEmergencyByRegion } from '@/api/emergency';

const SearchSection = () => {
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    setResults,
    setIsLoading,
    setError,
    setUserLocation,
    setSelectedHospital
  } = useHospitalStore();

  const parseRegion = (searchQuery: string) => {
    const [stage1, stage2] = searchQuery.trim().split(/\s+/);
    return [stage1, stage2];
  };

  const searchByRegion = async () => {
    const [stage1, stage2] = parseRegion(searchQuery);
    if (!stage1) return;
    setIsLoading(true);
    setError(null);
    setSelectedHospital(null);
    setViewMode('list');
    try {
      const data = await fetchEmergencyByRegion({ stage1, stage2, wideSearch: true, pageNumber: 1 });
      setResults((data.data.rooms || []).filter(Boolean));
    } catch (e: any) {
      setError(e?.message || '검색 중 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const searchByCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);
    setSelectedHospital(null);
    setViewMode('list');
    if (!navigator.geolocation) {
      setError('브라우저에서 위치 정보를 지원하지 않습니다');
      setIsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ latitude, longitude });
        const data = await fetchEmergencyByCoordinate({ latitude, longitude, wideSearch: true, pageNumber: 1 });
        setResults((data.data.rooms || []).filter(Boolean));
      } catch (e: any) {
        setError(e?.message || '위치 기반 검색 중 오류가 발생했습니다');
      } finally {
        setIsLoading(false);
      }
    }, (err) => {
      setIsLoading(false);
      setError('위치 권한을 허용해주세요');
    }, { enableHighAccuracy: true, timeout: 10000 });
  };

  return (
    <Container>
      <SearchBar>
        <SearchInput
          placeholder="병원명 또는 지역을 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton onClick={searchByRegion} title="시/도 시/군/구로 검색">
          <SearchIcon />
        </SearchButton>
      </SearchBar>
      <GeoRow>
        <GeoButton onClick={searchByCurrentLocation}>내 주변 응급실 찾기</GeoButton>
      </GeoRow>
      <Filters>
        <div />
        <ViewToggle>
          <ToggleButton
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            <ListIcon />
            <span>목록</span>
          </ToggleButton>
          <ToggleButton
            className={viewMode === 'map' ? 'active' : ''}
            onClick={() => setViewMode('map')}
          >
            <MapIcon />
            <span>지도</span>
          </ToggleButton>
        </ViewToggle>
      </Filters>
    </Container>
  );
};

const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 0;
  box-shadow: none;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
`;

const SearchBar = styled.div`
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 0;
  margin-bottom: 12px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  outline: none;
`;

const SearchButton = styled.button`
  background: #e03a3a;
  color: #fff;
  border: 1px solid #dc2626;
  padding: 0 16px;
  cursor: pointer;
  border-radius: 6px;
`;

const GeoRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

const GeoButton = styled.button`
  background: #f4f4f5;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;

  &.active {
    background: #e03a3a;
    color: #fff;
  }

  &:not(.active):hover {
    background: #f3f4f6;
  }
`;

export default SearchSection;
