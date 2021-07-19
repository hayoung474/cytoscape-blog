import React , {useState,useEffect,useRef} from "react";
import styled from "styled-components";
import data from '../data/data.json'
import firebase from 'firebase'

const ModalButton = styled.button`
background-color: grey;
  text-decoration: none;
  border: none;
  padding: 15px;
  color: white;
  border-radius: 30px;
  cursor: pointer;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;left: 0;bottom:0;right:0;
  background: rgba(0, 0, 0, 0.5);
  z-index:9;
`;
const ModalContent = styled.div`
  margin:200px auto;
  background-color: white;
  padding:20px;
  border-radius: 10px;
  width: 200px;
  height: 300px;
`;

const ModalHeader = styled.div`
    font-weight:bold;
    font-size:20px;
    display:block;
    margin-bottom:10px;
`

const ModalBody = styled.div`
    font-size:15px;
    display:block;
    margin-bottom:10px;
`

const ModalFooter = styled.div`
    display:block;
    float:right;
`

const ModalInput = styled.input`
    font-size:15px;
    display:block;
    height:35px;
    border:solid 2px rgba(0,0,0,0.2);
    border-radius:5px;
    padding-left:5px;
    margin-bottom:5px;
    
`

const ModalSelect = styled.select`
    font-size:15px;
    display:block;
    height:35px;
    border:solid 2px rgba(0,0,0,0.2);
    border-radius:5px;
    padding-left:5px;
    margin-bottom:5px;
    width:100%;
`
function Modal(){
    const modalEl = useRef();
    const wrapperEl = useRef();
    const [isOpen,setIsOpen] = useState(false);

    const openModal = ()=>{setIsOpen(true);}
    const closeModal = ()=>{setIsOpen(false);}

    const [newNodeLabel,setNewNodeLabel] = useState("");
    const [targetNodeId,setTargetNodeId] = useState("");
    useEffect(()=>{
        window.addEventListener('click',handleClickOutside);
        return ()=>{
            window.removeEventListener('click',handleClickOutside);
        }
    },[])

    const handleClickOutside = (e) => {
        /* ModalWrapper 에 Ref 를 걸어서, ModalWrapper 영역을 클릭했을 때 Modal이 꺼지도록 함. ModalContent 부분은 클릭해도 꺼지지 않도록 조건을 달았음.*/
        if (!modalEl.current || !wrapperEl.current){
            return;
        }
        if (!modalEl.current.contains(e.target) && wrapperEl.current.contains(e.target)) {
            closeModal();
        }
      }
    const addNode = () =>{

        const newNodeId = Math.random().toString(36).substr(2,11); // 대충 어딘가에서 퍼온 랜덤스트링 생성 구문
        /* 랜덤 키를 생성하기 위하여 push 사용*/
        /* leaf 노드 추가 가정. 추후 가운데 삽입 같은 것도 생각해야 함. */
        firebase.database().ref('nodes/').push({
            data:{
                id:newNodeId,
                label:newNodeLabel
            }
        });

        // targetNode 를 통해 egde 연결을 해 주어야 함.
        firebase.database().ref('edges/').push({
            data:{
                id: newNodeId+"->"+targetNodeId,
                source: newNodeId,
                target: targetNodeId
            }
        });

    }
    return(
        <>
        <ModalButton onClick={openModal}>Add Node</ModalButton>
        {isOpen && (<ModalWrapper ref={wrapperEl}>
            <ModalContent ref={modalEl}>
                <ModalHeader>Add Node</ModalHeader>
                <ModalBody>
                    <ModalInput placeholder="Node Label" type="text" onChange={(e)=>{setNewNodeLabel(e.target.value)}}></ModalInput>
                    {/* <ModalSelect >
                        {data.nodes.map((item,index)=>{
                            return (<option onChange={(e)=>{setSourceNode(e.target.value)}} key={index} >{item.data.label}</option>)
                        })}
                    </ModalSelect> */}
                    Target Node
                    <ModalSelect onChange={(e)=>{setTargetNodeId(e.target.options[e.target.selectedIndex].value)}}>
                        {data.nodes.map((item,index)=>{
                            return (<option value={item.data.id} key={index}>{item.data.label}</option>)
                        })}
                    </ModalSelect>
                    child node 생략 시 리프 노드가 됩니다
                </ModalBody>
                <ModalFooter>
                    <ModalButton onClick={addNode}>Add</ModalButton>
                </ModalFooter>
            </ModalContent>
            </ModalWrapper> 
        )}
        </>
    )
}

export default Modal;