import express from "express";
import { getTaskMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:taskId", getTaskMessages);

export default router;