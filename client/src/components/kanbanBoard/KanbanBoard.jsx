import { useEffect, useState } from "react";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import Column from "./Column";
import TaskCard from "./TaskCard";
import { useEditTask } from "@/hooks/task.hooks";

const STATUS_MAP = {
    "todo": "todo",
    "in progress": "inProgress",
    "inprogress": "inProgress",
    "in-progress": "inProgress",
    "done": "done",
};

function normalizeTask(t) {
    const rawStatus = (t.status ?? "").toLowerCase().replace(/\s+/g, "");

    const statusKey =
        STATUS_MAP[rawStatus] ??
        STATUS_MAP[(t.status ?? "").toLowerCase()] ??
        "todo";

    const assignee =
        Array.isArray(t.assignedTo) && t.assignedTo.length > 0
            ? t.assignedTo[0]?.name ?? ""
            : "";

    const date = t.dueDate
        ? new Date(t.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
        : "";

    return {
        ...t,
        id: t._id,
        status: statusKey,
        priority: (t.priority ?? "low").toLowerCase(),
        assignee,
        date,
    };
}

export default function KanbanBoard({ tasks, projectId }) {
    const { mutate: editTask } = useEditTask()
    const [columns, setColumns] = useState({
        todo: [],
        inProgress: [],
        done: [],
    });

    const [activeTask, setActiveTask] = useState(null);

    useEffect(() => {
        if (!tasks) return;

        const normalized = tasks.map(normalizeTask);

        setColumns({
            todo: normalized.filter((t) => t.status === "todo"),
            inProgress: normalized.filter((t) => t.status === "inProgress"),
            done: normalized.filter((t) => t.status === "done"),
        });
    }, [tasks]);

    function findColumn(id) {
        return Object.keys(columns).find((colId) =>
            columns[colId].some((item) => item.id === id)
        );
    }

    function handleDragStart({ active }) {
        const col = findColumn(active.id);
        const task = columns[col]?.find((t) => t.id === active.id);
        setActiveTask(task ?? null);
    }

    function handleDragEnd({ active, over }) {
        setActiveTask(null);
        if (!over) return;

        const sourceCol = findColumn(active.id);
        const destCol = findColumn(over.id) ?? over.id;

        if (!sourceCol || !destCol || sourceCol === destCol) return;

        const movedTask = columns[sourceCol].find((i) => i.id === active.id);

        // 🟢 1. Optimistic UI update
        setColumns((prev) => ({
            ...prev,
            [sourceCol]: prev[sourceCol].filter((i) => i.id !== active.id),
            [destCol]: [...prev[destCol], { ...movedTask, status: destCol }],
        }));

        // 🟢 2. Backend update using mutation
        editTask({
            taskId: movedTask.id,
            payload: {
                status: destCol, // make sure backend expects this format
            },
        });
    }

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-6 justify-between">
                {Object.entries(columns).map(([colId, colTasks]) => (
                    <Column key={colId} id={colId} tasks={colTasks} />
                ))}
            </div>

            <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
            </DragOverlay>
        </DndContext>
    );
}