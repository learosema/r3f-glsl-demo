
#pragma glslify: noise = require('glsl-noise/simplex/2d')

uniform float time;
uniform vec2 resolution;
varying vec2 vUv;
uniform vec3 topBG;
uniform vec3 middleBG;
uniform vec3 bottomBG;
uniform vec3 sunFG;
#define PI 3.141592654

float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

float opRound(vec2 p, float shape, float r ) {
  return shape - r;
}

float sdTriangle( in vec2 p, in vec2 p0, in vec2 p1, in vec2 p2 )
{
  vec2 e0 = p1-p0, e1 = p2-p1, e2 = p0-p2;
  vec2 v0 = p -p0, v1 = p -p1, v2 = p -p2;
  vec2 pq0 = v0 - e0*clamp( dot(v0,e0)/dot(e0,e0), 0.0, 1.0 );
  vec2 pq1 = v1 - e1*clamp( dot(v1,e1)/dot(e1,e1), 0.0, 1.0 );
  vec2 pq2 = v2 - e2*clamp( dot(v2,e2)/dot(e2,e2), 0.0, 1.0 );
  float s = sign( e0.x*e2.y - e0.y*e2.x );
  vec2 d = min(min(vec2(dot(pq0,pq0), s*(v0.x*e0.y-v0.y*e0.x)),
                    vec2(dot(pq1,pq1), s*(v1.x*e1.y-v1.y*e1.x))),
                    vec2(dot(pq2,pq2), s*(v2.x*e2.y-v2.y*e2.x)));
  return -sqrt(d.x)*sign(d.y);
}


vec3 gradient(vec2 p, vec3 c1, vec3 c2, vec3 c3) {
  vec3 bg1 = mix(c1, c2, p.y + 1.);
  vec3 bg2 = mix(c2, c3, p.y);
  return mix(bg1, bg2, step(0., p.y));
}

vec3 scene(vec2 p) {
  // Background
  vec3 color = gradient(p, bottomBG, middleBG, topBG);
  
  // Sun
  float sunIntensity = 1. - smoothstep(0., .2, sdCircle(p, .2));
  color = mix(color, sunFG, sunIntensity);
  
  // Water
  vec2 pW = vec2(clamp(p.x, -.8, .8), p.y);
  float water = step(p.y, -.3);
  float n = noise(pW);
  vec3 waterColor = mix(
    mix(bottomBG, vec3(.0,.2,.4), .5 + n * .01), 
    mix(middleBG, bottomBG, .5 + .5 * sin(time * .1 + pW.y * pW.y * 17.)), (.9 + .1 * sin(-time * .1 + length(pW) + n * .2 + pW.y * 30.)) * 
    max(0., cos(2. * abs(pW.x) * max(0., .2 * PI - pW.y * 2. + sin(pW.y * 100.) * .2)))
  ); 
  color = mix(color, waterColor, water);
  

  // Beach
  float beachLine = -.6 - (1. + p.x) * .1 + .02 * (sin(-p.x * 6.) + sin(p.x * 5.));
  float beach = smoothstep(beachLine + .02, beachLine, p.y);
  vec3 beachColor = vec3(0);
  color = mix(color, beachColor, beach);

  // Palm
  vec2 pP = vec2(p.x + 1., p.y);
  float a = atan(pP.y, pP.x);
  float palmDF = sdCircle(pP, .1) + sin(a * 6.) * .1 + sin(pP.x * 50.) * .01;
  float stumpDF = sdTriangle();
  palmDF = min(palmDF, stumpDF);
  float palm = smoothstep(0., 0.01, palmDF);
  vec3 palmColor = vec3(0);
  // color = mix(palmColor, color, palm);

  return color;
}

void main() {
  // Normalize coordinate system to -1..1 with (0,0) as center
  // vec2 p = (vec2(vUv.x, vUv.y) - .5) * 2.;
  vec2 p = ((gl_FragCoord.xy / resolution) - .5) * 2.;
  p.x *= resolution.x / resolution.y;
  
  vec3 color = scene(p);
  gl_FragColor = vec4(color, 1.);
}