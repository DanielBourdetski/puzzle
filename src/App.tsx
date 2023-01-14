import React, { useEffect } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import { useDispatch } from 'react-redux'
import { socketActions } from './store/store';
import { io } from 'socket.io-client';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(socketActions.setSocket(io('http://localhost:3001')))
  }, [])

  return (
    <div>
      <GameCanvas />
    </div>
  );
}

export default App;
