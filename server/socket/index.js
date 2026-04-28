import jwt from "jsonwebtoken";
import TaskMessage from "../models/taskMessage.js";
import Task from "../models/task.js";

export default function initSocket(io) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = { id: decoded.id };

      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join_task", async (taskId) => {
      try {
        const userId = socket.user.id;

        const task = await Task.findOne({
          _id: taskId,
          assignedTo: userId,
        });

        if (!task) {
          return socket.emit("error", "Unauthorized task access");
        }

        socket.join(taskId);
      } catch (err) {
        console.error(err);
      }
    });
    socket.on("send_message", async (data) => {
      try {
        const { taskId, text } = data;

        const savedMessage = await TaskMessage.create({
          taskId,
          sender: socket.user.id,
          text,
        });
        const populatedMessage = await savedMessage.populate(
          "sender",
          "name email",
        );

        io.to(taskId).emit("receive_message", populatedMessage);
      } catch (err) {
        console.error("Socket error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
