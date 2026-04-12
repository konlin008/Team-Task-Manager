import { useDroppable } from "@dnd-kit/core";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from "./TaskCard";
import "./Column.css";

const COLUMN_LABELS = {
  todo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};

export default function Column({ id, tasks }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`column ${isOver ? "drag-over" : ""}`}
    >
      <div className="column-header">
        <h2 className="column-title">{COLUMN_LABELS[id] ?? id}</h2>
        <span className="column-count">{tasks.length}</span>
      </div>

      <ScrollArea className="column-scroll">
        <div className="column-tasks">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}