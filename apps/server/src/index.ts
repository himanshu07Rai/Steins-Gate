import ExpressConfig from "./express/express.config"
import { startMessageConsumer } from "./services/kafka";
import SocketServer from "./services/socket";
import express from "express"
import http from "http"
import { requestLog } from "./middlewares/requestLogger";
import router from "./routes";
import dotenv from 'dotenv';
import cors from "cors"
import { attachUser } from "./middlewares/attachUser";
dotenv.config();

const app = ExpressConfig();
const httpServer = http.createServer(app);

app.use(express.static('public'));
app.use(cors())
app.use(express.json());
app.use(requestLog)

const httpPort = 8080;

const socketServer = new SocketServer(httpServer);
socketServer.initListeners();
startMessageConsumer().catch(console.error);

app.use('/api', router);
// app.get('/api/messages',  async (_req: any, res: { json: (arg0: any[]) => void; }) => {
//   const messages = await messageDao.getAllRows({});
//   res.json(messages);
// })

app.get('/api', (_req: any, res: { json: (arg0: { message: string; }) => void; }) => {
  res.json({ message: 'Hello from Express!' });
} );

httpServer.listen(httpPort, () => {
  console.log(`HTTP and WebSocket server is running on http://localhost:${httpPort}`);
});




