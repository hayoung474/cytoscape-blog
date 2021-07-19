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
    const addtest = (source,target) =>{
        firebase.database().ref('node/data/').set({
            id:"test",
            label:""
        });
    }
    return(
        <>
        <ModalButton onClick={openModal}>Add Node</ModalButton>
        {isOpen && (<ModalWrapper ref={wrapperEl}>
            <ModalContent ref={modalEl}>
                <ModalHeader>Add Node</ModalHeader>
                <ModalBody>
                    <ModalInput placeholder="Node Name" type="text"></ModalInput>
                    Parent Node
                    <ModalSelect >
                        {data.nodes.map((item,index)=>{
                            return (<option key={index}>{item.data.label}</option>)
                        })}
                    </ModalSelect>
                    Child Node
                    <ModalSelect>
                        {data.nodes.map((item,index)=>{
                            return (<option key={index}>{item.data.label}</option>)
                        })}
                    </ModalSelect>
                    child node 생략 시 리프 노드가 됩니다
                </ModalBody>
                <ModalFooter>
                    <ModalButton onClick={addtest}>Add</ModalButton>
                </ModalFooter>
            </ModalContent>
            </ModalWrapper> 
        )}
        </>
    )
}

export default Modal;