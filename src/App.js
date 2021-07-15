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
      { data: { id: "1", label: "IP 1", type: "ip" } },
      { data: { id: "2", label: "Device 1", type: "device" } },
      { data: { id: "3", label: "IP 2", type: "ip" } },
      { data: { id: "4", label: "Device 2", type: "device" } },
      { data: { id: "5", label: "Device 3", type: "device" } },
      { data: { id: "6", label: "IP 3", type: "ip" } },
      { data: { id: "7", label: "Device 5", type: "device" } },
      { data: { id: "8", label: "Device 6", type: "device" } },
      { data: { id: "9", label: "Device 7", type: "device" } },
      { data: { id: "10", label: "Device 8", type: "device" } },
      { data: { id: "11", label: "Device 9", type: "device" } },
      { data: { id: "12", label: "IP 3", type: "ip" } },
      { data: { id: "13", label: "Device 10", type: "device" } },
    ],
    edges: [
      {
        data: { source: "1", target: "2", label: "Node2" },
      },
      {
        data: { source: "3", target: "4", label: "Node4" },
      },
      {
        data: { source: "3", target: "5", label: "Node5" },
      },
      {
        data: { source: "6", target: "5", label: " 6 -> 5" },
      },
      {
        data: { source: "6", target: "7", label: " 6 -> 7" },
      },
      {
        data: { source: "6", target: "8", label: " 6 -> 8" },
      },
      {
        data: { source: "6", target: "9", label: " 6 -> 9" },
      },
      {
        data: { source: "3", target: "13", label: " 3 -> 13" },
      },
    ],
  });

  const layout = {
    name: "concentric",

    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    startAngle: (3 / 2) * Math.PI, // where nodes start in radians
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
    minNodeSpacing: 50, // min spacing between outside of nodes (used for radius adjustment)
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
  };

  return (
    <CanvasContainer>
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(elements)}
        zoomingEnabled={true}
        stylesheet={[
          {
            selector: "node",
            style: {
              backgroundColor: "#4a56a6",
              width: 30,
              height: 30,
              label: "data(label)",
            },
          },
          {
            selector: "node:selected",
            style: {
              "border-width": "6px",
              "border-color": "#AAD8FF",
              "border-opacity": "0.5",
              "background-color": "#77828C",
              width: 50,
              height: 50,
              "text-outline-color": "#77828C",
              "text-outline-width": 8,
            },
          },
          {
            selector: "node[type='device']",
            style: {
              shape: "rectangle",
            },
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#AAD8FF",
              "target-arrow-color": "#6774cb",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
        ]}
        style={{ width: "100vh", height: "100vh" }}
        layout={layout}
      />
    </CanvasContainer>
  );
}

export default App;
