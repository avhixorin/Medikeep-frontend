import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';


let socket: Socket | null = null;

const initializeSocket = (): Socket => {

    const socketURL = import.meta.env.VITE_SOCKET_URL;

    if (!socket) {
      socket = io(socketURL, { autoConnect: false });
    }
    return socket;
};

const useSockets = () => {
    
   const socket = initializeSocket();

   useEffect(() => {
    if (socket && !socket.connected) {
        socket.connect();
    }

    return () => {
        if (socket && socket.connected) {
            socket.disconnect();
        }
    };
   },[socket]);
}

export default useSockets;