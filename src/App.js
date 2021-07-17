import React, { useState } from "react";
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

function App() {
  // id속성에는 공백이나 .이 들어가면 X
  const [graph, setGraph] = useState({
    nodes: [
      {
        data: {
          id: "node_1_python",
          label: "파이썬",
        },
      },
      {
        data: {
          id: "node_2_package",
          label: "패키지",
        },
      },
      {
        data: {
          id: "node_2_codeStructure",
          label: "코드구조",
        },
      },
      {
        data: {
          id: "node_2_install",
          label: "설치",
        },
      },
      {
        data: {
          id: "node_2_class",
          label: "클래스",
        },
      },
      {
        data: {
          id: "node_2_varAndType",
          label: "변수와 타입",
        },
      },

      {
        data: {
          id: "node_3_makeCustomModule",
          label: "커스텀 모듈 만들기",
        },
      },
      {
        data: {
          id: "node_3_3rdParty",
          label: "3rd 파티",
        },
      },
      {
        data: {
          id: "node_3_standardModule",
          label: "표준 모듈",
        },
      },
      {
        data: {
          id: "node_3_sequence",
          label: "시퀸스",
        },
      },
      {
        data: {
          id: "node_3_condition",
          label: "조건",
        },
      },
      {
        data: {
          id: "node_3_repeatAndTouring",
          label: "반복과 순회",
        },
      },
      {
        data: {
          id: "node_3_implication",
          label: "함축",
        },
      },
      {
        data: {
          id: "node_3_function",
          label: "함수",
        },
      },
      {
        data: {
          id: "node_3_virtualEnv",
          label: "가상환경",
        },
      },
      {
        data: {
          id: "node_3_anaconda",
          label: "아나콘다",
        },
      },
      {
        data: {
          id: "node_3_excute",
          label: "실행",
        },
      },
      {
        data: {
          id: "node_4_philosophy",
          label: "철학",
        },
      },
      {
        data: {
          id: "node_4_decorator",
          label: "데커레이터",
        },
      },
      {
        data: {
          id: "node_4_closer",
          label: "클로져",
        },
      },
      {
        data: {
          id: "node_4_generator",
          label: "제너레이터",
        },
      },
      {
        data: {
          id: "node_4_listAndTuple",
          label: "리스트와 튜플",
        },
      },
      {
        data: {
          id: "node_4_dict",
          label: "딕셔너리",
        },
      },
      {
        data: {
          id: "node_4_set",
          label: "셋",
        },
      },
      {
        data: {
          id: "node_5_functionalProgramming",
          label: "함수형 프로그래밍",
        },
      },
      {
        data: {
          id: "node_6_firstClassObject",
          label: "일급객체",
        },
      },
    ],
    edges: [
      {
        data: {
          id: "node_1_python->node_2_package",
          source: "node_1_python",
          target: "node_2_package",
        },
      },
      {
        data: {
          id: "node_1_python->node_2_codeStructure",
          source: "node_1_python",
          target: "node_2_codeStructure",
        },
      },
      {
        data: {
          id: "node_1_python->node_2_install",
          source: "node_1_python",
          target: "node_2_install",
        },
      },
      {
        data: {
          id: "node_1_python->node_2_class",
          source: "node_1_python",
          target: "node_2_class",
        },
      },

      {
        data: {
          id: "node_1_python->node_2_varAndType",
          source: "node_1_python",
          target: "node_2_varAndType",
        },
      },
      {
        data: {
          id: "node_2_package->node_3_makeCustomModule",
          source: "node_2_package",
          target: "node_3_makeCustomModule",
        },
      },
      {
        data: {
          id: "node_2_package->node_3_3rdParty",
          source: "node_2_package",
          target: "node_3_3rdParty",
        },
      },
      {
        data: {
          id: "node_2_package->node_3_standardModule",
          source: "node_2_package",
          target: "node_3_standardModule",
        },
      },
      {
        data: {
          id: "node_2_varAndType->node_3_sequence",
          source: "node_2_varAndType",
          target: "node_3_sequence",
        },
      },
      {
        data: {
          id: "node_2_codeStructure->node_3_condition",
          source: "node_2_codeStructure",
          target: "node_3_condition",
        },
      },
      {
        data: {
          id: "node_2_codeStructure->node_3_repeatAndTouring",
          source: "node_2_codeStructure",
          target: "node_3_repeatAndTouring",
        },
      },
      {
        data: {
          id: "node_2_codeStructure->node_3_implication",
          source: "node_2_codeStructure",
          target: "node_3_implication",
        },
      },
      {
        data: {
          id: "node_2_codeStructure->node_3_function",
          source: "node_2_codeStructure",
          target: "node_3_function",
        },
      },
      {
        data: {
          id: "node_2_install->node_3_virtualEnv",
          source: "node_2_install",
          target: "node_3_virtualEnv",
        },
      },
      {
        data: {
          id: "node_2_install->node_3_anaconda",
          source: "node_2_install",
          target: "node_3_anaconda",
        },
      },
      {
        data: {
          id: "node_2_install->node_3_excute",
          source: "node_2_install",
          target: "node_3_excute",
        },
      },
      {
        data: {
          id: "node_3_excute->node_4_philosophy",
          source: "node_3_excute",
          target: "node_4_philosophy",
        },
      },
      {
        data: {
          id: "node_3_function->node_4_decorator",
          source: "node_3_function",
          target: "node_4_decorator",
        },
      },
      {
        data: {
          id: "node_3_function->node_4_closer",
          source: "node_3_function",
          target: "node_4_closer",
        },
      },
      {
        data: {
          id: "node_3_function->node_4_generator",
          source: "node_3_function",
          target: "node_4_generator",
        },
      },
      {
        data: {
          id: "node_3_sequence->node_4_listAndTuple",
          source: "node_3_sequence",
          target: "node_4_listAndTuple",
        },
      },
      {
        data: {
          id: "node_3_sequence->node_4_dict",
          source: "node_3_sequence",
          target: "node_4_dict",
        },
      },
      {
        data: {
          id: "node_3_sequence->node_4_set",
          source: "node_3_sequence",
          target: "node_4_set",
        },
      },
      {
        data: {
          id: "node_4_generator->node_5_functionalProgramming",
          source: "node_4_generator",
          target: "node_5_functionalProgramming",
        },
      },
      {
        data: {
          id: "node_5_functionalProgramming->node_6_firstClassObject",
          source: "node_5_functionalProgramming",
          target: "node_6_firstClassObject",
        },
      },
    ],
  });

  const layout = {
    name: "cose",
  };

  const cyForRank = Cytoscape({
    elements: CytoscapeComponent.normalizeElements(graph),
  });

  const pageRank = cyForRank.elements().pageRank();

  const nodeMaxSize = 50;
  const nodeMinSize = 10;
  const fontMaxSize = 8;
  const fontMinSize = 5;

  // console.log(pageRank.rank("#node_1_python"));
  // console.log(pageRank.rank("#node_2_package"));

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
              width: 3,
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

export default App;
