import React from 'react';
import styled, { css } from 'styled-components';
import { GrClose } from 'react-icons/gr';

function InfoModal({ closeInfoModal }) {
  const userInfo = `주인 소개주인 소개주인 소개주인 소개주인 소개주인 소개주인 소개주인 소개주인 소개주인 소개
  주인 소개주인 소개주인 소개주인 소개주인 소개
  주인 소개주인 소개주인 소개주인 소개주인 소개`;
  return (
    <>
      <ModalContainer>
        <CustomGrClose onClick={closeInfoModal} />

        <Container>
          <ProfileImgContainer />
          <UserName>SinaKim</UserName>
          <UserInfo>{userInfo}</UserInfo>
        </Container>

        <Container></Container>
      </ModalContainer>

      <Dim onClick={closeInfoModal} />
    </>
  );
}

const ModalContainer = styled.div`
  background: white;
  position: fixed;
  width: 1024px;
  height: 768px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 28px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
`;

const Dim = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CustomGrClose = styled(GrClose)`
  font-size: 32px;
  position: absolute;
  top: 1%;
  right: 1%;
  cursor: pointer;
`;

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImgContainer = styled.div`
  margin-top: 60px;
  width: 360px;
  height: 360px;
  background-image: url('https://raw.githubusercontent.com/sina-Kim/sina-Kim.github.io/master/assets/images/sina-bear.jpg?token=APFSJOF5PUIX7EBFA4SASKLBNPOWS');
  background-size: contain;
  background-repeat: no-repeat;
`;

const UserName = styled.p`
  margin: 1rem 0 0 0;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;

const UserInfo = styled.p`
  margin: 2rem 2rem 2rem 2rem;
  font-size: 20px;
  white-space: pre-line;
`;

export default InfoModal;
