import jwt from "jsonwebtoken";
import TaskMessage from "../models/taskMessage.js";
import Task from "../models/task.js";
import cookie from "cookie";

export default function initSocket(io) {
  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");

      const token = cookies.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = {
        id: decoded.id,
      };

      next();
    } catch (err) {
      console.log("SOCKET AUTH ERROR:", err.message);

      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("join_task", async (taskId) => {
      try {
        const userId = socket.user.id;

        const task = await Task.findOne({
          _id: taskId,
        });

        if (!task) {
          return socket.emit("error", "Unauthorized task access");
        }

        socket.join(taskId);

        socket.emit("joined_task", {
          success: true,
          taskId,
        });
      } catch (err) {
        console.error(err);
      }
    });
    socket.on("leave_task", (taskId) => {
      socket.leave(taskId);

      console.log("LEFT ROOM:", taskId);
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
        console.error(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
