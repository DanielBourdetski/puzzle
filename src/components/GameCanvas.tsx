import React, { useEffect, useRef } from 'react'

const GameCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const gl: WebGL2RenderingContext = ref.current.getContext('webgl2');

    gl.clearColor(1.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
  }, []);

  return <canvas ref={ref}></canvas>;
};

export default GameCanvas;