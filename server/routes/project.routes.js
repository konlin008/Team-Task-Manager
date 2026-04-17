import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  projectDetails,
} from "../controllers/project.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/", createProject);
router.get("/workspace/:id", getProjects);
router.get("/:id", projectDetails);
router.delete("/:id", deleteProject);

export default router;
