import React from 'react';
import styled from 'styled-components';

function Header({ adminLogin }) {
  return (
    <HeaderWrapper>
      <Title onClick={adminLogin}>SinaKim's velog</Title>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 75px;
  background: white;
  box-shadow: 0 4px 8px -4px gray;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  margin: 0 0 0 1.5rem;
  font-weight: 700;
  font-size: 32px;
  user-select: none;
`;

export default Header;
