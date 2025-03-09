import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

const TaskList = ({ tasks = [], toggleComplete = () => {} }) => {
  return (
    <Droppable droppableId="taskList">
      {(provided) => (
        <ul className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.length === 0 ? (
            <p className={styles.noTasks}>No tasks added yet!</p>
          ) : (
            tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${styles.taskItem} ${snapshot.isDragging ? styles.dragging : ""}`}
                  >
                    <TaskItem task={task} toggleComplete={toggleComplete} />
                  </li>
                )}
              </Draggable>
            ))
          )}
          {provided.placeholder}  {/* ✅ Correct placement */}
        </ul>
      )}
    </Droppable>
  );
};

export default TaskList;
