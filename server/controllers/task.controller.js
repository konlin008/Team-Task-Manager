import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, projectId } =
      req.body;
    const createdBy = "69b78a5f70ad20838399da36";
    if (!title || !description || !priority || !dueDate || !projectId) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const isMember = project.members.some(
      (member) => member.user.toString() === createdBy,
    );
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "Only member of the project can create Task" });
    }
    const validPriority = ["High", "Medium", "Low"];
    if (priority && !validPriority.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }

    const validStatus = ["Todo", "In Progress", "Done"];
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      project: projectId,
      createdBy,
    });
    if (newTask)
      return res.status(200).json({
        task: newTask,
        message: "Task Created Successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const allTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) return res.status(400).json({ message: "Bad Request" });
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const tasks = await Task.find({ project: projectId });
    return res.status(202).json({ tasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = "69b78a5f70ad20838399da36";
    const { title, description, status, priority, dueDate } = req.body;
    if (!id) return res.status(400).json({ message: "Bad Request" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task Not Found" });
    const project = await Project.findById(task?.project).select("members");
    const isMember = project.members.some(
      (member) => member.user.toString() === userId,
    );
    if (!isMember)
      return res
        .status(403)
        .json({ message: "Only project members can update tasks" });
    const validPriority = ["High", "Medium", "Low"];
    if (priority && !validPriority.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }

    const validStatus = ["Todo", "In Progress", "Done"];
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;
    await task.save();
    return res.status(200).json({
      task,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const userId = "69b78a5f70ad20838399da36";
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Bad Request" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task Not Found" });
    const project = await Project.findById(task?.project).select("owner");
    const isCreator = task.createdBy.toString() === userId;
    const isOwner = project.owner.toString() === userId;
    if (!isCreator && !isOwner) {
      return res.status(403).json({
        message: "Only project owner or task creator can delete",
      });
    }
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const assignMember = async (req, res) => {
  try {
    const { memberId, id } = req.params;
    const adminId = "69b78a5f70ad20838399da36";
    if (!id || !memberId)
      return res.status(400).json({ message: "Bad Request" });
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(memberId)
    ) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task Not Found" });
    const project = await Project.findById(task?.project).select(
      "members owner",
    );
    const isOwner = project.owner.toString() === adminId;
    const isAdmin = project.members.some(
      (member) => member.user.toString() === adminId && member.role === "admin",
    );
    if (!isAdmin && !isOwner)
      return res.status(403).json({
        message: "Only  Project Owner and Admin can add Member to Task",
      });
    const isMember = project.members.some(
      (member) => member.user.toString() === memberId,
    );
    const alreadyAssigned = task.assignedTo.some(
      (user) => user.toString() === memberId,
    );
    if (alreadyAssigned) {
      return res.status(400).json({
        message: "User already assigned to task",
      });
    }
    if (!isMember)
      return res
        .status(403)
        .json({ message: "Member Not Assigned Into The Project Yet" });
    task.assignedTo.push(memberId);
    await task.save();
    return res.status(200).json({
      task,
      message: "Member assigned successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
