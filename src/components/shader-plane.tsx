import React, { useEffect, useMemo, useRef } from 'react';
import { MeshProps, useFrame, useThree } from 'react-three-fiber';
import { Color, DoubleSide, Vector2 } from 'three';
import type { Mesh } from 'three';

import fragmentShader from '../glsl/fragment-shader.glsl';
import vertexShader from '../glsl/vertex-shader.glsl';
import * as dat from 'dat.gui';

export function ShaderPlane(props: MeshProps) {
  const mesh = useRef<Mesh>();
  const { clock, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      resolution: { value: new Vector2() },
      top: { value: new Color('#cacaff') },
      middle: { value: new Color('#ffff99') },
      bottom: { value: new Color('#ff7878') },
    }),
    []
  );

  useEffect(() => {
    let gui: dat.GUI;
    if (uniforms) {
      gui = new dat.GUI();
      const params = {
        top: '#cacaff',
        middle: '#ffff99',
        bottom: '#ff7878',
      };
      gui
        .addColor(params, 'top')
        .onChange(() => uniforms.top.value.set(params.top));
      gui
        .addColor(params, 'middle')
        .onChange(() => uniforms.middle.value.set(params.middle));
      gui
        .addColor(params, 'bottom')
        .onChange(() => uniforms.bottom.value.set(params.bottom));
    }
    return () => {
      gui?.destroy();
    };
  }, [uniforms]);

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
}
