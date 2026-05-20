import { io } from "socket.io-client";

const socket = io("https://team-task-manager-m25e.onrender.com", {
  withCredentials: true,
});

export default socket;
