import express from "express";
import {
  addMemberToWorkSpace,
  createWorkSpace,
  reviewMemberRequest,
} from "../controllers/workSpace.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);
router.post("/", createWorkSpace);
router.post("/invite", addMemberToWorkSpace);
router.put("/review-request/:requestId", reviewMemberRequest);

export default router;
