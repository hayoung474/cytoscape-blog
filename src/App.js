import React, { useState, useEffect } from "react";
import GraphContainer from "./container/GraphContainer";
import Modal from "./components/Modal";
import data from "./data/data.json";
import firebase from "firebase";
import Graph from "./components/Graph";

function App() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [loadDone,setLoadDone] = useState(false)
  useEffect(() => {
    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
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

        setLoadDone(true);
      });
  }, []);
  useEffect(() => {
    console.log("그래프변동발생");
    // // targetNode 를 통해 egde 연결을 해 주어야 함.
    if(loadDone===true){
      firebase.database().ref().update(graph);
    }

  }, [graph]);

  return (
    <>
      <Graph graph={graph} setGraph={setGraph} />
    </>
  );
}

export default App;
