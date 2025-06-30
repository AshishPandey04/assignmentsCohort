import { useDrag } from "react-dnd";

function TaskCard({ task }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: () => ({ ...task }), // ✅ Now item IS the task itself (not { task })
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={`bg-white p-2 m-2 rounded shadow transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm">{task.description}</p>
    <span
  className={`text-xs text-white px-2 py-1 rounded 
    ${
      task.priority === "Low"
        ? "bg-yellow-500"
        : task.priority === "Medium"
        ? "bg-green-500"
        : task.priority === "Urgent"
        ? "bg-red-500"
        : "bg-gray-400"
    }`}
>
  {task.priority}
</span>
    </div>
  );
}

export default TaskCard;
