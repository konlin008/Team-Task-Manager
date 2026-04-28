import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getTaskMessages } from "../controllers/messages.controller.js";

const router = express.Router();

router.get("/:taskId", getTaskMessages);

export default router;
                                                                                                        