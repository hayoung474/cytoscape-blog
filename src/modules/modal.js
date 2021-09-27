const SET_MODAL = "modal/SET_MODAL";
const SET_MODAL_PROPS_OBJ = "modal/SET_MODAL_PROPS_OBJ";

export const setModal = (state) => ({ type: SET_MODAL, state });
export const setModalPropsObj = (state) => ({
  type: SET_MODAL_PROPS_OBJ,
  state,
});

const initialState = {
  modal: false,
  modalPropsObj: {},
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        modal: action.state,
      };
    case SET_MODAL_PROPS_OBJ:
      return {
        ...state,
        modalPropsObj: action.state,
      };
    default:
      return state;
  }
}
