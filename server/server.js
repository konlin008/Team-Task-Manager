import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import connectDb from "./config/db.js";
import "dotenv/config";
import chalk from "chalk";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.routes.js";
import workSpaceRouter from "./routes/workSpace.route.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import messageRouter from "./routes/messages.routes.js";
import initSocket from "./socket/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/workspace", workSpaceRouter);
app.use("/api/project", projectRouter);
app.use("/api/task", taskRouter);
app.use("/api/comment", messageRouter);
app.use("/api/messages", messageRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

initSocket(io);

server.listen(PORT, () => {
  console.log(chalk.bgBlue(`Server running on port ${PORT}`));
});
