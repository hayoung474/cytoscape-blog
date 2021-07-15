import React, { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import styled from "styled-components";

const CanvasContainer = styled.div`
  position: fixed;
  border: 1px solid black;
  left: 50%;
  transform: translateX(-50%);
`;

function App() {
  // id속성에는 공백이나 .이 들어가면
  const [elements, setElements] = useState({
    nodes: [
      {
        data: { id: "one", label: "Naver", url: "https://www.naver.com/" },
        position: { x: 100, y: 100 },
      },
      {
        data: {
          id: "two",
          label: "Daum",
          url: "https://www.daum.net/?nil_profile=daum&nil_src=search",
        },
        position: { x: 200, y: 200 },
      },
      {
        data: {
          id: "three",
          label: "Kumoh",
          url: "https://www.kumoh.ac.kr/ko/index.do",
        },
        position: { x: 300, y: 300 },
      },
      {
        data: {
          id: "four",
          label: "Programmers",
          url: "https://programmers.co.kr/",
        },
        position: { x: 400, y: 400 },
      },
    ],

    edges: [
      {
        data: {
          source: "one",
          target: "two",
          label: "Edge from Node1 to Node2",
        },
      },

      {
        data: {
          source: "three",
          target: "four",
          label: "Edge from Node3 to Node4",
        },
      },
    ],
  });

  const layout = {
    name: "breadthfirst",
    fit: true,
    directed: true,
    padding: 50,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
  };

  return (
    <CanvasContainer>
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(elements)}
        zoomingEnabled={true}
        maxZoom={2}
        minZoom={0.25}
        style={{ width: "100vh", height: "100vh" }}
        layout={layout}
      />
    </CanvasContainer>
  );
}

export default App;
