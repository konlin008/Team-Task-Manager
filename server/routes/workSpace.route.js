import express from "express";
import {
  addMemberToWorkSpace,
  createWorkSpace,
  getAllWorkspace,
  reviewMemberRequest,
} from "../controllers/workSpace.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);
router.post("/", createWorkSpace);
router.post("/invite", addMemberToWorkSpace);
router.put("/review-request/:requestId", reviewMemberRequest);
router.get("/", getAllWorkspace);

export default router;
