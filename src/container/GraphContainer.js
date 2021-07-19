import React, { useState ,useEffect} from "react";
import data from '../data/data.json'
import Graph from "../components/Graph";

function GraphContainer() {
  const [graph, setGraph] = useState(data);

  return <Graph graph={graph} />;
}

export default GraphContainer;
