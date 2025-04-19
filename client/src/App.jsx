import React, { useEffect } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

// API base URL constant
const API_URL = 'http://localhost:3000/api';

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (taskText) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: taskText }),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const newTask = await response.json();
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = async (taskId, newText) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTask = await response.json();
      setTasks(prevTasks => 
        prevTasks.map(task => task._id === taskId ? updatedTask : task)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen min-h-screen overflow-hidden text-white bg-gray-950 flex flex-col items-center p-8">
      <h1 className="w-full text-4xl text-center font-bold mb-8">Task Manager</h1>
      {error && (
        <div className="w-full max-w-2xl mb-4 p-4 bg-red-500 rounded-lg text-center">
          {error}
        </div>
      )}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="w-full max-w-2xl gap-4">
          <AddTask handleAddTask={handleAddTask} />
          <TaskList 
            tasks={tasks} 
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      )}
    </div>
  );
}

export default App;
