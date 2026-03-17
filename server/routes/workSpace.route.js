import express from "express";
import {
  addMemberToWorkSpace,
  createWorkSpace,
} from "../controllers/workSpace.controller.js";

const router = express.Router();

router.post("/", createWorkSpace);
router.post("/invite", addMemberToWorkSpace);

export default router;
