import React, { useState } from 'react';
import InfoModal from '../components/InfoModal';
import { useSelector, useDispatch } from 'react-redux';
import { setInfoModal } from '../modules/infoModal';

import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { AiFillMail } from 'react-icons/ai';

function InfoModalContainer() {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector(state => ({ isAdmin: state.admin.isAdmin }));

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

  const closeInfoModal = () => {
    dispatch(setInfoModal(false));
  };

  const { infoModal } = useSelector(state => ({ infoModal: state.infoModal.infoModal }));

  return (
    <>
      {infoModal ? (
        <InfoModal userInfo={userInfo} userInfo2={userInfo2} userLink={userLink} closeInfoModal={closeInfoModal} isAdmin={isAdmin} />
      ) : null}
    </>
  );
}

export default InfoModalContainer;
