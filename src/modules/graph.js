const SET_GRAPH = "graph/SET_GRAPH";
const SET_ISINIT = "graph/SET_ISINIT";

export const setGraph = (state) => ({ type: SET_GRAPH, state });
export const setIsInit = (state) => ({ type: SET_ISINIT, state });


const initialState = {
  graph: { nodes: [], edges: [] }, // 초기 graph 데이터,
  isInit: false, // 초기에 데이터를 불러왔는지 확인하기 위한 변수
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SET_GRAPH:
        console.log(action.state)
      return {
        ...state,
        graph: action.state,
      };
    case SET_ISINIT:
      return {
        ...state,
        isInit: action.state,
      };
    default:
      return state;
  }
}
