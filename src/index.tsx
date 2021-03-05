import ReactDOM from 'react-dom';
import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { ShaderPlane } from './components/shader-plane';

function App() {
  return (
    <Canvas>
      <OrbitControls />
      <ShaderPlane position={[0, 0, 0]} />
    </Canvas>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
