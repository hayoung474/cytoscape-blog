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

  const [userName, setUserName] = useState('sinaKim');
  const [userInfo, setUserInfo] = useState('안녕하세요 🐻, 시나브로 나아가고 있습니다.');
  const [userInfo2, setUserInfo2] = useState(`저는 딥러닝, 컴퓨터 비전에 흥미가 있는,
  소프트웨어 설계와 디자인 패턴에 푹 빠진,
  더 나은 교육 환경 만들기에 관심이 있는,
  언젠가 개발자가 될 sinaKim 입니다!`);

  const [userLink, setUserLink] = useState([
    { name: 'Github', url: 'https://github.com/sina-Kim', ImgComp: BsGithub },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/sinakim97/', ImgComp: BsLinkedin },
    { name: 'EMail', url: 'mailto:sinabero3271@kakao.com', ImgComp: AiFillMail },
  ]);

  const [inputs, setInputs] = useState({
    userName: userName,
    userInfo: userInfo,
    userInfo2: userInfo2,
    profileImg: 'profileImg',
  });

  const closeInfoModal = () => {
    dispatch(setInfoModal(false));
  };

  const onChange = e => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmit = () => {
    if (isAdmin) {
      const prevData = { userName: userName, userInfo: userInfo, userInfo2: userInfo2, profileImg: 'profileImg' };
      const nextData = { ...inputs };
      console.log(prevData, nextData);
      console.log(JSON.stringify(prevData) !== JSON.stringify(nextData));
      if (JSON.stringify(prevData) !== JSON.stringify(nextData)) {
        if (confirm('변경사항을 저장하시겠습니까?')) {
          firebase.database().ref('blogData/').set({
            userName: inputs.userName,
            userInfo: inputs.userInfo,
            userInfo2: inputs.userInfo2,
            profileImg: 'profileImg',
          });
        }
        else{
          setInputs({ ...inputs, userName:userName,userInfo:userInfo,userInfo2:userInfo2 });
        }
      }
    }

    closeInfoModal();
  };

  // DB가 변경되면 자동으로 값이 새로 세팅됨.
  useEffect(() => {
    firebase
      .database()
      .ref('blogData/')
      .on('value', snapshot => {
        if (snapshot.val()) {
          const loadData = snapshot.val();
          setUserName(loadData['userName']);
          setUserInfo(loadData['userInfo']);
          setUserInfo2(loadData['userInfo2']);
          console.log(loadData);
        }
      });
  }, []);


  return (
    <>
      {infoModal ? (
        <InfoModal
          inputs={inputs}
          setInputs={setInputs}
          onSubmit={onSubmit}
          onChange={onChange}
          userName={userName}
          userInfo={userInfo}
          userInfo2={userInfo2}
          userLink={userLink}
          closeInfoModal={closeInfoModal}
          isAdmin={isAdmin}
        />
      ) : null}
    </>
  );
}

export default InfoModalContainer;
