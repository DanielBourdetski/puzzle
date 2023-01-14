import { Vec3, Vec4 } from "../math"

const opaqueVertexShaderSource = `
precision mediump float;

attribute vec3 vPosition;
attribute vec2 vUv;

varying vec2 fUv; 

void main() {
  fUv = vUv;
  gl_Position = vec4(vPosition, 1);
}
`

const opaqueFragmentShaderSource = `
precision mediump float;

varying vec2 fUv;

uniform vec4 uColor;
uniform sampler2D uTexture;

void main()
{
  gl_FragColor = vec4(1,0,1,1) ;//* texture(uTexture, uColor);
}
`

let gl: WebGL2RenderingContext;
let canvas: HTMLCanvasElement;
let opaqueShader: WebGLProgram;
let quadBuffer: WebGLBuffer;
let quadVao: WebGLVertexArrayObject;

function loadShader(source: string, shader: WebGLShader): WebGLShader {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (compiled === false) {
    throw gl.getShaderInfoLog(shader);
  }

  return shader;
}

function loadShaderProgram(vertexSource: string, fragmentSource: string): WebGLProgram {

  let vert = loadShader(vertexSource, gl.createShader(gl.VERTEX_SHADER));
  let frag = loadShader(fragmentSource, gl.createShader(gl.FRAGMENT_SHADER));

  let program = gl.createProgram();

  gl.attachShader(program, vert);
  gl.attachShader(program, frag);

  gl.linkProgram(program);

  return program;
}

export function loadService(c: HTMLCanvasElement): void {
  canvas = c;
  gl = c.getContext("webgl2");

  opaqueShader = loadShaderProgram(opaqueVertexShaderSource, opaqueFragmentShaderSource);

  quadVao = gl.createVertexArray();
  gl.bindVertexArray(quadVao);

  quadBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);

  const quadData: Float32Array = new Float32Array([
    .5, .5, 0, 0, 0,
    .5, -.5, 0, 0, 0,
    -.5, -.5, 0, 0, 0,

    .5, .5, 0, 0, 0,
    -.5, -.5, 0, 0, 0,
    -.5, .5, 0, 0, 0,
  ]);

  gl.bufferData(gl.ARRAY_BUFFER, quadData, gl.STATIC_DRAW);

  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 4 * 5, 0);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 4 * 5, 4 * 3);

  loop();
};

function loop(): void {

  draw();

  requestAnimationFrame(loop);
}

function draw(): void {

  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.clearColor(0.15, 0.15, 0.15, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(opaqueShader);

  gl.uniform4f(gl.getUniformLocation(opaqueShader, "uColor"), 1, 0, 1, 1);

  gl.bindVertexArray(quadVao);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);

  gl.drawArrays(gl.TRIANGLES, 0 , 6);
}

const service = { loadService };

export default service; 