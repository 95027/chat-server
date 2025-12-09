const socketAuth = require("../middlewares/socketAuth");
const chatSocket = require("./chat");

const socketSetup = (io) => {
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    chatSocket(io, socket);

    socket.on("disconnecting", () => {
      console.log("Client disconnecting:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });

    socket.on("error", (err) => {
      console.log(`Client disconnected error: ${err}`, socket.id);
    });
  });
};

module.exports = socketSetup;
