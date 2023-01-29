import { Route, Routes, redirect, Navigate } from "react-router-dom";
import "./App.css";
import GameCanvas from "./components/GameCanvas";
import Main from "./components/Main";
import Room from "./components/Room";
import UI from "./components/UI/UI";

const App = () => {
  return (
    <div className="w-full h-full">
      <GameCanvas />
      {/* all content is in <Main />, canvas element cannot be updated as it will disturb the game rendering */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Routes>
          <Route path="/menu/*" element={<Main />} />
          <Route path="/room/:roomName" element={<Room />} />
          <Route path="*" element={<Navigate to="/menu" replace />} />
        </Routes>
        <UI /> {/* THIS NEEDS TO BE REMOVED AT BUILD */}
      </div>
    </div>
  );
};

export default App;
