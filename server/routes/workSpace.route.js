import express from "express";
import {
  addMemberToWorkSpace,
  createWorkSpace,
  getAllWorkspace,
  reviewMemberRequest,
  viewAllMemberRequest,
  viewAllMembers,
} from "../controllers/workSpace.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);
router.post("/", createWorkSpace);
router.post("/:id/add-member", addMemberToWorkSpace);
router.get("/:id/all-requests", viewAllMemberRequest);
router.put("/:workspaceId/requests/:requestId", reviewMemberRequest);
router.get("/", getAllWorkspace);
router.get("/:id/all-members", viewAllMembers);

export default router;
