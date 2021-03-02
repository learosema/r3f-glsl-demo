import ReactDOM from 'react-dom';
import React from 'react';
import { Canvas } from 'react-three-fiber';

import { Box } from './components/box';
import { ShaderPlane } from './components/shader-plane';
import fragmentShader from './glsl/fragment-shader.glsl';
import vertexShader from './glsl/vertex-shader.glsl';

ReactDOM.render(
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 2]} />
    <Box position={[1.2, 0, 2]} />
    <ShaderPlane
      fragmentShader={fragmentShader}
      vertexShader={vertexShader}
      position={[0, 0, 0]}
    />
  </Canvas>,
  document.getElementById('root')
);
