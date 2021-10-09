import React from 'react';
import Graph from './container/GraphContainer';
import AdminBtn from './container/AdminContainer';
import Menus from './components/Menus';
import Modal from './container/ModalContainer';

function App() {
  // 1. firebase 로 부터 데이터를 받아와 정제하여 graph에 세팅함.

  return (
    <>
      {/* 좌측 상단의 숨겨놓은 관리자모드 버튼 */}
      <AdminBtn />
      {/* 우측 하단의 코스를 숨겨놓은 버튼 */}
      <Menus />
      {/* 메인 그래프 */}
      <Graph />
      {/* 모달 */}
      <Modal />
    </>
  );
}

export default App;
