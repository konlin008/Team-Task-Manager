import TaskMessage from "../models/taskMessage.js";

export default function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_task", (taskId) => {
      socket.join(taskId);
    });

    socket.on("send_message", async (data) => {
      try {
        const savedMessage = await TaskMessage.create({
          taskId: data.taskId,
          sender: data.user,
          text: data.text,
        });

        io.to(data.taskId).emit("receive_message", savedMessage);
      } catch (err) {
        console.error("Socket error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
