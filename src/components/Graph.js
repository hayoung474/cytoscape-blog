import React, { useEffect, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscape from "cytoscape";
import contextMenus from "cytoscape-context-menus";
import CoseBillkent from "cytoscape-cose-bilkent";
import styled from "styled-components";
import Modal from './Modal'
Cytoscape.use(CoseBillkent);
// register extension
Cytoscape.use(contextMenus);

// import CSS as well
import "cytoscape-context-menus/cytoscape-context-menus.css";

const CustomCytoscapeComponent = styled(CytoscapeComponent)`
  margin: 0 auto;
`;

function Graph({ graph,setGraph }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectNodeId,setSelectNodeId] = useState("")
  const [modalType,setModalType] = useState("")
  const [deleteNodeList,setDeleteNodeList] = useState([])
  const [connectedNodes,setConnectedNodes] = useState([])

  var options = {
    // Customize event to bring up the context menu
    // Possible options https://js.cytoscape.org/#events/user-input-device-events
    evtType: "cxttap", // 우클릭
    // List of initial menu items
    // A menu item must have either onClickFunction or submenu or both
    menuItems: [

      {
        id: "modify-node",
        content: "노드 수정",
        tooltipText: "현재 노드 이름 수정",
        image: { src: "add.svg", width: 12, height: 12, x: 6, y: 4 },
        selector: "node",
        coreAsWell: true,
        onClickFunction: function () {
          setModalType("노드수정")
        },
      },
      {
        id: "connect-between-node-and-node",
        content: "엣지 추가",
        tooltipText: "기존 노드와 연결",
        image: { src: "add.svg", width: 12, height: 12, x: 6, y: 4 },
        selector: "node",
        coreAsWell: true,
        onClickFunction: function (e) {
          setModalType("엣지추가");
          console.log()
        },
        hasTrailingDivider: true,
      },
      {
        id: "add-node",
        content: "노드 추가",
        tooltipText: "리프 노드 뒤에 노드 추가",
        image: { src: "add.svg", width: 12, height: 12, x: 6, y: 4 },
        selector: "node",
        coreAsWell: true,
        onClickFunction: function (e) {
          setModalType("리프노드추가")
          setIsOpen(true);
          setSelectNodeId(e.target.id());

        },
      },
      {
        id: "add-node-between-node-and-node",
        content: "간선에 노드 추가",
        tooltipText: "간선에 노드 추가",
        image: { src: "add.svg", width: 12, height: 12, x: 6, y: 4 },
        selector: "edge",
        coreAsWell: true,
        onClickFunction: function (e) {
          let newList=[];
          console.log(e.target.connectedNodes().each((e)=>{
            newList.push(e.id());
          }))
          setConnectedNodes(newList); // 엣지와 연결된 노드들의 id가 들어있는 배열 
          setModalType("간선노드추가");
          setIsOpen(true);
        },
      },

      {
        id: "remove-node", // ID of menu item
        content: "노드 삭제", // Display content of menu item
        tooltipText: "현재 노드 삭제", // Tooltip text for menu item
        image: {
          src: "../assets/image/remove.svg",
          width: 12,
          height: 12,
          x: 6,
          y: 4,
        }, // menu icon
        // Filters the elements to have this menu item on cxttap
        // If the selector is not truthy no elements will have this menu item on cxttap
        selector: "node",
        onClickFunction: function (e) {
          setModalType("노드삭제")
          
          let list = []
          e.target.predecessors().nodes().each(function(e){
            list.push(e.id())
          }) // 자식 노드
          list.push(e.target.id())
          setDeleteNodeList(list);
          setIsOpen(true);

        },
        disabled: false, //항목을 사용 안 함으로 만들 것인지 여부
        show: true, // 항목 표시 여부
        hasTrailingDivider: false, // 항목에 후행 구분선이 있는지 여부
        coreAsWell: false, // Whether core instance have this item on cxttap
        submenu: [
          /* 이 곳에는 객체를 넣어주어야 함.*/
        ], // Shows the listed menuItems as a submenu for this item. An item must have either submenu or onClickFunction or both.
      },
    ],
    // css classes that menu items will have
    menuItemClasses: [
      // add class names to this list
    ],
    // css classes that context menu will have
    contextMenuClasses: [
      // add class names to this list
    ],
    // Indicates that the menu item has a submenu. If not provided default one will be used
    submenuIndicator: {
      src: "assets/submenu-indicator-default.svg",
      width: 12,
      height: 12,
    },
  };

  const layout = {
    name: "cose",
    ready: function () {},
    stop: function () {},
    animate: true,
    animationEasing: undefined,
    animationDuration: 1000,
    avoidOverlap: true,
    animateFilter: function (node, i) {
      return true;
    },
    animationThreshold: 250,
    refresh: 20,
    fit: true,
    padding: 30,
    boundingBox: undefined,
    nodeDimensionsIncludeLabels: false,
    randomize: false,
    componentSpacing: 40,
    nodeRepulsion: function (node) {
      return 2048;
    },
    nodeOverlap: 4,
    edgeElasticity: function (edge) {
      return 32;
    },
    nestingFactor: 1.2,
    gravity: 1,
    numIter: 1000,
    initialTemp: 1000,
    coolingFactor: 0.99,
    minTemp: 1.0,
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
      //let rank =pageRank.rank(target.id());
      //var rank = pageRank.rank(target); // index 오류의 원인
      //console.log(rank);
      var rank = pageRank.rank("#" + target.id());
      target.style("width", nodeMaxSize * rank + nodeMinSize);
      target.style("height", nodeMaxSize * rank + nodeMinSize);
      target.style("font-size", fontMaxSize * rank + fontMinSize);
      target.style("color", nodeColor);
      target.style("opacity", 1);
      target.style("opacity", 1);
      target.style("color", nodeColor);
    });
    target_cy.edges().forEach(function (target) {
      target.style("line-color", edgeColor);
      target.style("source-arrow-color", edgeColor);
      target.style("width", edgeWidth);
      target.style("opacity", 1);
    });
  }

  return (
    <>
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
        // cy.on("tap", (e) => {
        //   console.log(graph)
        //   // const url = e.target.data("url");
        //   // if (url && url !== "") {
        //   //   window.open(url);
        //   // }
        // });
        cy.contextMenus(options); // menu 등록

        cy.on("add", "node", (e) => {
          // 노드가 추가될 때 마다 새로운 값이 세팅될 수 있도록 이전 graph값을 제거해주는 초기화 작업이 필요함.
          graph = {}; // 노드 추가 마다 초기화
        });
        cy.on("tapstart mouseover", "node", (e) => {
          // 얘는 멀쩡한데 tapend 랑 mouseout은 왜 그런지 ,,
          // 이 이벤트 함수도 똑같이 2번 발동됨.

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
          e.preventDefault();
          // 이벤트 함수가 2번 발동되는 이유를 모르겠음.
          // 또한 2번 실행되는 동안 graph 데이터가 초기값으로 돌아가는 경우 발생
          document.querySelector("body").style.cursor = "default";
          document.querySelector("html").style.cursor = "default";
          if (Object.keys(graph).length !== 0) {
            // 빈 객체는 아직 그래프 출력 준비가 덜 된 것으로 간주하고 함수를 실행시키지않음. 반면 빈 객체가 아니라면 출력 준비가 다 된 것으로 간주하고 함수를 실행시킴
            setResetFocus(e.cy);
          }
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
    <Modal graph={graph} connectedNodes={connectedNodes} setGraph={setGraph} isOpen={isOpen} setIsOpen={setIsOpen} selectNodeId={selectNodeId} modalType={modalType} deleteNodeList={deleteNodeList}/>
    </>
    
  );
}

export default Graph;
