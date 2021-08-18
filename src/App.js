import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Graph from "./components/Graph";
import styled from "styled-components";
import Menus from "./components/Menus";

/* 왼쪽 상단에 투명버튼으로 되어있는 관리자 로그인 버튼*/
const AdminSetButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  opacity: 0;
  z-index: 10;
`;
function App() {
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 모드를 관리하기위한 변수
  const [graph, setGraph] = useState({ nodes: [], edges: [] }); // graph 데이터 
  const [loadDone, setLoadDone] = useState(false); // 초기에 데이터를 불러왔는지 확인하기 위한 변수
  useEffect(() => {
    firebase // firebase 에 접근하여 데이터를 받아오는 구문
      .database()
      .ref()
      .on("value", (snapshot) => {
        // 데이터베이스가 바뀌면 자동 트리거 됨.
        if (snapshot.val()) { // 불러올 데이터가 존재한다면 

          // 데이터를 정제하여 setGraph를 사용하여 graph 값을 변경해줌
          const loadData = snapshot.val();
          const loadEdgeData = loadData["edges"];
          const loadNodeData = loadData["nodes"];

          let tempNodes = [];
          let tempEdges = [];
          let tempObj = {};
          let tempGraph = {};

          for (var key in loadEdgeData) {
            tempObj = loadEdgeData[key];
            tempEdges.push(tempObj);
          }
          for (var key in loadNodeData) {
            tempObj = loadNodeData[key];
            tempNodes.push(tempObj);
          }

          tempGraph["nodes"] = tempNodes;
          tempGraph["edges"] = tempEdges;
          setGraph(tempGraph);

          setLoadDone(true); // 초기데이터 로드를 마무리 하였음. loadDone 을 true로 변경해줌.
        }
      });
  }, []);
  useEffect(() => {
    /* 
    loadDone 조건 없이 graph값이 변경될 때 마다 graph 값을 update 하라고 하면 
    초기 로드 시 아무런 값도 없는 grpah 값이 db에 반영되기 때문에 데이터가 날아갈 가능성이 있다.
    이를 방지하기위해 초기에 db에서 데이터를 잘 가져왔는지 여부를 확인하기 위한 loadDone 변수를 추가하였다.
    이렇게 되면 graph값이 바뀌었을 때 update 하여도 데이터가 모두 날아갈 가능성은 없다.
    */
    if (loadDone === true) {
      // 초기 데이터 로딩이 완료된 상태라면. null 방지
      firebase.database().ref().update(graph); // graph 데이터가 바뀔때마다 데이터베이스에 update해줌.
    }
  }, [graph, loadDone]);

  /* 관리자 로그인 함수 */
  const adminLogin = () => {
    let password = prompt("password" + "");
    if (password === "1234")  setIsAdmin(true);
  };

  return (
    <>
      <AdminSetButton onClick={adminLogin}></AdminSetButton>
      <Menus />
      <Graph graph={graph} setGraph={setGraph} isAdmin={isAdmin} />
    </>
  );
}

export default App;
