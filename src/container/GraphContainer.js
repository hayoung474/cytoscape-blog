import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGraph, setIsInit } from "../modules/graph";
import firebase from "firebase";
import Graph from "../components/Graph";

function GraphContainer() {
  const { graph } = useSelector((state) => ({ graph: state.graph.graph })); // redux 의 graph 상태 구독
  const { isInit } = useSelector((state) => ({ isInit: state.graph.isInit })); // 초기에 데이터를 불러왔는지 확인하기 위한 변수

  const dispatch = useDispatch();

  useEffect(() => {
    firebase // firebase 에 접근하여 데이터를 받아오는 구문
      .database()
      .ref()
      .on("value", (snapshot) => {
        // 데이터베이스가 바뀌면 자동 트리거 됨.
        if (snapshot.val()) {
          // 불러올 데이터가 존재한다면

          /* 
            graph의 데이터 규격에 맞게 데이터를 정제한 후 
            setGraph를 사용하여 graph 값을 변경해줌 
           */
          const loadData = snapshot.val();
          const loadEdgeData = loadData["edges"];
          const loadNodeData = loadData["nodes"];

          let tempEdges = [];
          let edge;

          let tempNodes = [];
          let node;

          let tempObj = {};
          let tempGraph = {};

          for (edge in loadEdgeData) {
            tempObj = loadEdgeData[edge];
            tempEdges.push(tempObj);
          }

          for (node in loadNodeData) {
            tempObj = loadNodeData[node];
            tempNodes.push(tempObj);
          }

          tempGraph["nodes"] = tempNodes;
          tempGraph["edges"] = tempEdges;

          dispatch(setGraph(tempGraph)); // 그래프 세팅
          dispatch(setIsInit(true)); // 초기데이터 로드를 마무리 하였음. loadDone 을 true로 변경해줌.
        }
      });
  }, []);

  /* 
loadDone 조건 없이 graph값이 변경될 때 마다 graph 값을 update 하라고 하면 
초기 로드 시 아무런 값도 없는 grpah 값이 db에 반영되기 때문에 데이터가 날아갈 가능성이 있다.
이를 방지하기위해 초기에 db에서 데이터를 잘 가져왔는지 여부를 확인하기 위한 loadDone 변수를 추가하였다.
이렇게 되면 graph값이 바뀌었을 때 update 하여도 데이터가 모두 날아갈 가능성은 없다.
*/
  useEffect(() => {
    // 초기 데이터 로딩이 완료된 상태라면. null 방지
    if (isInit) firebase.database().ref().update(graph); // graph 데이터가 바뀔때마다 데이터베이스에 update해줌.
  }, [graph, isInit]);

  return (
    <>
      <Graph graph={graph} />
    </>
  );
}

export default GraphContainer;
