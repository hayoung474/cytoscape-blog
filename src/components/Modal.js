import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../modules/modal";

// 4. Graph.js 가 부모 컴포넌트이며, Graph.js 의 값에 따라 Modal의 표시값이 달라진다.
function Modal({
  // Graph.js 로 부터 넘어온 props
  graph, // Graph.js 에서 받아오는 graph 변수
  setGraph, // graph의 값을 변경하기 위한 setter 함수
  selectNodeId, // Graph 에서 선택한 Node의 Id를 받아오기 위한 변수
  modalType, // Modal의 종류를 정하는 변수. 이 값에 따라 모달에 출력할 내용이 달라짐
  deleteNodeList, // Node 삭제를 할 때 연관된 노드 및 엣지를 함께 삭제하기 위한 정보가 담긴 변수
  connectedNodes, // 특정 노드와 연결되어있는 Node들의 정보를 담은 변수
  currentNodeLabel, // 현재 선택한 노드의 Label 이름을 담은 변수. placeholder 에 띄울 용도로 사용함
  deleteNodeCurrentObj, // 삭제할 노드와 관련된 데이터를 담은 객체 변수
  selectEdgeId, // 현재 선택한 Edge의 Id 를 담은 변수
}) {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => ({ modal: state.modal.modal }));


  return (
    <>
      <DarkBackground modal={modal} onClick={() => dispatch(setModal(false))} />
      {modal && (
        <>
          {modalType === "리프노드추가" && (
            <ModalContent>
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
            <ModalContent>
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
            <ModalContent>
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
            <ModalContent>
              <ModalHeader>간선 삭제</ModalHeader>
              <ModalBody>해당 간선을 삭제하시겠습니까?</ModalBody>
              <ModalFooter>
                <ModalButton onClick={deleteEdge}>OK</ModalButton>
              </ModalFooter>
            </ModalContent>
          )}
          {modalType === "간선노드추가" && (
            <ModalContent>
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
          {/* {modalType === "이름변경" && (
            <ModalContent>
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
          )} */}
          {modalType === "이름변경" && (
            <ModalComponent header="노드이름변경" body="변경할 노드의 이름을 작성해주세요" type="이름변경"  execution_function="changeLabel"
            ></ModalComponent>
          )}
          {modalType === "간선추가" && (
            <ModalContent>
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
        </>
      )}
    </>
  );
}
const ModalButton = styled.button`
  background-color: grey;
  text-decoration: none;
  border: none;
  padding: 15px;
  color: white;
  border-radius: 30px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: white;
  padding: 20px;
  transform: translate(-50%, -50%);
  border-radius: 10px;
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

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);

  display: ${(props) => (props.modal ? "block" : "none")};
`;

export default Modal;
