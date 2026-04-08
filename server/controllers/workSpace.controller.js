import mongoose from "mongoose";
import JoinRequest from "../models/JoinRequest.js";
import WorkSpace from "../models/WorkSpace.js";
import crypto from "crypto";

export const createWorkSpace = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ownerId = req.user.id;
    const workspace = await WorkSpace.findOne({ createdBy: ownerId });
    if (workspace)
      return res.status(400).json({ message: "Already owner of a workspace" });
    if (!title) return res.status(400).json({ message: "Title is Required" });
    const inviteCode = crypto.randomBytes(3).toString("hex");
    const newWorkspace = await WorkSpace.create({
      title,
      description,
      createdBy: ownerId,
      inviteCode,
    });
    if (newWorkspace)
      return res
        .status(200)
        .json({ workspace: newWorkspace, message: "Workspace Created" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Invite code collision, try again",
      });
    }
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const viewAllMembers = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const ownerId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID" });
    }
    const workspace = await WorkSpace.findById(workspaceId).populate(
      "members",
      "name email avatar",
    );
    if (!workspace)
      return res.status(404).json({ message: "Workspace Not Found" });
    if (workspace.createdBy.toString() !== ownerId)
      return res
        .status(403)
        .json({ message: "only owner can view the all workspace member" });
    return res.status(200).json({ members: workspace.members });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const addMemberToWorkSpace = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const { userId } = req.body;
    const ownerId = req.user.id;
    if (!userId || !workspaceId)
      return res.status(400).json({ message: "UserId or WorkSpaceId Missing" });
    if (!userId) return req.status(404).json({ message: "User not Found" });
    const workSpace = await WorkSpace.findById(workspaceId);
    if (!workSpace)
      return res.status(404).json({ message: "Work space not Found" });
    if (workSpace.createdBy != ownerId)
      return res.status(403).json({ message: "Only Owner Allowed" });
    const alreadyMember = workSpace.members.some(
      (id) => id.toString() === userId,
    );
    if (alreadyMember) {
      return res.status(400).json({ message: "User already a member" });
    }
    workSpace.members.push(userId);
    await workSpace.save();
    res.json({ message: "Member added", workSpace });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const viewAllMemberRequest = async (req, res) => {
  try {
    const workSpaceId = req.params.id;
    const userId = req.user.id;
    if (!workSpaceId)
      return res.status(400).json({ message: "Workspace ID Missing" });
    const workSpace = await WorkSpace.findById(workSpaceId);
    if (!workSpace.ownerId.toString() === userId)
      return res.status(400).json({ message: "Only owner Can view this" });
    const memberRequests = await JoinRequest.find({ workSpace: workSpaceId });
    return res.status(202).json({ memberRequests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const reviewMemberRequest = async (req, res) => {
  try {
    const { workSpaceId, requestId } = req.params;
    const { review } = req.body;
    const userId = req.user.id;

    if (!workSpaceId || !review) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const workSpace = await WorkSpace.findById(workSpaceId);

    if (!workSpace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    if (workSpace.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Only owner can perform this action" });
    }

    const request = await JoinRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (!["approve", "reject"].includes(review)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    if (review === "approve") {
      const alreadyMember = workSpace.members.some(
        (id) => id.toString() === request.user.toString(),
      );

      if (!alreadyMember) {
        workSpace.members.push(request.user);
        await workSpace.save();
      }

      request.status = "approved";
    }
    if (review === "reject") {
      request.status = "rejected";
    }

    await request.save();

    return res.status(200).json({
      message: `Request ${review}ed successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllWorkspace = async (req, res) => {
  try {
    const userId = req.user.id;
    let workspace = await WorkSpace.findOne({ createdBy: userId });
    if (!workspace) {
      workspace = await WorkSpace.findOne({ members: userId });
    }
    return res.status(200).json({ workspace });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
