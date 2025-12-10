const express = require("express");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const db = require("./src/models");
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler");
const routes = require("./src/routes");
const logApiCalls = require("./src/helpers/logApiCalls");
const socketSetup = require("./src/sockets");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(logApiCalls);

app.use("/v1", routes);

app.use("/", (req, res, next) => {
  res.send("Hello World");
});

app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

socketSetup(io);

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: false }).then(() => {
  console.log("DB synced...");
  server.listen(PORT, () => console.log(`server is running on ${PORT}`));
});
