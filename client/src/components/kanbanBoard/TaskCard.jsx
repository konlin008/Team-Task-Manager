import { useDraggable } from "@dnd-kit/core";
import "./TaskCard.css";

const PRIORITY_CONFIG = {
    high: { label: "High", className: "priority-high" },
    medium: { label: "Medium", className: "priority-medium" },
    low: { label: "Low", className: "priority-low" },
};

function getInitials(name = "") {
    return name.trim().charAt(0).toUpperCase();
}

function getAvatarColor(name = "") {
    const colors = [
        { bg: "#ddd6fe", color: "#5b21b6" },
        { bg: "#d1fae5", color: "#065f46" },
        { bg: "#fef3c7", color: "#92400e" },
        { bg: "#fce7f3", color: "#9d174d" },
        { bg: "#dbeafe", color: "#1e40af" },
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
}

export default function TaskCard({ task, isOverlay = false }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: task.id,
    });

    const priority = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.low;
    const avatarColor = getAvatarColor(task.assignee ?? "");

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`task-card
                ${isDragging ? "task-dragging" : ""}
                ${isOverlay ? "task-overlay" : ""}
            `.trim()}
        >
            {/* Optional cover image */}
            {task.cover && (
                <div className="task-cover">
                    <img src={task.cover} alt="" />
                </div>
            )}

            <p className="task-title">{task.title}</p>

            <div className="task-footer">
                <div className="task-assignee">
                    <div
                        className="task-avatar"
                        style={{ background: avatarColor.bg, color: avatarColor.color }}
                    >
                        {getInitials(task.assignee ?? "?")}
                    </div>
                    {task.assignee && (
                        <span className="task-name">{task.assignee}</span>
                    )}
                    {task.date && (
                        <span className="task-date">{task.date}</span>
                    )}
                </div>

                <span className={`task-priority ${priority.className}`}>
                    <span className="priority-dot" />
                    {priority.label}
                </span>
            </div>
        </div>
    );
}