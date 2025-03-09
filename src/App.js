import React, { useState, useEffect, useContext } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { DragDropContext } from "@hello-pangea/dnd";
import "./App.css";
import { ThemeContext } from "./ThemeContext";
import process from "process";
window.process = process;

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  console.log("ThemeToggle Rendered. Dark Mode:", darkMode);

  return (
    <button onClick={() => setDarkMode((prev) => !prev)}>
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};


const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now().toString(), text, completed: false }]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // ✅ Correct DragDropContext onDragEnd function
  const reorderTasks = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={reorderTasks}>  {/* ✅ Wrap TaskList */}
      <div className="todo-container">
        <h1>To-Do List</h1>
        <ThemeToggle />
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} toggleComplete={toggleComplete} />
      </div>
    </DragDropContext>
  );
};

export default App;
export { ThemeToggle };
