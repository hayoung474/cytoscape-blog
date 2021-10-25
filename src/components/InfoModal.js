import React from 'react';
import styled, { css } from 'styled-components';
import { GrClose } from 'react-icons/gr';

import Link from './Link';

function InfoModal({ closeInfoModal, userInfo, userInfo2, userLink, isAdmin }) {
  return (
    <>
      <ModalContainer>
        <CustomGrClose onClick={closeInfoModal} size="18"/>
        {isAdmin ? null : (
          <>
            <Container>
              <ProfileImgContainer />
              <UserName>SinaKim</UserName>
              <UserInfo infoNum={1}>{userInfo}</UserInfo>
            </Container>
            <Container>
              <UserInfo infoNum={2}>{userInfo2}</UserInfo>
              <div>
                <AboutMe>저에 대해서 더 알고 싶으시다면!</AboutMe>
                <LinkContainer>
                  {userLink.map((link, idx) => (
                    <Link key={idx} name={link.name} url={link.url} ImgComp={link.ImgComp} />
                  ))}
                </LinkContainer>
              </div>
            </Container>
          </>
        )}
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
  z-index: 11; // 모달이 켜져있을 경우 뒤에 버튼들 안눌리게 설정
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
  z-index:10; // 모달이 켜져있을 경우 뒤에 버튼들 안눌리게 설정
`;

const CustomGrClose = styled(GrClose)`
  font-size: 32px;
  position: fixed;
  top: 2%;
  right: 2%;
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
  background-image: url('https://sina-kim.github.io/assets/images/sina-bear.jpg');
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
  line-height: ${props => (props.infoNum === 2 ? css`2.5;` : css``)};
`;

const AboutMe = styled.p`
  margin: 120px 0 0 0;
  font-size: 20px;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0 0 0;
`;

export default InfoModal;
