import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import Redis from 'ioredis';
import { produceMessage } from "./kafka";
import { instrument } from "@socket.io/admin-ui"

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
      io.on('connection', (socket: Socket) => {
        console.log('A user connected', socket.id);
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
        socket.on('message', async ({message}:{message:string}) => {
            console.log('message received: ' + message);
            // publish this message to redis
            await pub.publish("MESSAGES", JSON.stringify({ message }));
        });
      });

      sub.on("message", async (channel, message) => {
        if (channel !== "MESSAGES") return;
        console.log("new message from redis : " + message);
        io.emit('message', JSON.parse(message));
        // produceMessage(message);
      });
    }

    public getIo() {
        return this.io;
    }
  }

export default SocketServer;