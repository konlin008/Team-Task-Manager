import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, projectId } =
      req.body;
    const createdBy = req.user.id;
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

    const validStatus = ["todo", "inprogress", "done"];
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
    const { status, priority } = req.query;
    if (!projectId) return res.status(400).json({ message: "Bad Request" });
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const filter = { project: projectId };
    if (status || priority) {
      filter.$or = [
        ...(status ? [{ status }] : []),
        ...(priority ? [{ priority }] : []),
      ];
    }
    const tasks = await Task.find(filter).populate("assignedTo", "name email");

    return res.status(202).json({ tasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const taskDetails = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task Not Found" });
    return res.status(200).json({ task });
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
    const userId = req.user.id;
    const { title, description, status, priority, dueDate } = req.body;
    if (!id) return res.status(400).json({ message: "Bad Request" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
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

    const validStatus = ["todo", "inProgress", "done"];
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
    const userId = req.body.id;
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
    const adminId = req.user.id;
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
export const unassignedMembers = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) return res.status(400).json({ message: "Task Id Rquired" });
    const task = await Task.findById(taskId).select("assignedTo project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const project = await Project.findById(task.project)
      .select("members.user")
      .populate({ path: "members.user", select: "avatar name email" });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const assignedSet = new Set(task.assignedTo.map((id) => id.toString()));
    const unassignedMembers = project.members.filter((member) => {
      return !assignedSet.has(member.user._id.toString());
    });
    return res.status(200).json({
      success: true,
      unassignedMembers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};
