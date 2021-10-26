import React, { useState, useEffect } from 'react';
import InfoModal from '../components/InfoModal';
import { useSelector, useDispatch } from 'react-redux';
import { setInfoModal } from '../modules/infoModal';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { AiFillMail } from 'react-icons/ai';
import firebase from 'firebase';

function InfoModalContainer() {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector(state => ({ isAdmin: state.admin.isAdmin }));
  const { infoModal } = useSelector(state => ({ infoModal: state.infoModal.infoModal }));

  const [userName, setUserName] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [userInfo2, setUserInfo2] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const [userLink, setUserLink] = useState([
    { name: 'Github', url: 'https://github.com/sina-Kim', ImgComp: BsGithub },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/sinakim97/', ImgComp: BsLinkedin },
    { name: 'EMail', url: 'mailto:sinabero3271@kakao.com', ImgComp: AiFillMail },
  ]);

  const [inputs, setInputs] = useState({
    userName: '',
    userInfo: '',
    userInfo2: '',
    profileImg: null,
  });

  const closeInfoModal = () => {
    dispatch(setInfoModal(false));
  };

  const onChange = e => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleChangeFile = e => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setInputs({ ...inputs, profileImg: base64.toString() }); // 파일 base64 상태 업데이트
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      //setInputs({...inputs,profileImg:e.target.files[0]}); // 파일 상태 업데이트
    }
  };

  const onSubmit = () => {
    if (isAdmin) {
      const prevData = { userName: userName, userInfo: userInfo, userInfo2: userInfo2, profileImg: profileImg };
      const nextData = { ...inputs };
      if (JSON.stringify(prevData) !== JSON.stringify(nextData)) {
        if (confirm('변경사항을 저장하시겠습니까?')) {
          firebase.database().ref('blogData/').set({
            userName: inputs.userName,
            userInfo: inputs.userInfo,
            userInfo2: inputs.userInfo2,
            profileImg: inputs.profileImg,
          });
        } else {
          setInputs({ ...inputs, userName: userName, userInfo: userInfo, userInfo2: userInfo2, profileImg: profileImg }); // 저장을 하지 않을 경우 기존 값 그대로 두기
        }
      }
    }
    closeInfoModal(); // 모달 닫기
  };

  // DB가 변경되면 자동으로 값이 새로 세팅됨.
  useEffect(() => {
    firebase // 데이터베이스에서 데이터 가져오기
      .database()
      .ref('blogData/')
      .on('value', snapshot => {
        if (snapshot.val()) {
          const loadData = snapshot.val();
          setUserName(loadData['userName']);
          setUserInfo(loadData['userInfo']);
          setUserInfo2(loadData['userInfo2']);
          setProfileImg(loadData['profileImg']);
          setInputs({ ...inputs, userName: userName, userInfo: userInfo, userInfo2: userInfo2, profileImg: profileImg });
        }
      });
  }, [infoModal]); // 모달이 켜졌을 때 수행

  return (
    <>
      {infoModal ? (
        <InfoModal
          handleChangeFile={handleChangeFile}
          profileImg={profileImg}
          setInputs={setInputs}
          onSubmit={onSubmit}
          onChange={onChange}
          userName={userName}
          userInfo={userInfo}
          userInfo2={userInfo2}
          userLink={userLink}
          isAdmin={isAdmin}
          inputs={inputs}
        />
      ) : null}
    </>
  );
}

export default InfoModalContainer;
