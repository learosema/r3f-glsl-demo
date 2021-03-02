#pragma glslify: noise = require('glsl-noise/simplex/2d')

uniform float time;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vec3(sin(time), 0, 1.) * noise(vUv.xy + vec2(time * .1, 0)), 1.);
}