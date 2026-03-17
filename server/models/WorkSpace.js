import mongoose from "mongoose";

const workSpaceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    inviteCode: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);
const WorkSpace = mongoose.model("WorkSpace", workSpaceSchema);
export default WorkSpace;
