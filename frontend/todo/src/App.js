import React, { useState, useMemo } from "react";

// Generate 10k+ tasks
const generateTasks = (count = 10000) => {
  const statuses = ["To Do", "In Progress", "Done"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Task #${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

export default function App() {
  const [tasks] = useState(generateTasks);
  const [filter, setFilter] = useState("All");

  // Filter tasks based on status
  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Task Dashboard</h1>

      {/* Filter buttons */}
      <div style={{ marginBottom: "1rem" }}>
        {["All", "To Do", "In Progress", "Done"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              marginRight: "0.5rem",
              padding: "0.5rem 1rem",
              fontWeight: filter === f ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div
        style={{
          maxHeight: "600px",
          overflowY: "scroll",
          border: "1px solid #ccc",
        }}
      >
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            style={{
              padding: "0.5rem",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{task.title}</span>
            <span style={{ fontWeight: "bold" }}>{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
