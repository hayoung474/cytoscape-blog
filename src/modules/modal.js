const SET_MODAL = 'modal/SET_MODAL';

export const setModal = state => ({ type: SET_MODAL, state });

const initialState = {
    modal: false
};

export default function modal (state = initialState, action) {
    switch (action.type) {
        case SET_MODAL:
            return {
                ...state,
                modal: action.state,
            }
        default:
            return state;
    }
}