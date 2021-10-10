import React, { useState } from 'react';
import InfoModal from '../components/InfoModal';
import { useSelector, useDispatch } from 'react-redux';
import { setInfoModal } from '../modules/infoModal';

function InfoModalContainer() {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState('아직 비어있습니다..');

  const closeInfoModal = () => {
    dispatch(setInfoModal(false));
  };

  const { infoModal } = useSelector(state => ({ infoModal: state.infoModal.infoModal }));

  return <>{infoModal ? <InfoModal userInfo={userInfo} closeInfoModal={closeInfoModal} /> : null}</>;
}

export default InfoModalContainer;
