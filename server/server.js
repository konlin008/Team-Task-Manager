import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import connectDb from "./config/db.js";
const PORT = 8080;
import "dotenv/config";
import chalk from "chalk";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.routes.js";
import workSpaceRouter from "./routes/workSpace.route.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import commentRouter from "./routes/comment.routes.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server);

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
app.use("/api/comment", commentRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});
app.listen(PORT, () => {
  console.log(chalk.bgBlue(`Server listening on port ${PORT}`));
});
