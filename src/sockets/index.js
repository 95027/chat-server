const socketAuth = require("../middlewares/socketAuth");

const socketSetup = (io) => {
  io.use(socketAuth);
  
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

module.exports = socketSetup;
