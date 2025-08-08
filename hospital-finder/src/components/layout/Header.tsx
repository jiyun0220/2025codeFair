'use client';

import styled from '@emotion/styled';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon>+</LogoIcon>
        <LogoText>사이트 이름</LogoText>
      </Logo>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: white;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.div`
  background: #e53e3e;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

// Location block removed (dummy content)

export default Header;
