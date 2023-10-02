import React, { useState } from "react";
import "./TodoList.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onEditTask: (taskId: number, updatedTitle: string) => void;
  onComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

function TodoList({
  tasks,
  onAddTask,
  onEditTask,
  onComplete,
  onDelete,
}: TodoListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editedTask, setEditedTask] = useState({ id: null, title: "" });

  const AddTask = () => {
    if (newTaskTitle.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
    };
    onAddTask(newTask);
    setNewTaskTitle("");
  };

  const EditTask = (taskId: number, updatedTitle: string) => {
    if (updatedTitle.trim() === "") return;
    onEditTask(taskId, updatedTitle);
    setEditedTask({ id: null, title: "" });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button className="add" onClick={AddTask}>
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onComplete(task.id)}
            />
            {editedTask.id === task.id ? (
              <div>
                <input
                  type="text"
                  value={editedTask.title || task.title}
                  onChange={(e) =>
                    setEditedTask({ id: task.id, title: e.target.value })
                  }
                />
                <button
                  className="save"
                  onClick={() => EditTask(task.id, editedTask.title)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <span className={task.completed ? "completed" : ""}>
                  {task.title}
                </span>
                <button
                  className="edit"
                  onClick={() =>
                    setEditedTask({ id: task.id, title: task.title })
                  }
                >
                  Edit
                </button>
                <button className="delete" onClick={() => onDelete(task.id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
