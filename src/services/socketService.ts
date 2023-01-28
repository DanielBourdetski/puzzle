import { UserData } from '../../commonTypes';

import io from 'socket.io-client';
import localstorageService from './localstorageService';
const socket = io('http://localhost:3001');

export const connectClient = (name: string) => {
	socket.emit('user:create', name, () => {
		localstorageService.saveUserData(name);
	});
};

export const hostRoom = (roomName: string) =>
	socket.emit('room:host', roomName);

export const joinRoom = (roomName: string) =>
	socket.emit('room:join', roomName);

export const leaveRoom = (roomName: string) =>
	socket.emit('room:leave', roomName);

export const movePiece = pieceData => {
	socket.emit('piece:move', pieceData);
};

export default {
	connectClient,
	hostRoom,
	joinRoom,
	leaveRoom,
	movePiece,
};
