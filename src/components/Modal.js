import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import data from "../data/data.json";
import firebase from "firebase";

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

function Modal({
  graph,
  setGraph,
  isOpen,
  setIsOpen,
  selectNodeId,
  modalType,
  deleteNodeList,
  connectedNodes,
  currentNodeLabel,
  deleteNodeCurrentObj,
}) {

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const modalEl = useRef();
  const wrapperEl = useRef();

  const [newNodeLabel, setNewNodeLabel] = useState("");
  const [changeNodeLabel, setChangeNodeLabel] = useState("");
  const [targetNodeId, setTargetNodeId] = useState(""); // 노드 추가 및 간선 추가 용

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener("keydown", close); // esc 를 눌러서 모달 닫기
    window.addEventListener("click", handleClickOutside); // 모달 바깥을 클릭하여 모달 닫기

    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTargetNodeId(selectNodeId);
  }, [selectNodeId]);

  const handleClickOutside = (e) => {
    /* ModalWrapper 에 Ref 를 걸어서, ModalWrapper 영역을 클릭했을 때 Modal이 꺼지도록 함. ModalContent 부분은 클릭해도 꺼지지 않도록 조건을 달았음.*/
    if (!modalEl.current || !wrapperEl.current) {
      return;
    }
    if (
      !modalEl.current.contains(e.target) &&
      wrapperEl.current.contains(e.target)
    ) {
      closeModal();
    }
  };

  const changeLabel = () => {
    let newGraph = { ...graph };
    newGraph.nodes.map((item, index) => {
      if (item.data.label === currentNodeLabel) {
        item.data.label = changeNodeLabel;
      }
    });

    setGraph(newGraph); // 덮어씌우기
  };
  const addEdge = () => {
    // 기존 노드와의 연결을 위한 간선 추가 함수
    let newGraph = { ...graph };
    newGraph["edges"].push({
      data: {
        id: selectNodeId + "->" + targetNodeId,
        source: selectNodeId,
        target: targetNodeId,
      },
    });
    setGraph(newGraph);
    closeModal();
  };
  const addToEdgeNode = () => {
    const newNodeId = Math.random().toString(36).substr(2, 11); // 대충 어딘가에서 퍼온 랜덤스트링 생성 구문

    // setGraph 를 사용하여 graph 자체를 업데이트 해줌.
    let newGraph = { ...graph }; // spread 안쓰면 useEffect가 발동 안되네? 참고참고 !!!

    // 두 노드가 연결된 엣지 제거
    newGraph.edges.map((item, index) => {
      if (item.data.id === connectedNodes[2]) {
        newGraph.edges.splice(index, 1);
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
  const addNode = () => {
    const newNodeId = Math.random().toString(36).substr(2, 11); // 대충 어딘가에서 퍼온 랜덤스트링 생성 구문

    // setGraph 를 사용하여 graph 자체를 업데이트 해줌.
    let newGraph = { ...graph }; // spread 안쓰면 useEffect가 발동 안되네? 참고참고 !!!
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

  const deleteNodeAll = () => {
    // nodeList의 id를 포함하는 모든 객체를 제거하도록 함.
    let newGraph = { ...graph };
    deleteNodeList.map((node, index) => {
      newGraph.nodes.map((item, index) => {
        if (item.data.id === node) {
          newGraph.nodes.splice(index, 1);
        }
      });
      newGraph.edges.map((item, index) => {
        if (item.data.id.includes(node)) {
          newGraph.edges.splice(index, 1);
        }
      });
    });

    setGraph(newGraph); // 덮어씌우기
    closeModal();
  };
  const deleteNodeCurrent = () => {
    // nodeList의 id를 포함하는 모든 객체를 제거하도록 함.
    console.log(deleteNodeCurrentObj)
    let newGraph = { ...graph };
    // 부모 edge와 자식 edge를 우선 삭제 함
    deleteNodeCurrentObj.parentEdges.map((parentEdge, index) => {
      newGraph.edges.map((item, index) => {
        if (item.data.id === parentEdge) {
          newGraph.edges.splice(index, 1);
        }
      });
    });
    deleteNodeCurrentObj.childEdges.map((childEdge, index) => {
      newGraph.edges.map((item, index) => {
        if (item.data.id === childEdge) {
          newGraph.edges.splice(index, 1);
        }
      });
    });

    // currentNode를 삭제
    newGraph.nodes.map((item, index) => {
      if (item.data.id === deleteNodeCurrentObj.currentNodeId) {
        newGraph.nodes.splice(index, 1);
      }
    });

    // parent 노드와 child 노드를 연결함.

    deleteNodeCurrentObj.parentNodes.map((parentNode, index) => {
      deleteNodeCurrentObj.childNodes.map((childNode, index) => {
        newGraph["edges"].push({
          data: {
            id: childNode + "->" + parentNode,
            source: childNode,
            target: parentNode,
          },
        });

      });
    });
    setGraph(newGraph); // 덮어씌우기
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
                  placeholder="Node Label"
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
          {modalType === "엣지추가" && (
            <ModalContent ref={modalEl}>
              <ModalHeader>엣지 추가</ModalHeader>
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
