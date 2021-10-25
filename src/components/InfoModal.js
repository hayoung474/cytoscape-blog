import React from 'react';
import styled, { css } from 'styled-components';
import { GrClose } from 'react-icons/gr';

import Link from './Link';

function InfoModal({ closeInfoModal, userName, userInfo, userInfo2, userLink, isAdmin }) {
  return (
    <>
      <ModalContainer>
        <CustomGrClose onClick={closeInfoModal} size="18" />
        {isAdmin ? (
          <>
            <Container>
              <ProfileImgContainer />
              <MainTitleEditContainer>
                <CustomButton>프로필사진 수정</CustomButton>
              </MainTitleEditContainer>
            </Container>
            <Container>
              <EditContainer>
                <p className="item">닉네임</p>
                <p className="item">{userName}</p>
                <CustomButton className="item">수정</CustomButton>
              </EditContainer>
              <EditContainer>
                <p className="item">메인 타이틀</p>
                <p className="item">{userInfo}</p>
                <CustomButton className="item">수정</CustomButton>
              </EditContainer>
              <EditContainer>
                <p className="item">서브 타이틀</p>
                <p className="item">{userInfo2}</p>
                <CustomButton className="item">수정</CustomButton>
              </EditContainer>
            </Container>
          </>
        ) : (
          <>
            <Container>
              <ProfileImgContainer />
              <UserName>{userName}</UserName>
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

const MainTitleEditContainer = styled.div`
  display: flex;
  width: 360px;
`;

const EditContainer = styled.div`
  display: flex;
  width: 90%;
  font-size: 20px;
  .item:nth-child(1) {
    width:30%;
    font-weight:bold;
  }
  .item:nth-child(2) {
    width:55%;
    padding-right:1rem;
  }
  .item:nth-child(3) {
    width:15%;
  }
`;
const CustomInput = styled.input`
  margin: 1rem 0 0 0;
  font-weight: 700;
  text-align: center;
  border-radius: 10px;
  border: solid 2px rgba(0, 0, 0, 0.1);
`;
const CustomButton = styled.button`
  margin: 1rem 0 0 0;
  width: 100%;

  height: 35px;
  border: none;
  border-radius: 10px;
  background-color: #62c7fa;
  font-size: 18px;
  font-weight: bold;
  color: white;
  &:hover {
    background-color: #7cd3ff;
  }
  &:active {
    background-color: #52c5ff;
  }
`;
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
  z-index: 10; // 모달이 켜져있을 경우 뒤에 버튼들 안눌리게 설정
`;

const CustomGrClose = styled(GrClose)`
  font-size: 32px;
  position: fixed;
  top: 3%;
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
