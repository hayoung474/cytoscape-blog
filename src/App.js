import React from 'react';
// import loadable from '@loadable/component';

import Graph from './container/GraphContainer';
import MenuButtons from './components/MenuButtons';
import Header from './container/HeaderContainer';
import Modal from './container/ModalContainer';
import InfoModal from './container/InfoModalContainer';

// 라우터 기준으로 구분하는게 원래는 좋다..
// const Modal = loadable(() => import('./container/ModalContainer'));
// const InfoModal = loadable(() => import('./container/InfoModalContainer'));

import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';

function App() {
  const { infoModal } = useSelector(state => ({ infoModal: state.infoModal.infoModal }));
  const { modal } = useSelector(state => ({ modal: state.modal.modal }));

  return (
    <>
      <GlobalStyle />
      {/* 헤더 */}
      <Header />
      {/* 우측 하단의 버튼 */}
      <MenuButtons />
      {/* 메인 그래프 */}
      <Graph />
      {/* 모달 */}
      {modal && <Modal />}
      {/* 소개 모달 (블로그 주인 소개, 블로그 주인 치팅 사이트 소개) */}
      {infoModal && <InfoModal />}
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'NanumSquare';
  }
`;

export default App;
