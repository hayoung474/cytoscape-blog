import React from 'react';
import styled from 'styled-components';

function InfoModal({ closeInfoModal }) {
  return (
    <>
      <ModalContainer></ModalContainer>
      <Dim onClick={closeInfoModal} />
    </>
  );
}

const ModalContainer = styled.div`
  background: white;
  position: fixed;
  width: 80%;
  height: 75%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 28px;
  z-index: 1;
`;

const Dim = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default InfoModal;
