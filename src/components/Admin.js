import React from 'react';
import styled from 'styled-components';

function Admin({ adminLogin }) {
  /* 왼쪽 상단에 투명버튼으로 되어있는 관리자 로그인 버튼 */
  return <AdminSetButton onClick={adminLogin} />;
}

const AdminSetButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  opacity: 0;
  z-index: 10;
`;

export default Admin;
