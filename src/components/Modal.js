import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../modules/modal';

// 4. Graph.js 가 부모 컴포넌트이며, Graph.js 의 값에 따라 Modal의 표시값이 달라진다.
function Modal({ execution_function, children, modalType, setNodeLabel, setTargetNodeId }) {
  const dispatch = useDispatch();
  const { graph } = useSelector(state => ({ graph: state.graph.graph })); // redux 의 graph 상태 구독

  return useMemo(() => {
    return (
      <>
        <DarkBackground onClick={() => dispatch(setModal(false))} />

        <ModalContent>
          <ModalHeader>{modalType}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          {(modalType === '이름변경' || modalType === '리프노드추가' || modalType === '간선에노드추가' || modalType === '새노드추가') && (
            <ModalInput
              placeholder="Node Label"
              type="text"
              onChange={e => {
                setNodeLabel(e.target.value);
              }}
            ></ModalInput>
          )}
          {modalType === '간선추가' && (
            <ModalSelect
              onChange={e => {
                setTargetNodeId(e.target.options[e.target.selectedIndex].value);
              }}
            >
              <option value="" selected="selected" hidden="hidden">
                연결할 간선을 선택하세요
              </option>
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
      </>
    );
  }, [execution_function, children, modalType, setNodeLabel, setTargetNodeId]);
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
  z-index: 1;
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
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: block;
`;

export default Modal;
