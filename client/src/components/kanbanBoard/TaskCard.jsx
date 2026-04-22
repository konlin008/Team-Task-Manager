import { useDraggable } from "@dnd-kit/core";
import "./TaskCard.css";
import { ClockAlert, MessageSquare, GripVertical } from "lucide-react";
import EditTask from "./EditTask";
import AllAssignee from "./AllAssignee";

const PRIORITY_CONFIG = {
    high: { label: "High", className: "priority-high" },
    medium: { label: "Medium", className: "priority-medium" },
    low: { label: "Low", className: "priority-low" },
};

export default function TaskCard({ task, isOverlay = false }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: task.id,
    });

    const priority = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.low;

    return (
        <div
            ref={setNodeRef}
            className={[
                "task-card",
                isDragging ? "task-dragging" : "",
                isOverlay ? "task-overlay" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >


            {task.cover && (
                <div className="task-cover">
                    <img src={task.cover} alt="" />
                </div>
            )}
            <div className=" flex gap-4 justify-between items-center">
                <div className="flex flex-col gap-2">
                    <p className="task-title">{task.title}</p>

                    {task.description && (
                        <p className="task-description text-sm">
                            {task.description}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-1 items-end">
                    <div
                        {...listeners}
                        {...attributes}
                        className="cursor-grab active:cursor-grabbing p-1"
                    >
                        <GripVertical size={18} />
                    </div>

                    <EditTask task={task} />
                </div>
            </div>



            <div className="task-footer">
                <div className="flex gap-1 items-center">
                    <ClockAlert size={17} className="text-gray-400" />
                    {task.date && (
                        <span className="task-date">{task.date}</span>
                    )}
                </div>

                <span className={`task-priority ${priority.className}`}>
                    <span className="priority-dot" />
                    {priority.label}
                </span>
            </div>

            <div className="w-full h-10 flex items-center justify-between">
                <AllAssignee assignees={task.assignee} taskId={task.id} />
                <div className="flex items-center cursor-pointer gap-1">
                    <MessageSquare size={20} />
                    <p className="text-sm">Chat</p>
                </div>
            </div>
        </div>
    );
}