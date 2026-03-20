import express from "express";
import {
  allTask,
  assignMember,
  createTask,
  deleteTask,
  editTask,
} from "../controllers/task.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/", createTask);
router.get("/:projectId", allTask);
router.put("/:id/assign-member/:memberId", assignMember);
router.put("/:id", editTask);
router.delete("/:id", deleteTask);

export default router;
