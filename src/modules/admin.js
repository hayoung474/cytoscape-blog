const SET_ADMIN = 'admin/SET_ADMIN';

export const setAdmin = mode => ({ type: SET_ADMIN, mode });

const initialMode = {
    isAdmin: false
};

export default function admin (state = initialMode, action) {
    switch (action.type) {
        case SET_ADMIN:
            return {
                ...state,
                isAdmin: action.mode,
            }
        default:
            return state;
    }
}