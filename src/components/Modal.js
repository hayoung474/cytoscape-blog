import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const ModalButton = styled.button`
  background-color: grey;
  text-decoration: none;
  border: none;
  padding: 15px;
  color: white;
  border-radius: 30px;
  cursor: pointer;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;
const ModalContent = styled.div`
  margin: 200px auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  height: 300px;
`;

const ModalHeader = styled.div`
  font-weight: bold;
  font-size: 20px;
  display: block;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  font-size: 15px;
  display: block;
  margin-bottom: 10px;
`;

const ModalFooter = styled.div`
  display: block;
  float: right;
`;

const ModalInput = styled.input`
  font-size: 15px;
  display: block;
  height: 35px;
  border: solid 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding-left: 5px;
  margin-bottom: 5px;
`;

const ModalSelect = styled.select`
  font-size: 15px;
  display: block;
  height: 35px;
  border: solid 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding-left: 5px;
  margin-bottom: 5px;
  width: 100%;
`;

// 4. Graph.js 가 부모 컴포넌트이며, Graph.js 의 값에 따라 Modal의 표시값이 달라진다. 
function Modal({ // Graph.js 로 부터 넘어온 props 
  graph, // Graph.js 에서 받아오는 graph 변수
  setGraph, // graph의 값을 변경하기 위한 setter 함수
  isOpen, // modal이 열려있는지 여부를 확인하기 위한 변수
  setIsOpen, // isOpen의 값을 변경하기 위한 setter 함수
  selectNodeId, // Graph 에서 선택한 Node의 Id를 받아오기 위한 변수
  modalType, // Modal의 종류를 정하는 변수. 이 값에 따라 모달에 출력할 내용이 달라짐
  deleteNodeList, // Node 삭제를 할 때 연관된 노드 및 엣지를 함께 삭제하기 위한 정보가 담긴 변수
  connectedNodes, // 특정 노드와 연결되어있는 Node들의 정보를 담은 변수
  currentNodeLabel, // 현재 선택한 노드의 Label 이름을 담은 변수. placeholder 에 띄울 용도로 사용함
  deleteNodeCurrentObj, // 삭제할 노드와 관련된 데이터를 담은 객체 변수
  selectEdgeId, // 현재 선택한 Edge의 Id 를 담은 변수
}) {
  const [newNodeLabel, setNewNodeLabel] = useState(""); // 새로운 노드를 추가할 때 label 값을 입력받기 위한 변수.
  const [changeNodeLabel, setChangeNodeLabel] = useState(""); // 노드의 label을 변경할 때 사용하기 위한 변수
  const [targetNodeId, setTargetNodeId] = useState(""); // 노드 추가 및 간선 추가 용

  const modalEl = useRef(); // modal 박스 자체 DOM 객체를 선택하기 위한 ref 변수
  const wrapperEl = useRef(); // modal 바깥의 어두운 배경 DOM 객체를 선택하기 위한 ref 변수

  useEffect(() => {
    const escKeyDownClose = (e) => {
      // esc 버튼을 클릭하였을 경우
      if (e.keyCode === 27) {
        closeModal(); // 모달 창을 닫도록 함.
      }
    };
    const handleClickOutside = (e) => {
      /* ModalWrapper 에 Ref 를 걸어서, ModalWrapper 영역을 클릭했을 때 Modal이 꺼지도록 함. ModalContent 부분은 클릭해도 꺼지지 않도록 조건을 달았음.*/
      if (!modalEl.current || !wrapperEl.current) {
        //modalEl과 wrapperEl를 제외한 것을 클릭하였을 경우
        return; // 아무런 이벤트를 수행하지 않고 함수를 종료하도록 함
      }
      if (
        !modalEl.current.contains(e.target) &&
        wrapperEl.current.contains(e.target)
      ) {
        // 만약에 클릭한 것이 modalEl은 아님과 동시에 wrapperEl이 맞다면
        closeModal(); // 모달 창을 닫도록 함
      }
    };
    // 이벤트 리스너에 등록함.
    window.addEventListener("keydown", escKeyDownClose); // esc 를 눌러서 모달 닫기
    window.addEventListener("click", handleClickOutside); // 모달 바깥을 클릭하여 모달 닫기

    // 언마운트
    return () => {
      // 이벤트 리스너 등록 한 것을 제거함.
      window.removeEventListener("keydown", escKeyDownClose);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // 간선을 추가할 때 사용되는 구문(?)
    // selectNodeId 가 변경된다면
    setTargetNodeId(selectNodeId); // 타겟노드의 id를 변경하도록 함.
  }, [selectNodeId]);

  /* 모달 창을 닫도록 하는 함수 */
  const closeModal = () => {
    setIsOpen(false);
  };

  /* "이름변경" 기능을 위한 함수 */
  const changeLabel = () => {
    let newGraph = { ...graph }; // spread 함수를 사용하여 useEffect가 발동되도록 함 !
    // (spread를 통해 값을 복사하는 것을 습관화 하여야 할 듯 ,,, 안그러면 자꾸 useEffect가 발동이 안되네 ㅠ )
    newGraph.nodes.forEach((item) => {
      if (item.data.label === currentNodeLabel) {
        // 만약에 현재 선택한 라벨과 동일한 라벨을 가진 노드를 찾았다면
        item.data.label = changeNodeLabel; // 그 노드의 라벨을 변경하고자 하는 새로운 라벨 이름으로 변경함
      }
    });

    setGraph(newGraph); // graph 자체를 덮어씌움
    closeModal(); // 모달 창 닫기
  };

  /* "간선추가" 기능을 위한 함수 */
  const addEdge = () => {
    // 기존 노드와의 연결을 위한 엣지 추가를 위한  함수
    let newGraph = { ...graph };
    newGraph["edges"].push({
      data: {
        id: selectNodeId + "->" + targetNodeId,
        source: selectNodeId, // selectNodeId 는 그래프에서 우클릭으로 선택한 노드의 id 값
        target: targetNodeId, // targetNodeId 는 모달에서 선택한 연결하고자 하는 노드의 id 값
      },
    });
    setGraph(newGraph);
    closeModal();
  };

  /* "간선에 노드 추가" 기능을 위한 함수 */
  const addToEdgeNode = () => {
    const newNodeId = Math.random().toString(36).substr(2, 11); // 랜덤스트링 생성 구문
    let newGraph = { ...graph };

    // 두 노드가 연결된 엣지 제거
    newGraph.edges.forEach((item, index) => {
      if (item.data.id === connectedNodes[2]) {
        //connectedNodes[2] 는 현재 선택한 edge의 id값임.
        newGraph.edges.splice(index, 1); // 엣지를 제거함.
      }
    });
    // 새 노드 추가
    newGraph["nodes"].push({ data: { id: newNodeId, label: newNodeLabel } });

    // 새 노드와 기존 노드들 연결 , 총 엣지 2개 필요
    newGraph["edges"].push({
      data: {
        id: newNodeId + "->" + connectedNodes[1],
        source: newNodeId,
        target: connectedNodes[1],
      },
    });
    newGraph["edges"].push({
      data: {
        id: connectedNodes[0] + "->" + newNodeId,
        source: connectedNodes[0],
        target: newNodeId,
      },
    });
    setGraph(newGraph);
    closeModal();
  };
  /* "노드추가" 기능을 위한 함수 */
  const addNode = () => {
    const newNodeId = Math.random().toString(36).substr(2, 11);
    let newGraph = { ...graph };
    newGraph["nodes"].push({ data: { id: newNodeId, label: newNodeLabel } });
    newGraph["edges"].push({
      data: {
        id: newNodeId + "->" + targetNodeId,
        source: newNodeId,
        target: targetNodeId,
      },
    });
    setGraph(newGraph);
    closeModal();
  };

  /* "노드삭제 > 하위노드 모두 삭제" 기능을 위한 함수 */
  const deleteNodeAll = () => {
    // nodeList의 id를 포함하는 모든 객체를 제거하도록 함.
    // deleteNodeList 에는 현재 선택한 노드를 포함한 하위노드들의 id값을 담고있음.
    let newGraph = { ...graph };
    deleteNodeList.forEach((node) => {
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
    setGraph(newGraph);
    closeModal();
  };

  /* "노드삭제 > 현재 노드만 삭제" 기능을 위한 함수 */
  const deleteNodeCurrent = () => {
    // nodeList의 id를 포함하는 모든 객체를 제거하도록 함.
    console.log(deleteNodeCurrentObj);
    let newGraph = { ...graph };
    // 부모 edge와 자식 edge를 우선 삭제 함
    deleteNodeCurrentObj.parentEdges.forEach((parentEdge) => {
      newGraph.edges.forEach((item, index) => {
        if (item.data.id === parentEdge) {
          newGraph.edges.splice(index, 1);
        }
      });
    });
    deleteNodeCurrentObj.childEdges.forEach((childEdge) => {
      newGraph.edges.forEach((item, index) => {
        if (item.data.id === childEdge) {
          newGraph.edges.splice(index, 1);
        }
      });
    });

    // currentNode를 삭제
    newGraph.nodes.forEach((item, index) => {
      if (item.data.id === deleteNodeCurrentObj.currentNodeId) {
        newGraph.nodes.splice(index, 1);
      }
    });

    // parent 노드와 child 노드를 연결함.
    deleteNodeCurrentObj.parentNodes.forEach((parentNode) => {
      deleteNodeCurrentObj.childNodes.forEach((childNode) => {
        newGraph["edges"].push({
          data: {
            id: childNode + "->" + parentNode,
            source: childNode,
            target: parentNode,
          },
        });
      });
    });
    setGraph(newGraph);
    closeModal();
  };

  /* "간선 삭제" 기능을 위한 함수 */
  const deleteEdge = () => {
    let newGraph = { ...graph };
    newGraph.edges.forEach((item, index) => {
      if (item.data.id === selectEdgeId) {
        newGraph.edges.splice(index, 1);
      }
    });
    setGraph(newGraph);
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <ModalWrapper ref={wrapperEl}>
          {modalType === "리프노드추가" && (
            <ModalContent ref={modalEl}>
              <ModalHeader>새 노드 추가</ModalHeader>
              <ModalBody>
                추가할 노드의 이름을 작성해주세요
                <ModalInput
                  placeholder="Node Label"
                  type="text"
                  onChange={(e) => {
                    setNewNodeLabel(e.target.value);
                  }}
                ></ModalInput>
              </ModalBody>
              <ModalFooter>
                <ModalButton onClick={addNode}>Add</ModalButton>
              </ModalFooter>
            </ModalContent>
          )}
          {modalType === "하위노드모두삭제" && (
            <ModalContent ref={modalEl}>
              <ModalHeader>노드 및 엣지 삭제</ModalHeader>
              <ModalBody>
                <h4>전체삭제</h4>
                해당 노드를 포함한 하위 노드 및 연결된 엣지가 모두 삭제됩니다.
                <h4>삭제하시겠습니까?</h4>
              </ModalBody>
              <ModalFooter>
                <ModalButton onClick={deleteNodeAll}>OK</ModalButton>
              </ModalFooter>
            </ModalContent>
          )}
          {modalType === "현재노드만삭제" && (
            <ModalContent ref={modalEl}>
              <ModalHeader>노드 및 엣지 삭제</ModalHeader>
              <ModalBody>
                <h4>현재노드 삭제</h4>
                해당 노드 및 연결된 엣지가 모두 삭제 되고 하위 노드는 상위
                노드에 포함됩니다.
                <h4>삭제하시겠습니까?</h4>
              </ModalBody>
              <ModalFooter>
                <ModalButton onClick={deleteNodeCurrent}>OK</ModalButton>
              </ModalFooter>
            </ModalContent>
          )}
          {modalType === "간선삭제" && (
            <ModalContent ref={modalEl}>
              <ModalHeader>간선 삭제</ModalHeader>
              <ModalBody>해당 간선을 삭제하시겠습니까?</ModalBody>
              <ModalFooter>
                <ModalButton onClick={deleteEdge}>OK</ModalButton>
              </ModalFooter>
            </ModalContent>
          )}
          {modalType === "간선노드추가" && (
            <ModalContent ref={modalEl}>
              <ModalHeader>엣지에 노드 추가</ModalHeader>
              <ModalBody>
                추가할 노드의 이름을 작성해주세요
                <ModalInput
                  placeholder="Node Label"
                  type="text"
                  onChange={(e) => {
                    setNewNodeLabel(e.target.value);
                  }}
                ></ModalInput>
              </ModalBody>
              <ModalFooter>
                <ModalButton onClick={addToEdgeNode}>OK</ModalButton>
              </ModalFooter>
            </ModalContent>
          )}
          {modalType === "이름변경" && (
            <ModalContent ref={modalEl}>
              <ModalHeader>노드 이름 변경</ModalHeader>
              <ModalBody>
                변경할 노드의 이름을 작성해주세요
                <ModalInput
                  type="text"
                  onChange={(e) => {
                    setChangeNodeLabel(e.target.value);
                  }}
                  placeholder={currentNodeLabel}
                ></ModalInput>
              </ModalBody>
              <ModalFooter>
                <ModalButton onClick={changeLabel}>OK</ModalButton>
              </ModalFooter>
            </ModalContent>
          )}
          {modalType === "간선추가" && (
            <ModalContent ref={modalEl}>
              <ModalHeader>간선 추가</ModalHeader>
              <ModalBody>
                해당 노드와 연결할 노드를 선택하세요
                <ModalSelect
                  onChange={(e) => {
                    setTargetNodeId(
                      e.target.options[e.target.selectedIndex].value
                    );
                  }}
                >
                  {graph.nodes.map((item, index) => {
                    return (
                      <option value={item.data.id} key={index}>
                        {item.data.label}
                      </option>
                    );
                  })}
                </ModalSelect>
              </ModalBody>
              <ModalFooter>
                <ModalButton onClick={addEdge}>OK</ModalButton>
              </ModalFooter>
            </ModalContent>
          )}
        </ModalWrapper>
      )}
    </>
  );
}
export default Modal;
