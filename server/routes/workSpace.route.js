import express from "express";
import {
  addMemberToWorkSpace,
  createWorkSpace,
} from "../controllers/workSpace.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);
router.post("/", createWorkSpace);
router.post("/invite", addMemberToWorkSpace);

export default router;
