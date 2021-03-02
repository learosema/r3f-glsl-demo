uniform float time;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(sin(vUv.x + time), 0., 1., 1.);
}