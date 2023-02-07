import io from "socket.io-client";
import localstorageService from "./localstorageService";
const socket = io("http://localhost:3001");

export const connectClient = (name: string) => {
  socket.emit("user:connect", name, (res: { status: string }) => {
    if (res.status === "failed")
      return console.log("Some went wrong. Please reload and try again!");

    localstorageService.saveUserData(name);
  });
};

export const hostRoom = (
  roomData: {
    name: string;
    imageData: any;
    type: string;
  },
  navigateToNewRoom: Function
) => {
  socket.emit(
    "room:host",
    roomData,
    (res: { status: "success" | "fail"; id: string }) => {
      if (res.status === "success") navigateToNewRoom(res.id);
    }
  );
};

export const joinRoom = (roomName: string) => {
  socket.emit("room:join", roomName, (res) => console.log(res.status));
};

export const leaveRoom = (roomName: string) =>
  socket.emit("room:leave", roomName);

export const movePiece = (pieceData: { any }) => {
  socket.emit("piece:move", pieceData);
};

socket.on("connect", () => {
  console.log("Connection to server established.");
});

socket.on("reconnect", () => {
  console.log("Reconnected to server.");

  const name = localstorageService.getUserData();
  if (!name) return;
  connectClient(name);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server.");
  console.log("Attemting to reconnect...");
});

export default {
  connectClient,
  hostRoom,
  joinRoom,
  leaveRoom,
  movePiece,
};
