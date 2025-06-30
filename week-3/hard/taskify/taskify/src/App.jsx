import { useState } from "react";
import Column from "./Column";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Priority");
  const [status, setStatus] = useState("Current State");

  const [tasks, setTasks] = useState({
    "TO-DO": [],
    "In Progress": [],
    "Under review": [],
    Finished: [],
  });

  const STATUS_COLUMNS = ["TO-DO", "In Progress", "Under review", "Finished"];

  const handleSave = () => {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      priority === "Priority" ||
      status === "Current State"
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const newTask = {
      id: Date.now(), // 👈 Unique ID
      title,
      description,
      priority,
      status,
    };
    setTasks((prev) => ({
      ...prev,
      [status]: [...prev[status], newTask],
    }));
    setShowModal(false);
    setTitle("");
    setDescription("");
    setPriority("Priority");
    setStatus("Current State");
  };

 const handleDropTask = (task, newStatus) => {
  if (task.status === newStatus) return;

  setTasks((prevTasks) => {
    const updated = { ...prevTasks };

    // Ensure both old and new status columns exist
    if (!updated[task.status] || !updated[newStatus]) return prevTasks;

    // Remove from old column
    updated[task.status] = updated[task.status].filter((t) => t.id !== task.id);

    // Add to new column
    const updatedTask = { ...task, status: newStatus };
    updated[newStatus] = [...updated[newStatus], updatedTask];

    return updated;
  });
};

  return (
    <>
      {!showModal ? (
        <div className="bg-gray-400 min-h-screen grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 overflow-x-hidden p-4">
          {STATUS_COLUMNS.map((col) => (
            <Column
              key={col}
              title={col}
              tasks={tasks[col]}
              onDropTask={handleDropTask}
              setShowModal={setShowModal}
            />
          ))}
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full border p-2 rounded mb-4"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task Description"
              className="w-full border p-2 rounded mb-4"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option disabled>Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>Urgent</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option disabled>Current State</option>
              <option>TO-DO</option>
              <option>In Progress</option>
              <option>Under review</option>
              <option>Finished</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
