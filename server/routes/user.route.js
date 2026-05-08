import express from "express";
import {
  assignedTask,
  joinWorkspaceRequest,
  searchWorkspace,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { updateProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/search-workSpace", isAuthenticated, searchWorkspace);
router.get(
  "/requestToJoin/:workspaceId",
  isAuthenticated,
  joinWorkspaceRequest,
);
router.get("/assigned-task", isAuthenticated, assignedTask);
router.put("/update-profile", isAuthenticated, updateProfile);

export default router;
