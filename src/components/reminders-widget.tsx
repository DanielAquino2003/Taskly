// ----------------------------------------------------------
// File: reminders-widget.tsx
// Author: Máximo Martín Moreno
// Description: This file defines the RemindersWidget component,
// which fetches and displays a list of quick reminder tasks from an API.
// ----------------------------------------------------------

"use client"; // Ensures this component is treated as client-side (Next.js specific directive)

import { useState, useEffect, useCallback } from "react";
import { MoreHorizontal } from "lucide-react"; // Icon component
import axios from "axios"; // Library for making HTTP requests

// Define the structure for Task objects
interface Task {
  id: number;
  due_date: string; // Due date as a string
  title: string;
}

// Component that displays a list of reminders
export function RemindersWidget() {
  const [tasks, setTasks] = useState<Task[]>([]); // State to hold the list of tasks
  const [authError, setAuthError] = useState<string | null>(null); // State for storing authentication errors

  // Fetch tasks from the API
  const getTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: `Token ${token}`, // Attach token to the request header
        },
      });

      if (response.status !== 200) {
        throw new Error("Error fetching tasks"); // Handle non-200 responses
      }

      setTasks(response.data); // Update state with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error); // Log errors to console
      setAuthError('Error fetching tasks. Please try again.'); // Set error message for the user
    }
  }, []);

  // Fetch tasks when the component mounts
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  // Sort tasks by due date and limit the number displayed to 5
  const sortedTasks = tasks
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()) // Sort by due date
    .slice(0, 5); // Display only the first 5 tasks

  // Render the component UI
  return (
    <div className="bg-zinc-900 rounded-xl p-4 lg:p-6"> {/* Container with custom styling */}
      <div className="flex justify-between items-center mb-4 lg:mb-6"> {/* Header section */}
        <h2 className="text-white font-semibold text-lg lg:text-xl">Quick Reminders</h2> {/* Title */}
        <button className="text-zinc-400 hover:text-white transition-colors"> {/* Settings button */}
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3 lg:space-y-4"> {/* List of reminders */}
        {authError && (
          <div className="text-red-500">{authError}</div> {/* Display authentication error if any */}
        )}
        {sortedTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3"> {/* Each task */}
            <div className="w-2 h-2 rounded-full bg-orange-500" /> {/* Indicator dot */}
            <span className="text-white text-sm lg:text-base">{task.title}</span> {/* Task title */}
          </div>
        ))}
      </div>
    </div>
  );
}
