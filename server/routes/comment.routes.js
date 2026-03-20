import express from "express";
import { postComment } from "../controllers/comment.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, postComment);

export default router;
