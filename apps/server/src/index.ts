import ExpressConfig from "./express/express.config"
import { startMessageConsumer } from "./services/kafka";
import SocketServer from "./services/socket";
import express from "express"
import http from "http"
import { requestLog } from "./middlewares/requestLogger";
import authRouter from "./routes";
import dotenv from 'dotenv';
import cors from "cors"
dotenv.config();

const app = ExpressConfig();
const httpServer = http.createServer(app);

app.use(express.static('public'));
app.use(cors())
app.use(express.json());
app.use(requestLog)

const httpPort = 8080;
const socketPort = 8081;

const socketServer = new SocketServer(httpServer);
socketServer.initListeners();
startMessageConsumer();

app.use('/api/auth', authRouter);
// app.get('/api/messages',  async (_req: any, res: { json: (arg0: any[]) => void; }) => {
//   const messages = await messageDao.getAllRows({});
//   res.json(messages);
// })

httpServer.listen(httpPort, () => {
  console.log(`HTTP server is running on http://localhost:${httpPort}`);
});

socketServer.io.listen(socketPort);




