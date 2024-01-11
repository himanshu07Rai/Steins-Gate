import ExpressConfig from "./express/express.config"
import SocketServer from "./services/socket";
import express from "express"
import http from "http"

const PORT = process.env.PORT || 5000

// Create HTTP server
const app = ExpressConfig();
const httpServer = http.createServer(app);


app.use(express.static('public'));

// Define a route for serving the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
const httpPort = 8080;
const socketPort = 8081;

const socketServer = new SocketServer(httpServer);
socketServer.initListeners();

httpServer.listen(httpPort, () => {
  console.log(`HTTP server is running on http://localhost:${httpPort}`);
});

socketServer.io.listen(socketPort);




