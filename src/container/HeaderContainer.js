import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { setAdmin } from '../modules/admin';

function HeaderContainer() {
  const dispatch = useDispatch();

  const { isAdmin } = useSelector(state => ({ isAdmin: state.admin.isAdmin }));

  const [title, setTitle] = useState("SinaKim's velog");

  const adminToggle = () => {
    if (!isAdmin) {
      if (prompt('관리자 페이지로 이동하기 위해 비밀번호를 입력해주세요.') === '1772012756') {
        dispatch(setAdmin(true));
        setTitle("SinaKim's velog(관리자)");
      }
    } else {
      if (confirm('관리자 모드를 종료하시겠습니까?')) {
        dispatch(setAdmin(false));
        setTitle("SinaKim's velog");
      }
    }
  };

  return <Header adminToggle={adminToggle} title={title} />;
}

export default HeaderContainer;
