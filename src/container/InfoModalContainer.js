import React from 'react';
import InfoModal from '../components/InfoModal';
import { useSelector, useDispatch } from 'react-redux';
import { setInfoModal } from '../modules/infoModal';

function InfoModalContainer() {
  const dispatch = useDispatch();
  const closeInfoModal = () => {
    dispatch(setInfoModal(false));
  };

  const { infoModal } = useSelector(state => ({ infoModal: state.infoModal.infoModal }));

  return <>{infoModal ? <InfoModal closeInfoModal={closeInfoModal} /> : null}</>;
}

export default InfoModalContainer;
