import React, { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscape from "cytoscape";
import contextMenus from "cytoscape-context-menus";
import CoseBillkent from "cytoscape-cose-bilkent";
import styled from "styled-components";
import Modal from "./Modal";
import "cytoscape-context-menus/cytoscape-context-menus.css";

Cytoscape.use(CoseBillkent);
Cytoscape.use(contextMenus);

const CustomCytoscapeComponent = styled(CytoscapeComponent)`
  width: 100vw;
  height: 100vh;
`;
// 2. App.js 로 부터 넘어온 graph 데이터를 출력한다.
// 3. 우클릭 메뉴로 Modal.js 를 제어한다. 
function Graph({ graph, setGraph, isAdmin }) { // App.js 로 부터 넘어온 props 
  /* 아래의 모든 useState 변수는 Modal에 props로 전달해 주기 위해 사용함. */
  const [isOpen, setIsOpen] = useState(false);
  /* 
    isOpen 변수는 modal 창이 열려있는지 확인하기 위한 변수임. 
    우클릭 메뉴에서 특정 기능을 클릭하면 그 기능을 수행하는 모달창이 뜸. 
    이 창을 띄우기 위해서는 modal isOpen 변수를 Modal 컴포넌트에 props로 전달해주어야 함.
    modal 은 isOpen 상태를 보고 모달 렌더 여부를 결정함.
  */

  const [selectNodeId, setSelectNodeId] = useState(""); // 현재 선택한 노드의 id값을 저장하기 위한 변수
  const [modalType, setModalType] = useState("");
  /* 
    모달타입에 따라 다른 모달 내용을 띄우기 위해 사용하는 변수.
    우클릭 메뉴에 따라 다양한 모달 타입이 존재함. 
    eg. "리프노드추가" , "엣지추가" etc...
   */

  const [deleteNodeList, setDeleteNodeList] = useState([]); // "하위노드모두삭제" 기능을 수행하기 위한 데이터를 담는 리스트
  const [connectedNodes, setConnectedNodes] = useState([]); // "간선에노드추가" 기능을 수행하기 위한 데이터를 담는 리스트. 선택한 간선에 연결된 양 끝 노드의 id를 담음.
  const [currentNodeLabel, setCurrentNodeLabel] = useState(""); // "이름변경" 기능을 수행하기 위한 데이터를 담는 변수. 변경전 노드의 Label 을 저장함.
  const [deleteNodeCurrentObj, setDeleteNodeCurrentObj] = useState({}); // deleteNodeCurrnet 함수를 위한 객체
  const [selectEdgeId, setSelectEdgeId] = useState(""); // 현재 선택한 간선의 id값을 저장하기 위한 변수

  // 우클릭 메뉴를 구성하는 객체
  let options = {
    // 사용가능한 옵션: https://js.cytoscape.org/#events/user-input-device-events
    evtType: "cxttap", // 노드 또는 간선에 우클릭을 하였을 경우 메뉴가 활성화 됨.
    menuItems: [
      {
        id: "modify-node", // 메뉴 구분을 위한 id
        content: "이름 변경", // 메뉴 이름
        tooltipText: "현재 노드 이름 변경", // 메뉴에 마우스 hover 했을 때 띄울 tooltip
        selector: "node", // 노드에 우클릭을 하였을 경우 활성화 됨.
        coreAsWell: true,
        show: isAdmin, // 항목 표시 여부. 관리자의 경우만 해당 메뉴를 활성화 하도록 함.
        onClickFunction: function (e) {
          // 해당 메뉴를 클릭했을 때 수행할 기능
          // 선택한 노드의 라벨(이름) 을 변경함.
          setCurrentNodeLabel(e.target.data().label); // 현재 클릭한 노드의 label값을 currentNodeLabel에 저장함.
          setModalType("이름변경"); // 모달타입을 "이름변경"으로 세팅함.
          setIsOpen(true); // 모달을 open 한다.
        },
      },
      {
        id: "connect-between-node-and-node",
        content: "간선 추가",
        tooltipText: "간선 추가",
        selector: "node",
        coreAsWell: true,
        show: isAdmin,
        onClickFunction: function (e) {
          // 선택한 노드와 모달에서 선택한 타겟 노드를 연결하는 간선을 추가함
          setSelectNodeId(e.target.id()); // 현재 클릭한 노드의 id값을 selectNodeId에 저장함.
          setModalType("간선추가"); // 모달타입을 "간선추가"로 세팅함.
          setIsOpen(true);
        },
      },
      {
        id: "add-node",
        content: "노드 추가",
        tooltipText: "리프 노드 뒤에 노드 추가",
        selector: "node",
        coreAsWell: true,
        show: isAdmin,
        onClickFunction: function (e) {
          // 선택한 노드 뒤에 리프 노드를 추가함.
          setSelectNodeId(e.target.id()); // 현재 클릭한 노드의 id값을 selectNodeId에 저장함.
          setModalType("리프노드추가"); // 모달타입을 "리프노드추가"로 세팅함.
          setIsOpen(true);
        },
      },
      {
        id: "add-node-between-node-and-node",
        content: "간선에 노드 추가",
        tooltipText: "간선에 노드 추가",
        selector: "edge", // 간선에 우클릭 하였을 경우 활성화 됨.
        coreAsWell: true,
        show: isAdmin,
        onClickFunction: function (e) {
          // 간선에 노드를 추가함.
          /* 
            connectedNodes[0],[1]은 연결된 노드들의 id값이며,
            connectedNodes[2]는 삭제할 간선의 id값 임.
          */
          let newList = [];
          e.target.connectedNodes().each((e) => {
            newList.push(e.id());
          });
          newList.push(e.target.edges().id());
          setConnectedNodes(newList); // 간선과 연결된 양 끝 노드들의 id가 들어있는 배열
          setModalType("간선노드추가"); // 모달타입을 "간선노드추가"로 세팅함.
          setIsOpen(true);
        },
      },
      {
        id: "delete-edge",
        content: "간선 삭제",
        tooltipText: "해당 간선을 삭제",
        selector: "edge",
        coreAsWell: true,
        show: isAdmin,
        onClickFunction: function (e) {
          // 선택한 간선을 삭제함.
          setSelectEdgeId(e.target.edges().id()); // 현재 클릭한 간선의 id값을 selectEdgeId 에 저장함.
          setModalType("간선삭제"); // 모달타입을 "간선삭제"로 세팅함.
          setIsOpen(true);
        },
      },

      {
        id: "remove-node",
        content: "노드 삭제",
        tooltipText: "노드 삭제",
        selector: "node",
        onClickFunction: function (e) {},
        disabled: false, //항목을 사용 안 함으로 만들 것인지 여부
        show: isAdmin, // 항목 표시 여부
        hasTrailingDivider: false, // 항목에 후행 구분선이 있는지 여부
        coreAsWell: false,
        submenu: [
          // 하위메뉴
          {
            id: "remove-node-all",
            content: "하위노드 모두 삭제",
            tooltipText: "하위노드 모두 삭제",
            selector: "node",
            onClickFunction: function (e) {
              /*     
                deleteNodeList[0] 은 현재 클릭한 노드의 Id 가 담겨있음.
                그 뒤의 값은 삭제대상인 자식 노드 Id 들이 담겨있음.
                이를 이용 하여 자식노드 및 연관 엣지를 삭제할 때 사용한다.
              */
              // 하위 노드 모두 삭제 용
              let list = [];
              list.push(e.target.id()); // [0]은 current Node
              e.target
                .predecessors()
                .nodes()
                .each(function (e) {
                  list.push(e.id());
                }); // 자식 노드
              setDeleteNodeList(list);
              setModalType("하위노드모두삭제");
              setIsOpen(true);
            },
            disabled: false, //항목을 사용 안 함으로 만들 것인지 여부
            show: isAdmin, // 항목 표시 여부
            hasTrailingDivider: false, // 항목에 후행 구분선이 있는지 여부
            coreAsWell: false, // Whether core instance have this item on cxttap
          },
          {
            id: "remove-node-all",
            content: "현재 노드만 삭제",
            tooltipText: "현재 노드만 삭제",
            selector: "node",
            onClickFunction: function (e) {
              // child 구하는 방법을 잘 모르겠어서 야매 로직 작성
              // 바로 한단계 아래의 자식 노드 id 구하기
              let tempObj = {}; // 임시 객체
              let neighborhoodNodeList = []; // 바로 이웃한 노드 목록
              let neighborhoodEdgeList = []; // 바로 이웃한 엣지 목록
              let predecessorsNodeList = []; // 모든 자식 노드 목록
              let predecessorsEdgeList = []; // 모든 자식 엣지 목록
              let successorNodeList = []; // 모든 부모 노드 목록
              let successorEdgeList = []; // 모든 부모 엣지 목록
              e.target
                .neighborhood()
                .nodes()
                .each(function (e) {
                  neighborhoodNodeList.push(e.id());
                });
              e.target
                .predecessors()
                .nodes()
                .each(function (e) {
                  predecessorsNodeList.push(e.id());
                });
              e.target
                .neighborhood()
                .edges()
                .each(function (e) {
                  neighborhoodEdgeList.push(e.id());
                });
              e.target
                .predecessors()
                .edges()
                .each(function (e) {
                  predecessorsEdgeList.push(e.id());
                });
              e.target
                .successors()
                .nodes()
                .each(function (e) {
                  successorNodeList.push(e.id());
                });
              e.target
                .successors()
                .edges()
                .each(function (e) {
                  successorEdgeList.push(e.id());
                });
              let childNodes = predecessorsNodeList.filter((x) =>
                neighborhoodNodeList.includes(x)
              ); // 바로 이웃한 자식 노드
              let childEdges = predecessorsEdgeList.filter((x) =>
                neighborhoodEdgeList.includes(x)
              ); // 바로 이웃한 자식 엣지
              let parentEdges = successorEdgeList.filter((x) =>
                neighborhoodEdgeList.includes(x)
              ); // 바로 이웃한 부모 엣지
              let parentNodes = successorNodeList.filter((x) =>
                neighborhoodNodeList.includes(x)
              ); // 바로 이웃한 부모 노드

              tempObj["childNodes"] = childNodes;
              tempObj["childEdges"] = childEdges;
              tempObj["parentEdges"] = parentEdges;
              tempObj["parentNodes"] = parentNodes;
              tempObj["currentNodeId"] = e.target.id();
              setDeleteNodeCurrentObj(tempObj);
              setModalType("현재노드만삭제");
              setIsOpen(true);
            },
            disabled: false,
            show: true,
            hasTrailingDivider: false,
            coreAsWell: false,
          },
        ],
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
  };

  // graph의 layout 설정
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
  const edgeActiveWidth = "4px";
  const dimColor = "#dfe4ea";
  const edgeColor = "#ced6e0";
  const nodeColor = "#57606f";
  const nodeActiveColor = "#ffa502";
  const successorColor = "#ff6348"; // 상위 node & edge color
  const predecessorsColor = "#1e90ff"; // 하위 node & edge color

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
      let rank = pageRank.rank("#" + target.id());
      target.style("background-color", nodeColor);
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
        // style={{ width: "100vh", height: "100vh" }}
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
      <Modal
        graph={graph}
        currentNodeLabel={currentNodeLabel}
        connectedNodes={connectedNodes}
        setGraph={setGraph}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectNodeId={selectNodeId}
        modalType={modalType}
        deleteNodeList={deleteNodeList}
        deleteNodeCurrentObj={deleteNodeCurrentObj}
        selectEdgeId={selectEdgeId}
      />
    </>
  );
}

export default Graph;
