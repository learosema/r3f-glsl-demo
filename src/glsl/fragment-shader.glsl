#pragma glslify: noise = require('glsl-noise/simplex/2d')

uniform float time;
uniform vec2 resolution;
varying vec2 vUv;
uniform vec3 top;
uniform vec3 middle;
uniform vec3 bottom;

void main() {
  vec2 p = (vec2(vUv.x, 1. - vUv.y) - .5) * 2.;

  vec3 bg1 = mix(top, middle, p.y + 1.);
  vec3 bg2 = mix(middle, bottom, p.y);
  vec3 bg = mix(bg1, bg2, step(vUv.y, .5)); 
  float sun = smoothstep(0., .5, .5 - length(p));

  gl_FragColor = vec4(bg + sun, 1.);
}