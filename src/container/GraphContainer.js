import React, { useState ,useEffect} from "react";

import Graph from "../components/Graph";
import firebase from 'firebase';
function GraphContainer({graph}) {
  return <Graph graph={graph} />;
}

export default GraphContainer;
