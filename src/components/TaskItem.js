import React from 'react';

const TaskItem = ({ task, toggleComplete }) => {
    return (
      <div> {/* ✅ Use <div> instead of <li> */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        {task.text}
      </div>
    );
  };
  
export default TaskItem;
