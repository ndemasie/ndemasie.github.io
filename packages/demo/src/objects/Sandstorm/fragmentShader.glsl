uniform float u_time;
uniform float u_opacity;
varying vec3 vPosition;

// Perlin Noise Functions
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float noise(vec3 p) {
  vec3 i0 = floor(p);
  vec3 i1 = i0 + vec3(1.0);
  vec3 f0 = fract(p);
  vec3 f1 = f0 - vec3(1.0);
  vec3 f = f0 * f0 * (3.0 - 2.0 * f0);

  vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x);
  vec4 iy = vec4(i0.y, i0.y, i1.y, i1.y);
  vec4 iz0 = vec4(i0.z);
  vec4 iz1 = vec4(i1.z);

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;

  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  vec4 n000 = vec4(dot(g000, vec3(f0.x, f0.y, f0.z)),
                   dot(g100, vec3(f1.x, f0.y, f0.z)),
                   dot(g010, vec3(f0.x, f1.y, f0.z)),
                   dot(g110, vec3(f1.x, f1.y, f0.z)));
  vec4 n001 = vec4(dot(g001, vec3(f0.x, f0.y, f1.z)),
                   dot(g101, vec3(f1.x, f0.y, f1.z)),
                   dot(g011, vec3(f0.x, f1.y, f1.z)),
                   dot(g111, vec3(f1.x, f1.y, f1.z)));

  float fade_z = f.z * f.z * (3.0 - 2.0 * f.z);
  vec4 n_z = mix(n000, n001, fade_z);
  vec2 fade_xy = f.xy * f.xy * (3.0 - 2.0 * f.xy);
  vec2 n_xy = mix(n_z.xy, n_z.zw, fade_xy.y);
  float n = mix(n_xy.x, n_xy.y, fade_xy.x);
  return 2.2 * n;
}

void main() {
  vec3 position = vPosition * 0.6; // Scale the noise space
  float baseNoise = noise(position + vec3(u_time * 0.6)); // Dynamic base layer
  float turbulence = abs(noise(position * 2.0 + vec3(u_time * 0.2))) * 0.05; // Add turbulence
  float intensity = baseNoise + turbulence; // Combine layers
  intensity = smoothstep(0.1, 0.8, intensity); // Add soft edges
  float alpha = intensity * u_opacity; // Control transparency
  gl_FragColor = vec4(vec3(1.0), alpha); // White clouds
}
