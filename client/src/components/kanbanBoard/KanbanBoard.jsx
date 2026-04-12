import { useState } from "react";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import Column from "./Column";
import TaskCard from "./TaskCard";

export default function KanbanBoard() {
    const [columns, setColumns] = useState({
        todo: [
            { id: "1", title: "Design login page UI", priority: "high", assignee: "Aman", date: "Apr 25" },
            { id: "2", title: "Setup project structure", priority: "medium", assignee: "Riya", date: "Apr 28" },
            { id: "3", title: "Create reusable button component", priority: "low", assignee: "Karan", date: "May 1" },
            { id: "4", title: "Write API service functions", priority: "medium", assignee: "Aman", date: "May 2" },
            { id: "5", title: "Research drag-and-drop libraries", priority: "low", assignee: "Riya", date: "May 3" },
            { id: "6", title: "Fix mobile responsiveness issues", priority: "high", assignee: "Karan", date: "May 5" },
        ],
        inProgress: [
            { id: "7", title: "Implement Kanban drag logic", priority: "high", assignee: "Aman", date: "Apr 30" },
            { id: "8", title: "Connect frontend with backend API", priority: "medium", assignee: "Riya", date: "May 4" },
            { id: "9", title: "Add authentication flow", priority: "high", assignee: "Karan", date: "May 6" },
            { id: "10", title: "Optimize component re-renders", priority: "low", assignee: "Aman", date: "May 7" },
        ],
        done: [
            { id: "11", title: "Initialize React project", priority: "low", assignee: "Riya", date: "Apr 20" },
            { id: "12", title: "Install Tailwind CSS", priority: "low", assignee: "Karan", date: "Apr 21" },
            { id: "13", title: "Setup routing", priority: "medium", assignee: "Aman", date: "Apr 23" },
        ],
    });

    const [activeTask, setActiveTask] = useState(null);

    function findColumn(id) {
        return Object.keys(columns).find((colId) =>
            columns[colId].some((item) => item.id === id)
        );
    }

    function handleDragStart(event) {
        const { active } = event;
        const col = findColumn(active.id);
        const task = columns[col]?.find((t) => t.id === active.id);
        setActiveTask(task ?? null);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const sourceCol = findColumn(active.id);
        const destCol = findColumn(over.id) || over.id;

        if (!sourceCol || !destCol || sourceCol === destCol) return;

        const sourceItems = [...columns[sourceCol]];
        const destItems = [...columns[destCol]];
        const movedTask = sourceItems.find((i) => i.id === active.id);

        setColumns({
            ...columns,
            [sourceCol]: sourceItems.filter((i) => i.id !== active.id),
            [destCol]: [...destItems, movedTask],
        });
    }

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-6 justify-between">
                {Object.entries(columns).map(([colId, tasks]) => (
                    <Column key={colId} id={colId} tasks={tasks} />
                ))}
            </div>

            <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
            </DragOverlay>
        </DndContext>
    );
}