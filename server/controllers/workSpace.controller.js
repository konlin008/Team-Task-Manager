import WorkSpace from "../models/WorkSpace.js";

export const createWorkSpace = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ownerId = req.user.id;
    if (!title) return res.status(400).json({ message: "Title is Required" });
    const newWorkspace = await WorkSpace.create({
      title,
      description,
      createdBy: ownerId,
    });
    if (newWorkspace)
      return res
        .status(201)
        .json({ workspace: newWorkspace, message: "Workspace Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const addMemberToWorkSpace = async (req, res) => {
  try {
    const { userId, workSpaceId } = req.body;
    const ownerId = req.user.id;
    if (!userId || !workSpaceId)
      return res.status(400).json({ message: "UserId or WorkSpaceId Missing" });
    if (!userId) return req.status(404).json({ message: "User not Found" });
    const workSpace = await WorkSpace.findById(workSpaceId);
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
