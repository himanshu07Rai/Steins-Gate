import ExpressConfig from "./express/express.config"
import { startMessageConsumer } from "./services/kafka";
import SocketServer from "./services/socket";
import express from "express"
import http from "http"
import { messageDao } from "./daos/messageDao";
import { requestLog } from "./middlewares/requestLogger";
import passport, { localAuthMiddleware } from "./middlewares/passport";

// Create HTTP server
const app = ExpressConfig();
const httpServer = http.createServer(app);


app.use(express.static('public'));
app.use(requestLog)
app.use(passport.initialize())

const httpPort = 8080;
const socketPort = 8081;

const socketServer = new SocketServer(httpServer);
socketServer.initListeners();
startMessageConsumer();
app.get('/api/messages',localAuthMiddleware, async (req, res) => {
  const messages = await messageDao.getAllRows({});
  res.json(messages);
})

httpServer.listen(httpPort, () => {
  console.log(`HTTP server is running on http://localhost:${httpPort}`);
});

socketServer.io.listen(socketPort);




