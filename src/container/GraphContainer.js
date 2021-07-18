import React, { useState } from "react";
import Graph from "../components/Graph";

function GraphContainer() {
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
          source: "node_2_package",
          target: "node_1_python",
        },
      },
      {
        data: {
          id: "node_1_python->node_2_codeStructure",
          source: "node_2_codeStructure",
          target: "node_1_python",
        },
      },
      {
        data: {
          id: "node_1_python->node_2_install",
          source: "node_2_install",
          target: "node_1_python",
        },
      },
      {
        data: {
          id: "node_1_python->node_2_class",
          source: "node_2_class",
          target: "node_1_python",
        },
      },

      {
        data: {
          id: "node_1_python->node_2_varAndType",
          source: "node_2_varAndType",
          target: "node_1_python",
        },
      },
      {
        data: {
          id: "node_2_package->node_3_makeCustomModule",
          source: "node_3_makeCustomModule",
          target: "node_2_package",
        },
      },
      {
        data: {
          id: "node_2_package->node_3_3rdParty",
          source: "node_3_3rdParty",
          target: "node_2_package",
        },
      },
      {
        data: {
          id: "node_2_package->node_3_standardModule",
          source: "node_3_standardModule",
          target: "node_2_package",
        },
      },
      {
        data: {
          id: "node_2_varAndType->node_3_sequence",
          source: "node_3_sequence",
          target: "node_2_varAndType",
        },
      },
      {
        data: {
          id: "node_2_codeStructure->node_3_condition",
          source: "node_3_condition",
          target: "node_2_codeStructure",
        },
      },
      {
        data: {
          id: "node_2_codeStructure->node_3_repeatAndTouring",
          source: "node_3_repeatAndTouring",
          target: "node_2_codeStructure",
        },
      },
      {
        data: {
          id: "node_2_codeStructure->node_3_implication",
          source: "node_3_implication",
          target: "node_2_codeStructure",
        },
      },
      {
        data: {
          id: "node_2_codeStructure->node_3_function",
          source: "node_3_function",
          target: "node_2_codeStructure",
        },
      },
      {
        data: {
          id: "node_2_install->node_3_virtualEnv",
          source: "node_3_virtualEnv",
          target: "node_2_install",
        },
      },
      {
        data: {
          id: "node_2_install->node_3_anaconda",
          source: "node_3_anaconda",
          target: "node_2_install",
        },
      },
      {
        data: {
          id: "node_2_install->node_3_excute",
          source: "node_3_excute",
          target: "node_2_install",
        },
      },
      {
        data: {
          id: "node_3_anaconda-node_3_virtualEnv",
          source: "node_3_virtualEnv",
          target: "node_3_anaconda",
        },
      },

      {
        data: {
          id: "node_3_excute->node_4_philosophy",
          source: "node_4_philosophy",
          target: "node_3_excute",
        },
      },
      {
        data: {
          id: "node_3_function->node_4_decorator",
          source: "node_4_decorator",
          target: "node_3_function",
        },
      },
      {
        data: {
          id: "node_3_function->node_4_closer",
          source: "node_4_closer",
          target: "node_3_function",
        },
      },
      {
        data: {
          id: "node_3_function->node_4_generator",
          source: "node_4_generator",
          target: "node_3_function",
        },
      },
      {
        data: {
          id: "node_3_sequence->node_4_listAndTuple",
          source: "node_4_listAndTuple",
          target: "node_3_sequence",
        },
      },
      {
        data: {
          id: "node_3_sequence->node_4_dict",
          source: "node_4_dict",
          target: "node_3_sequence",
        },
      },
      {
        data: {
          id: "node_3_sequence->node_4_set",
          source: "node_4_set",
          target: "node_3_sequence",
        },
      },
      {
        data: {
          id: "node_4_generator->node_5_functionalProgramming",
          source: "node_5_functionalProgramming",
          target: "node_4_generator",
        },
      },
      {
        data: {
          id: "node_5_functionalProgramming->node_6_firstClassObject",
          source: "node_6_firstClassObject",
          target: "node_5_functionalProgramming",
        },
      },
    ],
  });

  return <Graph graph={graph} />;
}

export default GraphContainer;