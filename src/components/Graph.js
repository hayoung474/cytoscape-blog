import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscape from "cytoscape";
import CoseBillkent from "cytoscape-cose-bilkent";
import styled from "styled-components";

Cytoscape.use(CoseBillkent);

const CustomCytoscapeComponent = styled(CytoscapeComponent)`
  margin: 0 auto;
`;

function Graph({ graph }) {
  const layout = {
    name: "cose",
  };

  const cyForRank = Cytoscape({
    elements: CytoscapeComponent.normalizeElements(graph),
  });

  const pageRank = cyForRank.elements().pageRank();

  const nodeMaxSize = 50;
  const nodeMinSize = 10;
  const nodeActiveSize = 28;
  const fontMaxSize = 8;
  const fontMinSize = 5;
  const fontActiveSize = 7;

  const edgeWidth = "2px";
  let edgeActiveWidth = "4px";

  const dimColor = "#dfe4ea";
  const edgeColor = "#ced6e0";
  const nodeColor = "#57606f";
  const nodeActiveColor = "#ffa502";

  const successorColor = "#ff6348";
  // 상위 node & edge color
  const predecessorsColor = "#1e90ff";
  // 하위 node & edge color

  function setDimStyle(target_cy, style) {
    target_cy.nodes().forEach(function (target) {
      target.style(style);
    });
    target_cy.edges().forEach(function (target) {
      target.style(style);
    });
  }

  function setFocus(
    target_element,
    successorColor,
    predecessorsColor,
    edgeWidth
  ) {
    target_element.style("background-color", nodeActiveColor);
    target_element.style("color", nodeColor);
    target_element.successors().each(function (e) {
      // 상위  엣지와 노드
      if (e.isEdge()) {
        e.style("width", edgeWidth);
      }
      e.style("color", nodeColor);
      e.style("background-color", successorColor);
      e.style("line-color", successorColor);
      e.style("source-arrow-color", successorColor);
      setOpacityElement(e, 0.5);
    });
    target_element.predecessors().each(function (e) {
      // 하위 엣지와 노드
      if (e.isEdge()) {
        e.style("width", edgeWidth);
      }
      e.style("color", nodeColor);
      e.style("background-color", predecessorsColor);
      e.style("line-color", predecessorsColor);
      e.style("source-arrow-color", predecessorsColor);
      setOpacityElement(e, 0.5);
    });
    target_element.neighborhood().each(function (e) {
      // 이웃한 엣지와 노드
      setOpacityElement(e, 1);
    });
    target_element.style(
      "width",
      Math.max(parseFloat(target_element.style("width")), nodeActiveSize)
    );
    target_element.style(
      "height",
      Math.max(parseFloat(target_element.style("height")), nodeActiveSize)
    );
    target_element.style(
      "font-size",
      Math.max(parseFloat(target_element.style("font-size")), fontActiveSize)
    );
  }

  function setOpacityElement(target_element, degree) {
    target_element.style("opacity", degree);
  }

  function setResetFocus(target_cy) {
    target_cy.nodes().forEach(function (target) {
      target.style("background-color", nodeColor);
      var rank = pageRank.rank(target);
      target.style("width", nodeMaxSize * rank + nodeMinSize);
      target.style("height", nodeMaxSize * rank + nodeMinSize);
      target.style("font-size", fontMaxSize * rank + fontMinSize);
      target.style("color", nodeColor);
      target.style("opacity", 1);
    });
    target_cy.edges().forEach(function (target) {
      target.style("line-color", edgeColor);
      target.style("source-arrow-color", edgeColor);
      target.style("width", edgeWidth);
      target.style("opacity", 1);
    });
  }

  return (
    <CustomCytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(graph)}
      stylesheet={[
        {
          selector: "node",
          style: {
            // 노드색
            backgroundColor: nodeColor,
            label: "data(label)",
            width: (el) => {
              return nodeMaxSize * pageRank.rank("#" + el.id()) + nodeMinSize;
            },
            height: (el) => {
              return nodeMaxSize * pageRank.rank("#" + el.id()) + nodeMinSize;
            },
            fontSize: (el) => {
              return fontMaxSize * pageRank.rank("#" + el.id()) + fontMinSize;
            },
            // 글자색
            color: nodeColor,
          },
        },
        {
          selector: "edge",
          style: {
            width: edgeWidth,
            lineColor: edgeColor,
            sourceArrowColor: edgeColor,
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
        });

        cy.on("tapstart mouseover", "node", (e) => {
          document.querySelector("body").style.cursor = "pointer";
          document.querySelector("html").style.cursor = "pointer";

          setDimStyle(cy, {
            backgroundColor: dimColor,
            lineColor: dimColor,
            sourceArrowColor: dimColor,
            color: dimColor,
          });
          setFocus(
            e.target,
            successorColor,
            predecessorsColor,
            edgeActiveWidth
          );
        });

        cy.on("tapend mouseout", "node", (e) => {
          document.querySelector("body").style.cursor = "default";
          document.querySelector("html").style.cursor = "default";

          setResetFocus(e.cy);
        });

        let resizeTimer;

        window.addEventListener("resize", function () {
          this.clearTimeout(resizeTimer);
          resizeTimer = this.setTimeout(function () {
            cy.fit();
          }, 200);
        });
      }}
    />
  );
}

export default Graph;
