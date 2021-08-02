import React, { useState, useEffect } from "react";
import GraphContainer from "./container/GraphContainer";
import Modal from "./components/Modal";
import data from "./data/data.json";
import firebase from "firebase";
import Graph from "./components/Graph";
import styled from "styled-components";

const AdminSetButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  opacity:0;
`;
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [loadDone, setLoadDone] = useState(false);
  useEffect(() => {
    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        // 데이터베이스가 바뀌면 자동 트리거 됨.
        if (snapshot.val()) {
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
    if (loadDone === true) {
      // 초기 데이터 로딩이 완료된 상태라면. null 방지
      firebase.database().ref().update(graph); // graph 데이터가 바뀔때마다 데이터베이스에 update해줌.
    }
  }, [graph]);

  const adminLogin = ()=>{
    console.log("test")
    let password = prompt("password"+"");
    if(password === "1234"){
      setIsAdmin(true);
    }
  }

  return (
    <>
      <AdminSetButton onClick={adminLogin}></AdminSetButton>
      <Graph graph={graph} setGraph={setGraph} isAdmin={isAdmin} />
    </>
  );
}

export default App;
