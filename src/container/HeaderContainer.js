import React from 'react';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../modules/admin';

function HeaderContainer() {
  const dispatch = useDispatch();

  const adminLogin = () => {
    const password = prompt('password');
    if (password === '1772012756') dispatch(setAdmin(true));
  };

  return <Header adminLogin={adminLogin} />;
}

export default HeaderContainer;
