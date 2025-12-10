const getOrCreatePrivateConversation = require("../helpers/chat/createConversation");
const { Message } = require("../models");

module.exports = (io, socket) => {
  socket.on("join_chat", async ({ userId, otherUserId }) => {
    // Get or create a conversation row
    const convo = await getOrCreatePrivateConversation(userId, otherUserId);
    const roomId = `private_${convo.id}`;
    // Make the user join that room
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);

    const messages = await Message.findAll({
      where: { conversationId: convo.id },
    });

    socket.emit("chat_history", { conversationId: convo.id, messages });
  });

  socket.on("send_message", async ({ conversationId, message }) => {
    const senderId = socket.user.id;
    const newMsg = await Message.create({ conversationId, senderId, message });
    const roomId = `private_${conversationId}`;
    io.to(roomId).emit("receive_message", newMsg);
  });
};
