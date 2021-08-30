import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../modules/modal";

// 4. Graph.js 가 부모 컴포넌트이며, Graph.js 의 값에 따라 Modal의 표시값이 달라진다.
function Modal({
  // Graph.js 로 부터 넘어온 props
  header,
  execution_function,
  children,
  modalType,
  setNodeLabel,
  setTargetNodeId,
}) {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => ({ modal: state.modal.modal }));
  const { graph } = useSelector((state) => ({ graph: state.graph.graph })); // redux 의 graph 상태 구독

  return (
    <>
      <DarkBackground modal={modal} onClick={() => dispatch(setModal(false))} />
      {modal && (
        <ModalContent>
          <ModalHeader>{modalType}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          {(modalType === "이름변경" || modalType === "리프노드추가" || modalType==="간선에노드추가") && (
            <ModalInput
              placeholder="Node Label"
              type="text"
              onChange={(e) => {
                setNodeLabel(e.target.value);
              }}
            ></ModalInput>
          )}
          {modalType === "간선추가" && (
            <ModalSelect
              onChange={(e) => {
                setTargetNodeId(e.target.options[e.target.selectedIndex].value);
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
          )}
          <ModalFooter>
            <ModalButton onClick={execution_function}>Add</ModalButton>
          </ModalFooter>
        </ModalContent>
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
