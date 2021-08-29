import React from "react";
import Admin from "../components/Admin"

import { useDispatch } from "react-redux"
import { setAdmin } from "../modules/admin";

function AdminContainer () {
    const dispatch = useDispatch();

    /* 관리자 로그인 함수 */
    const adminLogin = () => {
        let password = prompt("password");
        // 임시로 1234
        if (password === "1234") dispatch(setAdmin(true));
    };

    return (
        <Admin adminLogin={adminLogin} />
    )
}

export default AdminContainer;