// ----------------------------------------------------------
// File: stats-widget.tsx
// Author: Máximo Martín Moreno
// Description: This file defines the StatsWidget component, which displays task statistics 
// in the task management web application. It fetches task data from an API and calculates 
// statistics such as tasks in various states.
// ----------------------------------------------------------

// Enables client-side rendering in Next.js
'use client'

import { useState, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  status: 'TODO' | 'DOING' | 'DONE' | 'PAUSED';
}

interface Stats {
  tasksDone: number;
  tasksTodo: number;
  tasksDoing: number;
  tasksPaused: number;
  totalProjects: number;
}

// StatsWidget Component
/**
 * StatsWidget Component
 * Author: Máximo Martín Moreno
 * Description: Displays an overview of task-related statistics. 
 * It fetches tasks from an API, processes the data, and displays tasks categorized by their status.
 */
export function StatsWidget() {
  // State to store the list of tasks fetched from the API
  const [tasks, setTasks] = useState<Task[]>([]);  
  
  // State to store calculated task statistics
  const [stats, setStats] = useState<Stats>({
    tasksDone: 0,
    tasksTodo: 0,
    tasksDoing: 0,
    tasksPaused: 0,
    totalProjects: 0,
  });

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    const getTasks = async () => {
      try {
        const token = localStorage.getItem("token");  // Retrieve the authentication token from local storage
        const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
          headers: {
            Authorization: `Token ${token}`,  // Include the token in the request header for authorization
          },
        });

        // Check if the response is successful
        if (response.status !== 200) {
          throw new Error("Error fetching tasks");
        }

        setTasks(response.data);  // Update the state with the fetched tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);  // Log any errors to the console
      }
    };

    getTasks();  // Call the function to fetch tasks
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Calculate task statistics whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      const tasksTodo = tasks.filter((task) => task.status === 'TODO').length;
      const tasksDoing = tasks.filter((task) => task.status === 'DOING').length;
      const tasksDone = tasks.filter((task) => task.status === 'DONE').length;
      const tasksPaused = tasks.filter((task) => task.status === 'PAUSED').length;
      const totalProjects = tasksTodo + tasksDoing + tasksDone + tasksPaused;

      setStats({
        tasksDone,
        tasksTodo,
        tasksDoing,
        tasksPaused,
        totalProjects,
      });
    }
  }, [tasks]);  // This effect runs whenever the 'tasks' state is updated

  // Render the widget with task statistics
  return (
    <div className="bg-zinc-900 rounded-xl p-4 lg:p-6">
      {/* Header section with title and options button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6">
        <h2 className="text-white font-semibold mb-2 sm:mb-0">Overall Information</h2>
        <div className="flex items-center gap-2">
          {/* Options button */}
          <button className="text-zinc-400 hover:text-white transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Display total tasks done and total projects */}
      <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 mb-4 lg:mb-6">
        <div>
          <span className="text-3xl lg:text-4xl font-bold text-orange-500">{stats.tasksDone}</span>
          <p className="text-sm text-zinc-400">Tasks done</p>
        </div>
        <div>
          <span className="text-3xl lg:text-4xl font-bold text-orange-500">{stats.totalProjects}</span>
          <p className="text-sm text-zinc-400">Projects</p>
        </div>
      </div>

      {/* Display tasks by their status */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-4">
        {/* To Do tasks */}
        <div className="bg-zinc-800 rounded-lg p-3 lg:p-4 text-center">
          <span className="text-xl lg:text-2xl font-bold text-white">{stats.tasksTodo}</span>
          <p className="text-xs lg:text-sm text-zinc-400">To Do</p>
        </div>

        {/* In Progress tasks */}
        <div className="bg-zinc-800 rounded-lg p-3 lg:p-4 text-center">
          <span className="text-xl lg:text-2xl font-bold text-white">{stats.tasksDoing}</span>
          <p className="text-xs lg:text-sm text-zinc-400">In Progress</p>
        </div>

        {/* Paused tasks */}
        <div className="bg-zinc-800 rounded-lg p-3 lg:p-4 text-center">
          <span className="text-xl lg:text-2xl font-bold text-white">{stats.tasksPaused}</span>
          <p className="text-xs lg:text-sm text-zinc-400">Paused</p>
        </div>
      </div>
    </div>
  );
}
