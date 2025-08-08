'use client';

import styled from '@emotion/styled';
import { useHospitalStore } from '@/store/useHospitalStore';
import SearchIcon from '@/components/icons/SearchIcon';
import FilterIcon from '@/components/icons/FilterIcon';
import ListIcon from '@/components/icons/ListIcon';
import MapIcon from '@/components/icons/MapIcon';

const SearchSection = () => {
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery
  } = useHospitalStore();
  return (
    <Container>
      <SearchBar>
        <SearchInput
          placeholder="병원, 증상, 진료과목으로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton>
          <SearchIcon />
        </SearchButton>
      </SearchBar>
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
