import React, { useState } from "react";
import TodoList from "./component/TodoList";
import "./App.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Complete Project", completed: false },
    { id: 2, title: "Quiz", completed: true },
    { id: 3, title: "Research", completed: false },
  ]);

  const AddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const EditTask = (taskId: number, updatedTitle: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: updatedTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const Complete = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const DeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="App">
      <TodoList
        tasks={tasks}
        onAddTask={AddTask}
        onEditTask={EditTask}
        onComplete={Complete}
        onDelete={DeleteTask}
      />
    </div>
  );
}

export default App;
