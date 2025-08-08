'use client';

import styled from '@emotion/styled';
import { useHospitalStore } from '@/store/useHospitalStore';
import SearchIcon from '@/components/icons/SearchIcon';
import FilterIcon from '@/components/icons/FilterIcon';
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
    setError
  } = useHospitalStore();

  const searchByRegion = async () => {
    // Expect input like: "경상남도 양산시" (two words)
    const [stage1, stage2] = searchQuery.trim().split(/\s+/);
    if (!stage1 || !stage2) {
      setError('예: "경상남도 양산시" 형식으로 입력해주세요');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchEmergencyByRegion({ stage1, stage2, wideSearch: true, pageNumber: 1 });
      setResults(data.data.rooms || []);
    } catch (e: any) {
      setError(e?.message || '검색 중 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const searchByCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('브라우저에서 위치 정보를 지원하지 않습니다');
      return;
    }
    setIsLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const data = await fetchEmergencyByCoordinate({ latitude, longitude, wideSearch: true, pageNumber: 1 });
        setResults(data.data.rooms || []);
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
          placeholder="병원, 증상, 진료과목으로 검색"
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
        <FilterButton>
          <FilterIcon />
          <span>필터</span>
        </FilterButton>
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
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  outline: none;
`;

const SearchButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0 16px;
  cursor: pointer;

  &:hover {
    background: #c53030;
  }
`;

const GeoRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

const GeoButton = styled.button`
  background: #edf2f7;
  color: #1a202c;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  &:hover { background: #e2e8f0; }
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
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
    background: #e53e3e;
    color: white;
  }

  &:not(.active):hover {
    background: #f0f0f0;
  }
`;

export default SearchSection;
