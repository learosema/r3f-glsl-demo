import React, { useMemo, useRef } from 'react';
import { MeshProps, useFrame, useThree } from 'react-three-fiber';
import { DoubleSide, Vector2 } from 'three';
import type { Mesh } from 'three';

interface ShaderPlaneProps extends MeshProps {
  vertexShader?: string;
  fragmentShader?: string;
}

export const ShaderPlane: React.FC<ShaderPlaneProps> = (props) => {
  const mesh = useRef<Mesh>();
  const { clock, viewport } = useThree();
  const { vertexShader, fragmentShader } = props;
  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      resolution: { value: new Vector2() },
    }),
    []
  );

  // Update uniform variables every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      uniforms.time.value = clock.getElapsedTime();
      uniforms.resolution.value.set(viewport.width, viewport.height);
    }
  });

  return (
    <mesh {...props} ref={mesh}>
      <planeBufferGeometry args={[5, 5]}></planeBufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        side={DoubleSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      ></shaderMaterial>
    </mesh>
  );
};
