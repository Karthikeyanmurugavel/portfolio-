'use client';

import { useEffect, useRef } from 'react';

/**
 * The light field behind the whole page, drawn in one fragment shader.
 *
 *  - a ribbon of glowing strands that pinch to a hot point beside the hero copy
 *    and fan out to the right, scrolling away with the hero
 *  - a slow green aurora that sits behind every later section
 *  - a horizontal wave field that rises behind any element marked [data-waves]
 *
 * No three.js: one quad, one program, ~60 strands. It renders at a capped pixel
 * ratio, pauses when the tab is hidden, and draws a single still frame under
 * prefers-reduced-motion.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_heroY;   // hero scroll offset in viewport heights
uniform float u_wave;    // 0..1 visibility of the wave field
uniform float u_waveY;   // wave field centre, 0 bottom .. 1 top
uniform float u_mobile;

const int STRANDS = 34;
const int WAVES = 22;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

vec3 LIME = vec3(0.776, 0.949, 0.306);
vec3 LEAF = vec3(0.420, 0.620, 0.180);
vec3 CYAN = vec3(0.360, 0.780, 0.900);

void main() {
  vec2 frag = gl_FragCoord.xy;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(frag.x / u_res.y, frag.y / u_res.y); // x: 0..aspect, y: 0..1
  float t = u_time;

  vec3 col = vec3(0.0);

  /* ---------------- aurora: low, slow, always present ---------------- */
  vec2 q = p * vec2(0.9, 1.3) + vec2(t * 0.012, -t * 0.008);
  float n = fbm(q * 1.6 + fbm(q * 1.1 + t * 0.02));
  float band = smoothstep(0.35, 0.85, n) * (0.55 + 0.45 * sin(p.x * 1.7 + t * 0.05));
  col += mix(LEAF, CYAN, smoothstep(0.55, 0.9, fbm(q * 2.2))) * band * 0.11;

  /* ---------------- hero ribbon ---------------- */
  // The pinch sits beside the hero copy; on phones it moves under the copy.
  vec2 F = mix(vec2(0.45 * aspect, 0.34), vec2(0.62 * aspect, 0.16), u_mobile);
  F.y += u_heroY;                       // scrolls away with the hero
  float ribbonVis = 1.0 - smoothstep(0.6, 1.5, u_heroY);

  if (ribbonVis > 0.001) {
    float lines = 0.0, glowAcc = 0.0;
    vec3 tint = vec3(0.0);
    for (int i = 0; i < STRANDS; i++) {
      float s = float(i) / float(STRANDS - 1);
      float h = hash(vec2(s, 4.1));
      float c = mix(1.2, 5.2, s * s) * (0.85 + 0.3 * h);     // curvature
      float dy = p.y - (F.y + (h - 0.5) * 0.035);
      float wob = 0.018 * sin(dy * 7.0 + t * 0.35 + h * 6.28)
                + 0.010 * sin(dy * 15.0 - t * 0.5 + s * 9.0);
      float xc = F.x + (s - 0.5) * 0.03 + c * dy * dy + wob * smoothstep(0.0, 0.25, abs(dy));
      float slope = 2.0 * c * dy;
      float d = abs(p.x - xc) / sqrt(1.0 + slope * slope);
      // fade strands that have run back off to the left
      float alive = smoothstep(-0.05, 0.12, p.x - F.x + 0.12);
      float core = smoothstep(0.0022, 0.0, d) * (0.35 + 0.65 * h);
      float glow = exp(-d * 70.0) * 0.07;
      float w = (core + glow) * alive;
      vec3 sc = h > 0.78 ? CYAN : mix(LIME, LEAF, h * 0.6);
      tint += sc * w;
      lines += w;
    }
    float hot = exp(-length((p - F) * vec2(1.6, 1.0)) * 12.0);
    col += tint * (0.9 + 2.8 * hot) * ribbonVis;
    col += LIME * hot * 0.55 * ribbonVis;                // bright pinch
    col += LIME * exp(-length(p - F) * 3.4) * 0.08 * ribbonVis; // halo
  }

  /* ---------------- horizontal waves ---------------- */
  if (u_wave > 0.001) {
    vec3 wt = vec3(0.0);
    for (int i = 0; i < WAVES; i++) {
      float s = float(i) / float(WAVES - 1);
      float h = hash(vec2(s, 9.7));
      float y = u_waveY + (s - 0.5) * 0.16
              + 0.05 * sin(p.x * 2.4 + t * 0.25 + s * 3.0)
              + 0.02 * sin(p.x * 6.0 - t * 0.4 + h * 6.0);
      float d = abs(p.y - y);
      float core = smoothstep(0.0018, 0.0, d) * (0.3 + 0.7 * h);
      float glow = exp(-d * 90.0) * 0.05;
      vec3 sc = h > 0.8 ? CYAN : LIME;
      wt += sc * (core + glow);
    }
    float edge = smoothstep(0.0, 0.35, p.x / aspect) * smoothstep(1.0, 0.65, p.x / aspect) * 0.6 + 0.4;
    col += wt * u_wave * edge;
  }

  /* ---------------- dust ---------------- */
  vec2 cell = floor(frag / 46.0);
  float r = hash(cell);
  vec2 star = (cell + vec2(hash(cell + 1.3), hash(cell + 7.1))) * 46.0;
  float sd = length(frag - star);
  float tw = 0.5 + 0.5 * sin(t * (0.6 + r) + r * 40.0);
  col += LIME * smoothstep(1.6, 0.0, sd) * step(0.82, r) * tw * 0.35;

  // vignette keeps text contrast at the edges
  vec2 uv = frag / u_res;
  col *= 0.75 + 0.25 * smoothstep(1.1, 0.2, length(uv - vec2(0.5, 0.55)));

  // tone map so overlapping strands bloom instead of clipping
  col = 1.0 - exp(-col * 1.35);
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn('[ribbon] shader:', gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

export default function Ribbon() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!gl) {
      document.documentElement.classList.add('no-webgl');
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      document.documentElement.classList.add('no-webgl');
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, 'u_res'),
      time: gl.getUniformLocation(prog, 'u_time'),
      heroY: gl.getUniformLocation(prog, 'u_heroY'),
      wave: gl.getUniformLocation(prog, 'u_wave'),
      waveY: gl.getUniformLocation(prog, 'u_waveY'),
      mobile: gl.getUniformLocation(prog, 'u_mobile'),
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = (navigator.hardwareConcurrency || 8) <= 4;

    let w = 0;
    let h = 0;
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, lowPower ? 0.9 : 1.25);
      w = Math.floor(window.innerWidth * scale);
      h = Math.floor(window.innerHeight * scale);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    let wave = 0;
    let raf = 0;
    const start = performance.now();

    const frame = () => {
      const vh = window.innerHeight;
      const heroY = window.scrollY / vh;

      // wave field follows the first [data-waves] element that is on screen
      let targetWave = 0;
      let waveY = 0.5;
      const el = document.querySelector<HTMLElement>('[data-waves]');
      if (el) {
        const r = el.getBoundingClientRect();
        const centre = r.top + r.height * 0.5;
        if (r.bottom > 0 && r.top < vh) targetWave = 1;
        waveY = 1 - centre / vh;
      }
      wave += (targetWave - wave) * 0.06;

      gl.uniform2f(u.res, w, h);
      gl.uniform1f(u.time, reduce ? 12 : (performance.now() - start) / 1000);
      gl.uniform1f(u.heroY, heroY);
      gl.uniform1f(u.wave, wave);
      gl.uniform1f(u.waveY, waveY);
      gl.uniform1f(u.mobile, window.innerWidth < 760 ? 1 : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(frame);
    };

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(frame);
    canvas.classList.add('is-on');

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="ribbon" aria-hidden="true" />;
}
