import React,{useState,useEffect}from "react";
import GraphContainer from "./container/GraphContainer";
import Modal from './components/Modal'
import data from './data/data.json'
import firebase from 'firebase'

function App() {
  const [graph, setGraph] = useState(data);


  useEffect(()=>{
    firebase.database().ref().on('value',(snapshot) => {
      const loadData = snapshot.val();
      const loadEdgeData = loadData['edges'];
      const loadNodeData = loadData['nodes'];

      let tempNodes=[];
      let tempEdges=[];
      let tempObj={};
      let tempGraph = {};

      for (var key in loadEdgeData) {
        tempObj = loadEdgeData[key];
        tempEdges.push(tempObj);
      }
      for (var key in loadNodeData) {
        tempObj = loadNodeData[key];
        tempNodes.push(tempObj);
      }

      tempGraph['nodes'] = tempNodes;
      tempGraph['edges'] = tempEdges;
      setGraph(tempGraph);
    });
  },[])

  return (
    <>
      <Modal graph={graph}/>
      <GraphContainer graph={graph}/>
    </>

  );
}

export default App;
