import React,{useState,useEffect}from "react";
import GraphContainer from "./container/GraphContainer";
import Modal from './components/Modal'
import data from './data/data.json'
import firebase from 'firebase'

function App() {
  const [graph, setGraph] = useState(data);
  const [tempNodes,setTempNodes] = useState([]);
  const [tempEdges,setTempEdges] = useState([]);

  const fetchNodesData = ()=>{
    firebase.database().ref("nodes/").on("value", (e) => {
      const loadData2 = e.val();
      let temp=[];
      for (var key in loadData2) {
        let nodeObj = loadData2[key];
        temp.push(nodeObj);
      }
      setTempNodes(temp)
    });
  }
  const fetchEdgesData = () =>{
    firebase.database().ref("edges/").on("value", (e) => {
      const loadData = e.val();
      let temp=[];
      for (var key in loadData) {
        let edgeObj = loadData[key];
        temp.push(edgeObj);
      }
      setTempEdges(temp)
    });
  }

  const fetchGraphData = ()=>{
    let tempGraph = {};
    tempGraph['nodes'] = tempNodes;
    tempGraph['edges'] = tempEdges;
    setGraph(tempGraph);
  }

  useEffect(()=>{
    fetchNodesData();
    fetchEdgesData();
  },[])

  useEffect(()=>{
    console.log(tempNodes);
    fetchGraphData();

  },[tempNodes])
  useEffect(()=>{
    console.log(tempEdges);
    fetchGraphData();
  },[tempEdges])

  return (
    <>
    <h1>SinaKim's DevBlog</h1>
      <Modal graph={graph}/>
      <GraphContainer graph={graph}/>
      
    </>

  );
}

export default App;
