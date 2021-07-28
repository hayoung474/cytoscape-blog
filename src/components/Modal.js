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
}) {
  //const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const modalEl = useRef();
  const wrapperEl = useRef();

  const [newNodeLabel, setNewNodeLabel] = useState("");
  const [targetNodeId, setTargetNodeId] = useState("");

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
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

  const deleteNode = () => {
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
          {modalType === "노드삭제" && (
            <ModalContent ref={modalEl}>
              <ModalHeader>노드 및 엣지 삭제</ModalHeader>
              <ModalBody>
                해당 노드를 포함한 하위 노드 및 연결된 엣지가 모두 삭제됩니다.
                삭제하시겠습니까?
              </ModalBody>
              <ModalFooter>
                <ModalButton onClick={deleteNode}>OK</ModalButton>
              </ModalFooter>
            </ModalContent>
          )}
        </ModalWrapper>
      )}
    </>
  );
}

export default Modal;
