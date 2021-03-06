import React, { useEffect, useMemo, useRef } from 'react';
import { MeshProps, useFrame, useThree } from 'react-three-fiber';
import { Color, DoubleSide, Vector2 } from 'three';
import type { Mesh } from 'three';

import fragmentShader from '../glsl/fragment-shader.glsl';
import vertexShader from '../glsl/vertex-shader.glsl';
import * as dat from 'dat.gui';

export function ShaderPlane(props: MeshProps) {
  const mesh = useRef<Mesh>();
  const { clock, size } = useThree();
  const params = useMemo(
    () => ({
      topBG: '#cacaff',
      middleBG: '#ffff99',
      bottomBG: '#ff7878',
      sunFG: '#ffffff',
      water: '#2244ff',
    }),
    []
  );

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      resolution: { value: new Vector2(1, 1) },
      topBG: { value: new Color(params.topBG) },
      middleBG: { value: new Color(params.middleBG) },
      bottomBG: { value: new Color(params.bottomBG) },
      sunFG: { value: new Color(params.sunFG) },
    }),
    [params]
  );

  useEffect(() => {
    let gui: dat.GUI;
    if (uniforms) {
      gui = new dat.GUI();
      gui
        .addColor(params, 'topBG')
        .onChange(() => uniforms.topBG.value.set(params.topBG));
      gui
        .addColor(params, 'middleBG')
        .onChange(() => uniforms.middleBG.value.set(params.middleBG));
      gui
        .addColor(params, 'bottomBG')
        .onChange(() => uniforms.bottomBG.value.set(params.bottomBG));
      gui
        .addColor(params, 'sunFG')
        .onChange(() => uniforms.sunFG.value.set(params.sunFG));
    }
    return () => {
      gui?.destroy();
    };
  }, [uniforms, params]);

  useEffect(() => {
    console.log(size);
  }, [size]);

  // Update uniform variables every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      uniforms.time.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    uniforms.resolution.value.set(size.width, size.height);
  }, [size]);

  return (
    <mesh {...props} ref={mesh}>
      <planeBufferGeometry args={[2, 2]}></planeBufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        side={DoubleSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      ></shaderMaterial>
    </mesh>
  );
}
