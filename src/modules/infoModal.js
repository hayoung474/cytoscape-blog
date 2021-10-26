const SET_INFO_MODAL = 'infoModal/SET_INFO_MODAL';

export const setInfoModal = state => ({ type: SET_INFO_MODAL, state });
const initialState = {
  infoModal: false,
};


export default function infoModal(state = initialState, action) {
  switch (action.type) {
    case SET_INFO_MODAL:
      return {
        ...state,
        infoModal: action.state,
      };

    default:
      return state;
  }
}
