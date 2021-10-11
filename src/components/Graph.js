import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import contextMenus from 'cytoscape-context-menus';
import CoseBillkent from 'cytoscape-cose-bilkent';
import styled from 'styled-components';
import 'cytoscape-context-menus/cytoscape-context-menus.css';

Cytoscape.use(CoseBillkent);
Cytoscape.use(contextMenus);

// 2. App.js 로 부터 넘어온 graph 데이터를 출력한다.
// 3. 우클릭 메뉴로 Modal.js 를 제어한다.
function Graph({ graph, options }) {
  const [recommendCourse, setRecommendCourse] = useState({
    node: ['node_1_python', 'node_2_package', 'node_3_3rdParty'],
    edge: ['node_1_python->node_2_package', 'node_2_package->node_3_3rdParty'],
  });
  const [recommendMode, setTecommendMode] = useState(true);

  // graph의 layout 설정
  const layout = {
    name: 'cose',
    animate: false,
    avoidOverlap: true,
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

  // 그래프의 깊이를 기반으로 탐색하기 위한 그래프 자체 객체
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
  const edgeWidth = '2px';
  const edgeActiveWidth = '4px';
  const dimColor = '#dfe4ea';
  const edgeColor = '#ced6e0';
  const nodeColor = '#57606f';
  const nodeActiveColor = '#ffa502';
  const successorColor = '#ff6348'; // 상위 node & edge color
  const predecessorsColor = '#1e90ff'; // 하위 node & edge color
  const recommendColor = '#c1e1c5';

  // 배경 흐리게
  function setDimStyle(target_cy, style) {
    target_cy.nodes().forEach(function (target) {
      target.style(style);
    });
    target_cy.edges().forEach(function (target) {
      target.style(style);
    });
  }

  // hover
  function setFocus(target_element, successorColor, predecessorsColor, edgeWidth) {
    target_element.style('background-color', nodeActiveColor);
    target_element.style('color', nodeColor);
    target_element.successors().each(function (e) {
      // 상위  엣지와 노드
      if (e.isEdge()) {
        e.style('width', edgeWidth);
      }
      e.style('color', nodeColor);
      e.style('background-color', successorColor);
      e.style('line-color', successorColor);
      e.style('source-arrow-color', successorColor);
      setOpacityElement(e, 0.5);
    });
    target_element.predecessors().each(function (e) {
      // 하위 엣지와 노드
      if (e.isEdge()) {
        e.style('width', edgeWidth);
      }
      e.style('color', nodeColor);
      e.style('background-color', predecessorsColor);
      e.style('line-color', predecessorsColor);
      e.style('source-arrow-color', predecessorsColor);
      setOpacityElement(e, 0.5);
    });
    target_element.neighborhood().each(function (e) {
      // 이웃한 엣지와 노드
      setOpacityElement(e, 1);
    });
    target_element.style('width', Math.max(parseFloat(target_element.style('width')), nodeActiveSize));
    target_element.style('height', Math.max(parseFloat(target_element.style('height')), nodeActiveSize));
    target_element.style('font-size', Math.max(parseFloat(target_element.style('font-size')), fontActiveSize));
  }

  // 노드 갈수록 흐리게
  function setOpacityElement(target_element, degree) {
    target_element.style('opacity', degree);
  }

  // 마우스 뗐을때
  function setResetFocus(target_cy) {
    target_cy.nodes().forEach(function (target) {
      let rank = pageRank.rank('#' + target.id());
      target.style('background-color', nodeColor);
      target.style('width', nodeMaxSize * rank + nodeMinSize);
      target.style('height', nodeMaxSize * rank + nodeMinSize);
      target.style('font-size', fontMaxSize * rank + fontMinSize);
      target.style('color', nodeColor);
      target.style('opacity', 1);
      target.style('opacity', 1);
      target.style('color', nodeColor);
    });
    target_cy.edges().forEach(function (target) {
      target.style('line-color', edgeColor);
      target.style('source-arrow-color', edgeColor);
      target.style('width', edgeWidth);
      target.style('opacity', 1);
    });
  }

  return (
    <CustomCytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(graph)}
      // 그래프 스타일링
      stylesheet={[
        {
          selector: 'node',
          style: {
            // 노드색
            backgroundColor: nodeColor,
            label: 'data(label)',
            width: el => {
              return nodeMaxSize * pageRank.rank('#' + el.id()) + nodeMinSize;
            },
            height: el => {
              return nodeMaxSize * pageRank.rank('#' + el.id()) + nodeMinSize;
            },
            fontSize: el => {
              return fontMaxSize * pageRank.rank('#' + el.id()) + fontMinSize;
            },
            // 글자색
            color: nodeColor,
          },
        },
        {
          selector: 'edge',
          style: {
            width: edgeWidth,
            lineColor: edgeColor,
            sourceArrowColor: edgeColor,
          },
        },
        {
          selector: '.recommend-mode-node',
          style: {
            backgroundColor: recommendColor,
            width: el => {
              return nodeMaxSize * pageRank.rank('#' + el.id()) * 2 + nodeMinSize;
            },
            height: el => {
              return nodeMaxSize * pageRank.rank('#' + el.id()) * 2 + nodeMinSize;
            },
            fontSize: fontActiveSize,
          },
        },
        {
          selector: '.recommend-mode-edge',
          style: {
            lineColor: recommendColor,
            width: '5px',
            sourceArrowColor: recommendColor,
          },
        },
      ]}
      // 레이아웃
      layout={layout}
      // 이벤트 바인딩
      cy={cy => {
        /* 추천코스 스타일시트 설정을 위한 클래스 추가 */
        if (recommendMode === true) {
          recommendCourse.node.forEach(item => {
            cy.elements('node[id = "' + item + '"]').addClass('recommend-mode-node');
          });
          recommendCourse.edge.forEach(item => {
            cy.elements('edge[id = "' + item + '"]').addClass('recommend-mode-edge');
          });
        } else if (recommendMode === false) {
          // 기존 추천리스트의 클래스를 제거한 후
          cy.edges().classes('');
          cy.nodes().classes('');

          // 추천리스트 초기화
          setRecommendCourse({ node: [], edge: [] });
        }

        // 우클릭 메뉴 등록
        cy.contextMenus(options);

        // 노드가 추가될 때 마다 호출되는 트리거
        cy.on('add', 'node', e => {
          // 그래프에 새로운 값이 세팅될 수 있도록 이전 graph값을 제거해주는 초기화 작업이 필요함.
          graph = {};
        });

        // 노드에 마우스 hover시 호출
        cy.on('tapstart mouseover', 'node', e => {
          // 얘는 멀쩡한데 tapend 랑 mouseout은 왜 그런지 ,,
          // 이 이벤트 함수도 똑같이 2번 발동됨.

          document.querySelector('body').style.cursor = 'pointer';
          document.querySelector('html').style.cursor = 'pointer';

          // 색처리
          setDimStyle(cy, {
            backgroundColor: dimColor,
            lineColor: dimColor,
            sourceArrowColor: dimColor,
            color: dimColor,
          });
          setFocus(e.target, successorColor, predecessorsColor, edgeActiveWidth);
        });

        // 노드에 마우스 out시
        cy.on('tapend mouseout', 'node', e => {
          e.preventDefault();
          // 이벤트 함수가 2번 발동되는 이유를 모르겠음.
          // 또한 2번 실행되는 동안 graph 데이터가 초기값으로 돌아가는 경우 발생
          document.querySelector('body').style.cursor = 'default';
          document.querySelector('html').style.cursor = 'default';
          if (Object.keys(graph).length !== 0) {
            // 빈 객체는 아직 그래프 출력 준비가 덜 된 것으로 간주하고 함수를 실행시키지않음. 반면 빈 객체가 아니라면 출력 준비가 다 된 것으로 간주하고 함수를 실행시킴
            setResetFocus(e.cy);
          }
        });

        // 윈도우 리사이즈 시 반응형 이벤트 추가
        let resizeTimer;
        window.addEventListener('resize', function () {
          this.clearTimeout(resizeTimer);
          resizeTimer = this.setTimeout(function () {
            cy.fit();
          }, 200);
        });
      }}
    />
  );
}

// // React.memo 사용. 이 함수에서 받아오는 props를 감지하기 위해 React.memo를 사용함.
// export default React.memo(Graph, (prev, next) => {
//   /*
//     야매코드긴 한데,
//     만약에 변하기전 상태의 props(prev)의 options 값의 menuItems의 첫번째 값의 show 상태가 true 일 경우.
//     즉, 이미 관리자 모드로 진입하여 메뉴를 사용할 수 있는 상태가 되었을 경우
//     그래프 리렌더링을 하지 않는다.
//   */
//   if (prev.options.menuItems[0].show === true) {
//     return next.options && prev.graph === next.graph;
//   } else {
//     // 그게 아니라면 아직 관리자 상태가 아니므로 바뀐 options값을 적용해주기 위해 리렌더링을 1번 해준다.
//     // 이 조건분기 없이 return prev.grpah === next.graph 하게 되면, 관리자모드로 진입하여도 그래프가 리렌더링 되지 않아 메뉴를 사용할 수 없게된다.
//     return false; // 그렇기에 리렌더링을 1번 해준다. 이 과정을 지나고 나면 다시 이 분기로 돌아오지 않는다. (새로고침 시 돌아옴 )
//   }
// });
export default Graph;
const CustomCytoscapeComponent = styled(CytoscapeComponent)`
  width: 100vw;
  height: calc(100vh - 75px);
`;
