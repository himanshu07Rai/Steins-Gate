import { io, Socket } from "socket.io-client";
import Env from "./env";
let socket: Socket;
export const getSocket = () => {
  if (!socket) {
    socket = io(Env.SOCKET_URL, { autoConnect: false });
  }
  return socket;
};
