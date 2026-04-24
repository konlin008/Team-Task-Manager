import JoinRequest from "../models/JoinRequest.js";
import Task from "../models/Task.js";
import WorkSpace from "../models/WorkSpace.js";

export const searchWorkspace = async (req, res) => {
  try {
    const { inviteCode } = req.query;
    if (!inviteCode)
      return res.status(400).json({
        message: "Bad Request",
      });
    const workspace = await WorkSpace.findOne({
      inviteCode,
    }).select("title description");
    if (!workspace)
      return res.status(400).json({ message: "Workspace id Invalid" });
    return res.status(200).json({ workspace });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const joinWorkspaceRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const existingWorkspace = await WorkSpace.findOne({
      members: userId,
    });

    if (existingWorkspace) {
      return res.status(400).json({
        message: "You already have a pending request",
      });
    }
    const { workspaceId } = req.params;
    if (!workspaceId) return res.status(400).json({ message: "Bad Request" });
    const workspace = await WorkSpace.findById(workspaceId);
    if (!workspace)
      return res.status(404).json({ message: "Workspace Not Found" });
    const alreadyMember = workspace.members.some(
      (id) => id.toString() === userId,
    );
    if (alreadyMember)
      return res.status(400).json({ message: "Already a Member" });
    const existingRequest = await JoinRequest.findOne({
      user: userId,
      workspace: workspace._id,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }
    const newRequest = await JoinRequest.create({
      user: userId,
      workspace: workspace._id,
    });
    if (newRequest)
      return res
        .status(201)
        .json({ message: "Requested to be a Member of the workspace " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};
export const assignedTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({
      assignedTo: userId,
    })
      .populate("assignedTo", "name email")
      .populate("project", "title")
      .populate("createdBy", "name");
    if (tasks.length === 0)
      return res
        .status(404)
        .json({ message: "You are Not Assigned To Any Task" });
    return res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
