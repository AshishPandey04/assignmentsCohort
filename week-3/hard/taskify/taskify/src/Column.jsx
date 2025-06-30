import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

function Column({ title, tasks, onDropTask, setShowModal }) {
  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: (item) => onDropTask(item, title), // ✅ pass the task directly
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={dropRef} className="p-2">
      <h1 className="bg-white text-center p-2 rounded-2xl text-lg font-semibold shadow">
        {title} <span className="text-sm text-gray-500">({tasks.length})</span>
      </h1>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

      <button
        className="bg-black p-2 mt-2 rounded-2xl text-white flex items-center justify-between w-full hover:bg-gray-800 transition"
        onClick={() => setShowModal(true)}
      >
        <span>Add new</span>
        <span className="text-xl font-bold">+</span>
      </button>

      {isOver && <div className="h-4 bg-green-200 rounded mt-2"></div>}
    </div>
  );
}

export default Column;
