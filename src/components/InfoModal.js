import React from 'react';
import styled, { css } from 'styled-components';
import { GrClose } from 'react-icons/gr';

import Link from './Link';

function InfoModal({ onChange, onSubmit, userName, userInfo, userInfo2, userLink, inputs, isAdmin, profileImg, handleChangeFile }) {
  return (
    <>
      <ModalContainer>
        <CustomGrClose onClick={onSubmit} size="18" />
        {isAdmin ? (
          <>
            <Container>
              <label htmlFor="uploadFile">
                <ProfileImgContainer editable url={inputs.profileImg || profileImg}>
                  <div className="image" />
                </ProfileImgContainer>
              </label>

              <CustomFileInput
                name="profileImg"
                onChange={handleChangeFile}
                id="uploadFile"
                type="file"
                accept="image/gif,image/jpeg,image/png"
              ></CustomFileInput>
              <CustomInput name="userName" onChange={onChange} defaultValue={userName}></CustomInput>
              <CustomTextArea name="userInfo" onChange={onChange} defaultValue={userInfo} infoNum={1}></CustomTextArea>
            </Container>
            <Container>
              <CustomTextArea name="userInfo2" onChange={onChange} defaultValue={userInfo2} infoNum={2}></CustomTextArea>
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
        ) : (
          <>
            <Container>
              <ProfileImgContainer url={profileImg}>
                <div className="image"></div>
              </ProfileImgContainer>
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

      <Dim onClick={onSubmit} />
    </>
  );
}

const CustomInput = styled.input`
  width: 360px;
  height: 35px;
  border-radius: 10px;
  border: solid 2px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  text-align: center;
  margin: 1rem 0 1rem 0;
`;

const CustomTextArea = styled.textarea`
  border-radius: 10px;
  width: 360px;
  height: 250px;
  border: solid 2px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  padding-left: 1rem;
  word-break: normal;
  resize: none;
`;
const CustomFileInput = styled.input`
  display: none;
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
  overflow: hidden;

  .image {
    background-image: url(${props => props.url});
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;

    ${({ editable }) =>
      editable &&
      css`
        transition: all 0.3s ease-in-out;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
          filter: blur(5px);
        }
      `}
  }
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
