import React, { useEffect, useRef } from 'react'
import service from '../services/canvasService';

const GameCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    service.loadService(ref.current);
  }, []);

  return <canvas ref={ref} style={{width:"100%", height:"100%"}} ></canvas>;
};

export default GameCanvas;