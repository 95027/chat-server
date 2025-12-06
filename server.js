const express = require("express");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const db = require("./src/models");
const errorHandler = require("./src/middlewares/errorHandler");
const routes = require("./src/routes");
const logApiCalls = require("./src/helpers/logApiCalls");
const socketSetup = require("./src/sockets");

const app = express();
app.use(express.json());

app.use(logApiCalls);

app.use("/v1", routes);

app.use("/", (req, res, next) => {
  //   res.send("Hello World");
  res.send(`
    <h2>Socket.io Test Page</h2>
    <script src="https://cdn.socket.io/4.7.4/socket.io.min.js"></script>
    <script>
      const socket = io("http://localhost:3000");

      socket.on("connect", () => {
        console.log("Connected:", socket.id);
      });
    </script>
  `);
});

app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketSetup(io);

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: false }).then(() => {
  console.log("DB synced...");
  server.listen(PORT, () => console.log(`server is running on ${PORT}`));
});
