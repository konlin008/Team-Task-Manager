import TaskMessage from "../models/taskMessage.js";

export const getTaskMessages = async (req, res) => {
  try {
    const { taskId } = req.params;

    const messages = await TaskMessage.find({ taskId }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
