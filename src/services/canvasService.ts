import { Vec2, Vec3, Vec4 } from "../math"
import { createDebugContext, WebGL2RenderingDebugContext } from "./glDebugContext"

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

uniform sampler2D uTexture;

void main()
{
  gl_FragColor = vec4(1,0,1,1);
}
`

const puzzleVertexShaderSource = `
precision mediump float;

attribute vec3 vPosition;
attribute vec2 vWorldPos;
attribute vec2 vUv;

varying vec2 fUv; 

void main() {
  fUv = vUv;
  gl_Position = vec4(vPosition + vec3(vWorldPos, 0), 1);
}
`

const puzzleFragmentShaderSource = `
precision mediump float;

varying vec2 fUv;

uniform sampler2D uTexture;

void main()
{
  gl_FragColor = texture2D(uTexture, fUv);
}
`

interface PieceData {
  bufferOffset : number;
  vertexCount : number;
}

let gl: WebGL2RenderingContext;
let dgl: WebGL2RenderingDebugContext;
let canvas: HTMLCanvasElement;

let puzzleVao: WebGLVertexArrayObject;
let puzzleShader: WebGLProgram;
let puzzleVertexBuffer : WebGLBuffer;
let puzzleTexture : WebGLTexture;
let puzzleSize : Vec2;
let puzzlePieces : PieceData[];
let puzzleTotalVertexCount : number;

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
  dgl = createDebugContext(gl);

  puzzleShader = loadShaderProgram(puzzleVertexShaderSource, puzzleFragmentShaderSource);

  loop();
};

function loop(): void {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight + 1;

  draw();

  requestAnimationFrame(loop);
}

function draw(): void {

  gl.viewport(0, 0, canvas.width, canvas.height);

  dgl.clearColor(0.15, 0.15, 0.15, 1);
  dgl.clear(gl.COLOR_BUFFER_BIT);

  // draw puzzle
  if(!puzzleVertexBuffer) return;

  dgl.useProgram(puzzleShader);

  dgl.activeTexture(gl.TEXTURE0);
  dgl.bindTexture(gl.TEXTURE_2D, puzzleTexture);
  dgl.uniform1i(gl.getUniformLocation(puzzleShader, "uTexture"), 0);

  dgl.bindVertexArray(puzzleVao);
  dgl.bindBuffer(gl.ARRAY_BUFFER, puzzleVertexBuffer);
  setVertexAttribsForPuzzleBuffer();

  dgl.drawArrays(gl.TRIANGLES, 0 , puzzleTotalVertexCount);
}

export interface PuzzleData {

  seed : number;

  size : Vec2;

  image : { 
    size: Vec2
    data : TexImageSource;
  };

  piecePositions : Vec2[];

}

function pushVector3(array : number[], x : number, y : number, z : number) {
  array.push(x);
  array.push(y);
  array.push(z);
}

function pushVector2(array : number[], x : number, y : number) {
  array.push(x);
  array.push(y);
}

function pushVector2Ex(array : number[], vec : Vec2) {
  array.push(vec.x);
  array.push(vec.y);
}

function setVertexAttribsForPuzzleBuffer() {

  let stride : number = (3 + 2 + 2) * 4;
  
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0);
  
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride, 2 * 4);

  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2, 2, gl.FLOAT, false, stride, (2 + 2) * 4);
}

export function loadPuzzle(data : PuzzleData) {

  puzzleSize = data.size;

  //load image
  if(!puzzleTexture)
  {
    puzzleTexture = gl.createTexture();
    console.log("new texture");
  }


  dgl.bindTexture(gl.TEXTURE_2D, puzzleTexture);
  dgl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, data.image.size.x, data.image.size.y, 0, gl.RGBA, gl.UNSIGNED_BYTE, data.image.data);

  //load pieces

  let vertices : number[] = [];
  puzzlePieces = [];

  let bufferOffset = 0;

  let uvSizeX = 1.0 / data.size.x;
  let uvSizeY = 1.0 / data.size.y;

  puzzleTotalVertexCount = 0;

  for (let x = 0; x < data.size.x; x++) {
    for (let y = 0; y < data.size.y; y++) {
       
      let newPiece : PieceData = {
        bufferOffset : bufferOffset,
        vertexCount : 0
      };

      let worldPos : Vec2 = data.piecePositions[x + (y * data.size.x)]; 

      let u0 : number = x * uvSizeX;
      let u1 : number = (x + 1) * uvSizeX;

      let v0 : number = y * uvSizeY;
      let v1 : number = (y + 1) * uvSizeY;

      // top left
      pushVector3(vertices, -0.5, 0.5, 0);
      pushVector2Ex(vertices, worldPos);
      pushVector2(vertices, u0, v1);
      
      // top right
      pushVector3(vertices, 0.5, 0.5, 0);
      pushVector2Ex(vertices, worldPos);
      pushVector2(vertices, u1, v1);
      
      // bottom right
      pushVector3(vertices, 0.5, -0.5, 0);
      pushVector2Ex(vertices, worldPos);
      pushVector2(vertices, u1, v0);
      
      // top left
      pushVector3(vertices, -0.5, 0.5, 0);
      pushVector2Ex(vertices, worldPos);
      pushVector2(vertices, u0, v1);
      
      // bottom right
      pushVector3(vertices, 0.5, -0.5, 0);
      pushVector2Ex(vertices, worldPos);
      pushVector2(vertices, u1, v0);
      
      // bottom left
      pushVector3(vertices, -0.5, -0.5, 0);
      pushVector2Ex(vertices, worldPos);
      pushVector2(vertices, u0, v0);

      bufferOffset += (3 + 2) * 6;

      let vertexCount = 6;

      newPiece.vertexCount = vertexCount;
      puzzleTotalVertexCount += vertexCount;

      

      puzzlePieces.push(newPiece);
    }
  }

  console.log(vertices);

  puzzleVertexBuffer = gl.createBuffer();
  dgl.bindBuffer(gl.ARRAY_BUFFER, puzzleVertexBuffer);
  dgl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

}

const service = { loadService, loadPuzzle };

export default service; 