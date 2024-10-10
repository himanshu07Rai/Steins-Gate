import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import Redis from 'ioredis';
import { produceMessage } from "./kafka";
import { instrument } from "@socket.io/admin-ui"
import prisma from '../config/db.config';

export type MessageType = {
  id: string;
  message: string;
  club_id: string;
  username: string;
  created_at: string;
};

const pub = new Redis({
  host: 'localhost',
  port: 6380,
  username: "",
  password: "",
});
const sub = new Redis({
  host: 'localhost',
  port: 6380,
  username: "",
  password: "",
});

interface CustomSocket extends Socket {
    room?: string;
}
class SocketServer {
    io: SocketIOServer;
  
    constructor(httpServer: http.Server) {
      console.log('Socket server constructor')
      this.io = new SocketIOServer(httpServer,{
        cors: {
          origin: ['http://localhost:3000', 'https://admin.socket.io'],
          credentials: true,
          allowedHeaders: '*',
        }
      });
      sub.subscribe("MESSAGES");
      instrument(this.io, {
        auth: false,
        mode:"development"
       });
    }

    public initListeners() {
      const io = this.io;
      io.use((socket:CustomSocket, next) => {
        const room = socket.handshake.auth.room;
        if (room) {
          socket.room = room;
          return next();
        }
        return next(new Error("invalid room "));
      });
      io.on('connection', (socket: CustomSocket) => {
        if(socket.room) socket.join(socket.room);
        console.log('A user connected ', socket.id, " room: ", socket.room);
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
        socket.on('message', async (payload:MessageType) => {
          console.log('payload ' + JSON.stringify(payload));
          const {message} = payload
          await produceMessage(payload);
            pub.publish("MESSAGES", JSON.stringify({ room: socket.room, message }));
        });
      })

      sub.on("message", async (_channel, message) => {
        const { room, message: msg } = JSON.parse(message);
        console.log('message received from redis: ' + msg + ' room: ' + room);
        io.to(room).emit('message', { message: msg });
    });
  }

    public getIo() {
        return this.io;
    }
  }

export default SocketServer;