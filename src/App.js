import React, { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import styled from "styled-components";

const CanvasContainer = styled.div`
  position: fixed;
  border: 1px solid black;
  width: 600px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  const [elements, setElements] = useState([
    { data: { id: "one", label: "Node 1" }, position: { x: 100, y: 100 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 200, y: 200 } },
    {
      data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
    },
    { data: { id: "three", label: "Node 3" }, position: { x: 300, y: 300 } },
    { data: { id: "four", label: "Node 4" }, position: { x: 400, y: 400 } },
    {
      data: {
        source: "three",
        target: "four",
        label: "Edge from Node3 to Node4",
      },
    },
  ]);

  return (
    <>
      <CanvasContainer>
        <CytoscapeComponent
          elements={elements}
          style={{ width: "100%", height: "600px" }}
        />
      </CanvasContainer>
    </>
  );
}

export default App;
