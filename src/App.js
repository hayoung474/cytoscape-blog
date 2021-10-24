import React from 'react';
import Graph from './container/GraphContainer';
import MenuButtons from './components/MenuButtons';
import Modal from './container/ModalContainer';
import Header from './container/HeaderContainer';
import InfoModal from './container/InfoModalContainer';

import { createGlobalStyle } from 'styled-components';

function App() {
  return (
    <>
      <GlobalStyle />
      {/* 헤더 */}
      <Header />
      {/* 우측 하단의 코스를 숨겨놓은 버튼 */}
      <MenuButtons />
      {/* 메인 그래프 */}
      <Graph />
      {/* 모달 */}
      <Modal />
      {/* 소개 모달 (블로그 주인 소개, 블로그 주인 치팅 사이트 소개) */}
      <InfoModal />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'NanumSquare';
  }
`;

export default App;
