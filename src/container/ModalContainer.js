import React, { useEffect } from "react";
import Modal from "../components/Modal";
import { setModal } from "../modules/modal";
import { setGraph } from "../modules/graph";
import { useDispatch } from "react-redux";
import { useState } from "react";

function ModalContainer({ modalPropsObj, graph }) {

  const dispatch = useDispatch();
  const [nodeLabel, setNodeLabel] = useState(""); // 노드의 label 값을 저장하기 위한 변수
  const [targetNodeId, setTargetNodeId] = useState(""); // 노드 추가 및 간선 추가

  //   /* "이름변경" 기능을 위한 함수 */
  const changeLabel = () => {
    let newGraph = { ...graph }; // spread 함수를 사용하여 useEffect가 발동되도록 함 !
    // (spread를 통해 값을 복사하는 것을 습관화 하여야 할 듯 ,,, 안그러면 자꾸 useEffect가 발동이 안되네 ㅠ )
    newGraph.nodes.forEach((item) => {
      if (item.data.label === modalPropsObj.data.currentNodeLabel) {
        // 만약에 현재 선택한 라벨과 동일한 라벨을 가진 노드를 찾았다면
        item.data.label = nodeLabel; // 그 노드의 라벨을 변경하고자 하는 새로운 라벨 이름으로 변경함
      }
    });

    dispatch(setGraph(newGraph)); // graph 자체를 덮어씌움
    dispatch(setModal(false));
  };

  //   /* "간선추가" 기능을 위한 함수 */
  const addEdge = () => {
    // 기존 노드와의 연결을 위한 엣지 추가를 위한  함수
    let newGraph = { ...graph };
    newGraph["edges"].push({
      data: {
        id: modalPropsObj.data.selectNodeId + "->" + targetNodeId,
        source: modalPropsObj.data.selectNodeId, // selectNodeId 는 그래프에서 우클릭으로 선택한 노드의 id 값
        target: targetNodeId, // targetNodeId 는 모달에서 선택한 연결하고자 하는 노드의 id 값
      },
    });
    dispatch(setGraph(newGraph));
    dispatch(setModal(false));
  };

  //   /* "간선에 노드 추가" 기능을 위한 함수 */
  const addToEdgeNode = () => {
    const newNodeId = Math.random().toString(36).substr(2, 11); // 랜덤스트링 생성 구문
    let newGraph = { ...graph };

    // 두 노드가 연결된 엣지 제거
    newGraph.edges.forEach((item, index) => {
      if (item.data.id === modalPropsObj.data.deleteTargetEdge) {
        //deleteTargetNode 는 현재 선택한 edge의 id값임.
        newGraph.edges.splice(index, 1); // 엣지를 제거함.
      }
    });
    // 새 노드 추가
    newGraph["nodes"].push({ data: { id: newNodeId, label: nodeLabel } });

    // 새 노드와 기존 노드들 연결 , 총 엣지 2개 필요
    newGraph["edges"].push({
      data: {
        id: newNodeId + "->" + modalPropsObj.data.connectedNodes[1],
        source: newNodeId,
        target: modalPropsObj.data.connectedNodes[1],
      },
    });
    newGraph["edges"].push({
      data: {
        id: modalPropsObj.data.connectedNodes[0] + "->" + newNodeId,
        source: modalPropsObj.data.connectedNodes[0],
        target: newNodeId,
      },
    });
    dispatch(setGraph(newGraph));
    dispatch(setModal(false));
  };

  //   /* "노드추가" 기능을 위한 함수 */
  const addNode = () => {
    const newNodeId = Math.random().toString(36).substr(2, 11);
    const targetNodeId = modalPropsObj.data.selectNodeId;
    let newGraph = { ...graph };
    newGraph["nodes"].push({ data: { id: newNodeId, label: nodeLabel } });
    newGraph["edges"].push({
      data: {
        id: newNodeId + "->" + targetNodeId,
        source: newNodeId,
        target: targetNodeId,
      },
    });
    dispatch(setGraph(newGraph));
    dispatch(setModal(false));
  };

  //   /* "노드삭제 > 하위노드 모두 삭제" 기능을 위한 함수 */
  const deleteNodeAll = () => {
    // nodeList의 id를 포함하는 모든 객체를 제거하도록 함.
    // deleteNodeList 에는 현재 선택한 노드를 포함한 하위노드들의 id값을 담고있음.
    let newGraph = { ...graph };
    modalPropsObj.data.deleteNodeList.forEach((node) => {
      newGraph.nodes.forEach((item, index) => {
        if (item.data.id === node) {
          newGraph.nodes.splice(index, 1);
        }
      });
      newGraph.edges.forEach((item, index) => {
        if (item.data.id.includes(node)) {
          // edge의 id에 삭제대상 노드의 id가 포함되어있다면(연관간선여부 판단)
          newGraph.edges.splice(index, 1); // 해당 edge 삭제
        }
      });
    });
    dispatch(setGraph(newGraph));
    dispatch(setModal(false));
  };

  //   /* "노드삭제 > 현재 노드만 삭제" 기능을 위한 함수 */
  const deleteNodeCurrent = () => {
    // nodeList의 id를 포함하는 모든 객체를 제거하도록 함.
    let newGraph = { ...graph };

    // currentNode를 삭제
    newGraph.nodes.forEach((item, index) => {
      if (item.data.id === modalPropsObj.data.currentNodeId) {
        newGraph.nodes.splice(index, 1);
      }
    });

    // 부모 edge와 자식 edge를 우선 삭제 함
    if (modalPropsObj.data.parentEdges.length !== 0) {
      modalPropsObj.data.parentEdges.forEach((parentEdge) => {
        newGraph.edges.forEach((item, index) => {
          if (item.data.id === parentEdge) {
            newGraph.edges.splice(index, 1);
          }
        });
      });
    }
    if (modalPropsObj.data.childEdges.length !== 0) {
      modalPropsObj.data.childEdges.forEach((childEdge) => {
        newGraph.edges.forEach((item, index) => {
          if (item.data.id === childEdge) {
            newGraph.edges.splice(index, 1);
          }
        });
      });
    }
    // if (
    //   modalPropsObj.data.parentEdges.length !== 0 &&
    //   modalPropsObj.data.childEdges.length !== 0
    // ) {
    //   // parent 노드와 child 노드를 연결함.
    //   modalPropsObj.data.parentNodes.forEach((parentNode) => {
    //     modalPropsObj.childNodes.forEach((childNode) => {
    //       newGraph["edges"].push({
    //         data: {
    //           id: childNode + "->" + parentNode,
    //           source: childNode,
    //           target: parentNode,
    //         },
    //       });
    //     });
    //   });
    // }
    dispatch(setGraph(newGraph));
    dispatch(setModal(false));
  };

  //   /* "간선 삭제" 기능을 위한 함수 */
  const deleteEdge = () => {
    let newGraph = { ...graph };
    newGraph.edges.forEach((item, index) => {
      if (item.data.id === modalPropsObj.data.selectEdgeId) {
        newGraph.edges.splice(index, 1);
      }
    });
    dispatch(setGraph(newGraph));
    dispatch(setModal(false));
  };
  return (
    <>
      <Modal
        modalType={modalPropsObj.modalType}
        execution_function={
          (modalPropsObj.modalType === "이름변경" && changeLabel) ||
          (modalPropsObj.modalType === "간선에노드추가" && addToEdgeNode) ||
          (modalPropsObj.modalType === "간선추가" && addEdge) ||
          (modalPropsObj.modalType === "간선삭제" && deleteEdge) ||
          (modalPropsObj.modalType === "하위노드모두삭제" && deleteNodeAll) ||
          (modalPropsObj.modalType === "현재노드만삭제" && deleteNodeCurrent) ||
          (modalPropsObj.modalType === "리프노드추가" && addNode)
        }
        setNodeLabel={setNodeLabel}
        setTargetNodeId={setTargetNodeId}
      >
        {/* 모달 body 부분.*/}
        {modalPropsObj.modalType === "리프노드추가" && (
          <>추가할 노드의 이름을 작성해주세요</>
        )}
        {modalPropsObj.modalType === "간선추가" && (
          <>해당 노드와 연결할 노드를 선택하세요</>
        )}
        {modalPropsObj.modalType === "간선삭제" && (
          <>해당 간선을 삭제하시겠습니까?</>
        )}
        {modalPropsObj.modalType === "간선에노드추가" && (
          <>추가할 노드의 이름을 작성해주세요</>
        )}
        {modalPropsObj.modalType === "이름변경" && (
          <>변경할 노드의 이름을 작성해주세요</>
        )}
        {modalPropsObj.modalType === "하위노드모두삭제" && (
          <>
            해당 노드를 포함한 하위 노드 및 연결된 엣지가 모두 삭제됩니다.
            <h3>삭제하시겠습니까?</h3>
          </>
        )}
        {modalPropsObj.modalType === "현재노드만삭제" && (
          <>
            해당 노드 및 연결된 엣지가 모두 삭제 되고 하위 노드는 상위 노드에
            포함됩니다.
            <h3>삭제하시겠습니까?</h3>
          </>
        )}
      </Modal>
    </>
  );
}

export default ModalContainer;
