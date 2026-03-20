import mongoose from "mongoose";
import Task from "../models/Task.js";
import Comment from "../models/Comment.js";

export const postComment = async (req, res) => {
  try {
    const { taskId, text } = req.body;
    const userId = "69b78a5f70ad20838399da36";
    if (!mongoose.Types.ObjectId.isValid(taskId) || !text?.trim())
      return res.status(400).json({ message: "Bad Request" });
    const task = await Task.findById(taskId).select("assignedTo createdBy");
    if (!task) return res.status(404).json({ message: "Task Not Found" });
    const isMember = task.assignedTo.some((id) => id.toString() === userId);
    const isCreator = task.createdBy.toString() === userId;
    if (!isMember && !isCreator)
      return res
        .status(403)
        .json({ message: "Only Task Creator & Assigned Member  Can Comment" });
    await Comment.create({ text, task: taskId, user: userId });
    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
