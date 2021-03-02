import ReactDOM from 'react-dom';
import React from 'react';
import { Canvas } from 'react-three-fiber';

import { ShaderPlane } from './components/shader-plane';
import fragmentShader from './glsl/fragment-shader.glsl';
import vertexShader from './glsl/vertex-shader.glsl';

ReactDOM.render(
  <Canvas>
    <ShaderPlane
      fragmentShader={fragmentShader}
      vertexShader={vertexShader}
      position={[0, 0, 0]}
    />
  </Canvas>,
  document.getElementById('root')
);
