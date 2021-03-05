#pragma glslify: noise = require('glsl-noise/simplex/2d')

uniform float time;
uniform vec2 resolution;
varying vec2 vUv;
uniform vec3 top;
uniform vec3 middle;
uniform vec3 bottom;

void main() {
  vec2 p = vec2(vUv.x, 1. - vUv.y);
  vec3 bg1 = mix(top, middle, p.y * 2.);
  vec3 bg2 = mix(middle, bottom, p.y * 2. - 1.);
  vec3 bg = mix(bg1, bg2, step(vUv.y, .5)); 
  gl_FragColor = vec4(bg, 1.);
}