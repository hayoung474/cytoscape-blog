import React from 'react';
import styled, { css } from 'styled-components';
import { GrClose } from 'react-icons/gr';

function InfoModal({ closeInfoModal, userInfo, userInfo2, userLink }) {
  return (
    <>
      <ModalContainer>
        <CustomGrClose onClick={closeInfoModal} />

        <Container>
          <ProfileImgContainer />
          <UserName>SinaKim</UserName>
          <UserInfo infoNum={1}>{userInfo}</UserInfo>
        </Container>

        <Container>
          <UserInfo infoNum={2}>{userInfo2}</UserInfo>
          <div>
            <p style={{ fontSize: '20px', margin: '0' }}>저에 대해서 더 알고 싶으시다면!</p>
            {userLink.map((el, idx) => (
              <div key={idx}>{el.name}</div>
            ))}
          </div>
        </Container>
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
  justify-content: center;
`;

const ProfileImgContainer = styled.div`
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
  margin: ${props => (props.infoNum === 1 ? css`2rem 0 0 0` : css`0`)};
  text-align: center;
  font-size: 24px;
  white-space: pre-line;
  line-height: ${props => (props.infoNum === 2 ? css`2.5rem;` : css``)};
`;

export default InfoModal;