import express from "express";
import connectDb from "./config/db.js";
const PORT = 8080;
import "dotenv/config";
import chalk from "chalk";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.routes.js";
import workSpaceRouter from "./routes/workSpace.route.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";

const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "server running" });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/workSpace", workSpaceRouter);

app.listen(PORT, () => {
  console.log(chalk.bgBlue(`Server listening on port ${PORT}`));
});
