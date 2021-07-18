import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscape from "cytoscape";
import CoseBillkent from "cytoscape-cose-bilkent";
import styled from "styled-components";

const CanvasContainer = styled.div`
  position: fixed;
  border: 1px solid black;
  left: 50%;
  transform: translateX(-50%);
`;

Cytoscape.use(CoseBillkent);

function Graph({ graph }) {
  const layout = {
    name: "cose",
  };

  const cyForRank = Cytoscape({
    elements: CytoscapeComponent.normalizeElements(graph),
  });

  const pageRank = cyForRank.elements().pageRank();

  const nodeMaxSize = 50;
  const nodeMinSize = 5;
  const fontMaxSize = 8;
  const fontMinSize = 5;

  return (
    <CanvasContainer>
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(graph)}
        stylesheet={[
          {
            selector: "node",
            style: {
              backgroundColor: "#666",
              label: "data(label)",
              width: (el) => {
                return nodeMaxSize * pageRank.rank("#" + el.id()) + nodeMinSize;
              },
              height: (el) => {
                return nodeMaxSize * pageRank.rank("#" + el.id()) + nodeMinSize;
              },
              "font-size": (el) => {
                return fontMaxSize * pageRank.rank("#" + el.id()) + fontMinSize;
              },
            },
          },
          {
            selector: "edge",
            style: {
              width: 1,
              "line-color": "#ccc",
            },
          },
        ]}
        style={{ width: "100vh", height: "100vh" }}
        layout={layout}
        cy={(cy) => {
          cy.on("tap", (e) => {
            // const url = e.target.data("url");
            // if (url && url !== "") {
            //   window.open(url);
            // }
            console.log(e.target);
          });
        }}
      />
    </CanvasContainer>
  );
}

export default Graph;
