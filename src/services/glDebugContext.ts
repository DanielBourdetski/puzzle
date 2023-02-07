

export interface WebGL2RenderingDebugContext {
    clear : (mask : number) => void;
    clearColor : (r : number, g : number, b : number, a : number) => void;
    useProgram : (program : WebGLProgram ) => void;
    activeTexture : (target: GLenum) => void;
    bindTexture : (target: GLenum, texture: WebGLTexture | null) => void;
    uniform1i : (location: WebGLUniformLocation | null, x: GLint) => void;
    bindVertexArray : (array: WebGLVertexArrayObject | null) => void;
    bindBuffer : (target: GLenum, buffer: WebGLBuffer | null) => void;
    drawArrays : (mode: GLenum, first: GLint, count: GLsizei) => void;
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void;
    bufferData(target: GLenum, data: BufferSource | null, usage: GLenum) : void;
}

function checkForError(functionName : string, gl : WebGL2RenderingContext) : void {
    
    let error = gl.getError();
    
    while(error != gl.NO_ERROR) 
    {
        console.error(`${functionName}: ${error}`);
        error = gl.getError();
    }
}

export function createDebugContext(gl : WebGL2RenderingContext) : WebGL2RenderingDebugContext
{

    return {
        clear : (mask : number) => { gl.clear(mask); checkForError("clear", gl); },
        clearColor : (r : number, g : number, b : number, a : number) => { gl.clearColor(r,g,b,a); checkForError("clearColor", gl); },
        useProgram : (program : WebGLProgram ) =>                           { gl.useProgram(program); checkForError("useProgram", gl); }  ,    
        activeTexture : (target: GLenum) =>   { gl.activeTexture(target); checkForError("activeTexture", gl); },
        bindTexture : (target: GLenum, texture: WebGLTexture | null) =>     { gl.bindTexture(target, texture); checkForError("bindTexture", gl); },
        uniform1i : (location: WebGLUniformLocation | null, x: GLint) =>    { gl.uniform1i(location, x); checkForError("uniform1i", gl); },
        bindVertexArray : (array: WebGLVertexArrayObject | null) =>     { gl.bindVertexArray(array); checkForError("bindVertexArray", gl); },
        bindBuffer : (target: GLenum, buffer: WebGLBuffer | null) =>    { gl.bindBuffer(target, buffer); checkForError("bindBuffer", gl); },
        drawArrays : (mode: GLenum, first: GLint, count: GLsizei) =>    { gl.drawArrays(mode, first, count); checkForError("drawArrays", gl); },
        texImage2D : (target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource) => {
            gl.texImage2D(target, level, internalformat, width, height, border, format, type, source);
            checkForError("texImage2D", gl);
        },
        bufferData : (target: GLenum, data: BufferSource | null, usage: GLenum) => {
            gl.bufferData(target, data, usage);
            checkForError("bufferData", gl);
        }
    }
}