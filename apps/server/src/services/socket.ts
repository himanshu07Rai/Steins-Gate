import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
class SocketServer {
    io: SocketIOServer;
  
    constructor(httpServer: http.Server) {
        console.log('Socket server constructor')
      this.io = new SocketIOServer(httpServer,{
        cors: {
          origin: '*',
          allowedHeaders: '*',
        }
      });
    }

    public initListeners() {
        this.io.on('connection', (socket: Socket) => {
            console.log('A user connected', socket.id);
            socket.on('disconnect', () => {
              console.log('User disconnected');
            });
            socket.on('event:message', ({message}:{message:string}) => {
                console.log('message received: ' + message);
              this.io.emit('message', {message});
            });
          });
    }

    public getIo() {
        return this.io;
    }
  }

export default SocketServer;