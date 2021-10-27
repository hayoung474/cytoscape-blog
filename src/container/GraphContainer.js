import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModalPropsObj } from '../modules/modal';
import { setGraph, setIsInit } from '../modules/graph';
import { setModal } from '../modules/modal';

import firebase from 'firebase';
import Graph from '../components/Graph';

function GraphContainer() {
  const dispatch = useDispatch();

  const { graph } = useSelector(state => ({ graph: state.graph.graph })); // redux 의 graph 상태 구독
  const { isInit } = useSelector(state => ({ isInit: state.graph.isInit })); // 초기에 데이터를 불러왔는지 확인하기 위한 변수
  const { isAdmin } = useSelector(state => ({
    isAdmin: state.admin.isAdmin,
  }));

  const [loadGraph, setLoadGraph] = useState(false);

  let options = {
    evtType: 'cxttap',

    // 우클릭 시 나오는 메뉴 리스트
    menuItems: [
      {
        id: 'add-node', // 메뉴들의 구분을 위한 고유한 id (메뉴 id)
        content: '새 노드 추가', // 사용자에게 보여지는 메뉴 이름
        tooltipText: '새 노드 추가', // 메뉴에 마우스 hover 했을 때 띄울 tooltip (hidden)
        selector: 'core', //
        coreAsWell: true,
        show: isAdmin, // 항목 표시 여부. 관리자의 경우만 해당 메뉴를 활성화 하도록 함.
        // 해당 메뉴를 클릭했을 때 수행할 기능
        // 선택한 노드의 라벨(이름) 을 변경함.
        onClickFunction: function (e) {
          dispatch(setModalPropsObj({ modalType: '새노드추가' })); // 모달타입을 "이름변경"으로 세팅함.
          dispatch(setModal(true)); // 모달을 open 한다.
        },
      },
      {
        id: 'modify-node', // 메뉴들의 구분을 위한 고유한 id (메뉴 id)
        content: '이름 변경', // 사용자에게 보여지는 메뉴 이름
        tooltipText: '현재 노드 이름 변경', // 메뉴에 마우스 hover 했을 때 띄울 tooltip (hidden)
        selector: 'node', // 무엇을 우클릭 하면 활성화 되는지 => 노드에 우클릭을 하였을 경우 활성화 됨.
        coreAsWell: false,
        show: isAdmin, // 항목 표시 여부. 관리자의 경우만 해당 메뉴를 활성화 하도록 함.
        // 해당 메뉴를 클릭했을 때 수행할 기능
        // 선택한 노드의 라벨(이름) 을 변경함.
        onClickFunction: function (e) {
          let dataObj = { selectNodeId: e.target.id() };
          dispatch(setModalPropsObj({ modalType: '이름변경', data: dataObj })); // 모달타입을 "이름변경"으로 세팅함.
          dispatch(setModal(true)); // 모달을 open 한다.
        },
      },

      {
        id: 'connect-between-node-and-node',
        content: '간선 추가',
        tooltipText: '간선 추가',
        selector: 'node',
        coreAsWell: false,
        show: isAdmin,
        // 선택한 노드와 모달에서 선택한 타겟 노드를 연결하는 간선을 추가함
        onClickFunction: function (e) {
          let dataObj = { selectNodeId: e.target.id() }; // 현재 클릭한 노드의 id값을 selectNodeId라는 객체 속성으로 추가하여 객체를 만든다.
          dispatch(setModalPropsObj({ modalType: '간선추가', data: dataObj })); // 모달타입을 "간선추가"로 세팅함.
          dispatch(setModal(true));
        },
      },

      {
        id: 'add-leaf-node',
        content: '리프 노드 추가',
        tooltipText: '리프 노드 뒤에 노드 추가',
        selector: 'node',
        coreAsWell: false,
        show: isAdmin,
        // 선택한 노드 뒤에 리프 노드를 추가함.
        onClickFunction: function (e) {
          let dataObj = { selectNodeId: e.target.id() }; // 현재 클릭한 노드의 id값을 selectNodeId라는 객체 속성으로 추가하여 객체를 만든다.
          dispatch(setModalPropsObj({ modalType: '리프노드추가', data: dataObj })); // 모달타입을 "리프노드추가"로 세팅함.
          dispatch(setModal(true));
        },
      },

      {
        id: 'add-node-between-node-and-node',
        content: '간선에 노드 추가',
        tooltipText: '간선에 노드 추가',
        selector: 'edge', // 간선에 우클릭 하였을 경우 활성화 됨.
        coreAsWell: false,
        show: isAdmin,
        // 간선에 노드를 추가함.
        onClickFunction: function (e) {
          let newList = [];
          //connectedNodes[0],[1]은 연결된 노드들의 id값
          e.target.connectedNodes().each(e => {
            newList.push(e.id());
          });
          dispatch(setModal(true));

          let dataObj = {
            connectedNodes: newList,
            deleteTargetEdge: e.target.edges().id(),
          };
          dispatch(setModalPropsObj({ modalType: '간선에노드추가', data: dataObj }));
        },
      },

      {
        id: 'delete-edge',
        content: '간선 삭제',
        tooltipText: '해당 간선을 삭제',
        selector: 'edge',
        coreAsWell: false,
        show: isAdmin,
        onClickFunction: function (e) {
          // 선택한 간선을 삭제함.
          let dataObj = {
            selectEdgeId: e.target.edges().id(), // 현재 클릭한 간선의 id값을 selectEdgeId 에 저장함.
          };
          dispatch(setModalPropsObj({ modalType: '간선삭제', data: dataObj }));
          dispatch(setModal(true));
        },
      },
      {
        id: 'remove-node',
        content: '노드 삭제',
        tooltipText: '노드 삭제',
        selector: 'node',
        onClickFunction: function (e) {},
        disabled: false, //항목을 사용 안 함으로 만들 것인지 여부
        show: isAdmin, // 항목 표시 여부
        hasTrailingDivider: false, // 항목에 후행 구분선이 있는지 여부
        coreAsWell: false,
        submenu: [
          // 하위메뉴
          {
            id: 'remove-node-all',
            content: '하위노드 모두 삭제',
            tooltipText: '하위노드 모두 삭제',
            selector: 'node',
            onClickFunction: function (e) {
              // 하위 노드 모두 삭제 용
              let list = [];
              e.target
                .predecessors()
                .nodes()
                .each(function (e) {
                  list.push(e.id());
                }); // 자식 노드
              list.push(e.target.id()); // 현재 클릭한 노드의 Id 가 담겨있음.
              let dataObj = {
                deleteNodeList: list, // 삭제대상인 자식 노드 Id 들이 담겨있음. 이를 이용 하여 자식노드 및 연관 엣지를 삭제할 때 사용한다.
              };
              dispatch(
                setModalPropsObj({
                  modalType: '하위노드모두삭제',
                  data: dataObj,
                }),
              );
              dispatch(setModal(true));
            },
            disabled: false, //항목을 사용 안 함으로 만들 것인지 여부
            show: isAdmin, // 항목 표시 여부
            hasTrailingDivider: false, // 항목에 후행 구분선이 있는지 여부
            coreAsWell: false, // Whether core instance have this item on cxttap
          },
          {
            id: 'remove-node-all',
            content: '현재 노드만 삭제',
            tooltipText: '현재 노드만 삭제',
            selector: 'node',
            onClickFunction: function (e) {
              // child 구하는 방법을 잘 모르겠어서 야매 로직 작성
              // 바로 한단계 아래의 자식 노드 id 구하기
              let dataObj = {}; // 임시 객체
              let neighborhoodNodeList = []; // 바로 이웃한 노드 목록
              let neighborhoodEdgeList = []; // 바로 이웃한 엣지 목록
              let predecessorsNodeList = []; // 모든 자식 노드 목록
              let predecessorsEdgeList = []; // 모든 자식 엣지 목록
              let successorNodeList = []; // 모든 부모 노드 목록
              let successorEdgeList = []; // 모든 부모 엣지 목록
              e.target
                .neighborhood()
                .nodes()
                .each(function (e) {
                  neighborhoodNodeList.push(e.id());
                });
              e.target
                .predecessors()
                .nodes()
                .each(function (e) {
                  predecessorsNodeList.push(e.id());
                });
              e.target
                .neighborhood()
                .edges()
                .each(function (e) {
                  neighborhoodEdgeList.push(e.id());
                });
              e.target
                .predecessors()
                .edges()
                .each(function (e) {
                  predecessorsEdgeList.push(e.id());
                });
              e.target
                .successors()
                .nodes()
                .each(function (e) {
                  successorNodeList.push(e.id());
                });
              e.target
                .successors()
                .edges()
                .each(function (e) {
                  successorEdgeList.push(e.id());
                });
              let childNodes = predecessorsNodeList.filter(x => neighborhoodNodeList.includes(x)); // 바로 이웃한 자식 노드
              let childEdges = predecessorsEdgeList.filter(x => neighborhoodEdgeList.includes(x)); // 바로 이웃한 자식 엣지
              let parentEdges = successorEdgeList.filter(x => neighborhoodEdgeList.includes(x)); // 바로 이웃한 부모 엣지
              let parentNodes = successorNodeList.filter(x => neighborhoodNodeList.includes(x)); // 바로 이웃한 부모 노드

              dataObj['childNodes'] = childNodes;
              dataObj['childEdges'] = childEdges;
              dataObj['parentEdges'] = parentEdges;
              dataObj['parentNodes'] = parentNodes;
              dataObj['currentNodeId'] = e.target.id();

              dispatch(setModalPropsObj({ modalType: '현재노드만삭제', data: dataObj }));
              dispatch(setModal(true));
            },
            disabled: false,
            show: true,
            hasTrailingDivider: false,
            coreAsWell: false,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    firebase // firebase 에 접근하여 데이터를 받아오는 구문
      .database()
      .ref()
      .on('value', snapshot => {
        // 데이터베이스가 바뀌면 자동 트리거 됨.
        if (snapshot.val()) {
          // 불러올 데이터가 존재한다면
          /* 
            graph의 데이터 규격에 맞게 데이터를 정제한 후 
            setGraph를 사용하여 graph 값을 변경해줌 
           */
          const loadData = snapshot.val();
          const loadEdgeData = loadData['edges'];
          const loadNodeData = loadData['nodes'];

          let tempEdges = [];
          let edge;

          let tempNodes = [];
          let node;

          let tempObj = {};
          let tempGraph = {};

          for (edge in loadEdgeData) {
            tempObj = loadEdgeData[edge];
            tempEdges.push(tempObj);
          }

          for (node in loadNodeData) {
            tempObj = loadNodeData[node];
            tempNodes.push(tempObj);
          }

          tempGraph['nodes'] = tempNodes;
          tempGraph['edges'] = tempEdges;

          dispatch(setGraph(tempGraph)); // 그래프 세팅
          setLoadGraph(prev => !prev);
          dispatch(setIsInit(true)); // 초기데이터 로드를 마무리 하였음. loadDone 을 true로 변경해줌.
        }
      });
  }, [dispatch]);

  /* 
loadDone 조건 없이 graph값이 변경될 때 마다 graph 값을 update 하라고 하면 
초기 로드 시 아무런 값도 없는 grpah 값이 db에 반영되기 때문에 데이터가 날아갈 가능성이 있다.
이를 방지하기위해 초기에 db에서 데이터를 잘 가져왔는지 여부를 확인하기 위한 loadDone 변수를 추가하였다.
이렇게 되면 graph값이 바뀌었을 때 update 하여도 데이터가 모두 날아갈 가능성은 없다.
*/
  useEffect(() => {
    // 초기 데이터 로딩이 완료된 상태라면. null 방지
    if (isInit) firebase.database().ref().update(graph); // graph 데이터가 바뀔때마다 데이터베이스에 update해줌.
  }, [graph, isInit]);

  return (
    <>
      <Graph graph={graph} options={options} isAdmin={isAdmin} showGraph={loadGraph} />
    </>
  );
}

export default GraphContainer;
