import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, workspace } = req.body;
    const ownerId = req.user.id;
    if (!title || !workspace)
      return res.status(400).json({ message: "Bad Request" });
    const project = await Project.create({
      title,
      description,
      owner: ownerId,
      workspace,
      members: [
        {
          user: ownerId,
          role: "admin",
        },
      ],
    });
    if (project)
      return res
        .status(200)
        .json({ message: "Project Created Successfully", project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const getProjects = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    if (!workspaceId) return res.status(400).json({ message: "Bad Request" });
    const projects = await Project.find({ workspace: workspaceId });
    return res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!projectId) return res.status(400).json({ message: "Bad Request" });
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project Not Found" });
    await Project.findByIdAndDelete(projectId);
    return res.status(200).json({ message: "Project Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
