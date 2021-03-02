import ReactDOM from "react-dom";
import React from "react";
import { Canvas } from "react-three-fiber";

import { Box } from "./components/box";

ReactDOM.render(
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>,
  document.getElementById("root")
);
