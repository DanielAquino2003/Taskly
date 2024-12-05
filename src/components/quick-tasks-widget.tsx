// ----------------------------------------------------------
// File: quick-tasks-widget.tsx
// Author: Máximo Martín Moreno
// Description: This file defines the QuickTasksWidget component,
// which fetches and displays quick tasks from an API. It allows 
// users to create, select, and delete tasks dynamically.
// ----------------------------------------------------------

'use client'; // Ensures this file is treated as a client-side component

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateQuickTaskDialog } from "./QuickTask-create-dialog";

// Define the structure of a QuickTask object
interface QuickTask {
  id: number;                // Unique identifier for each task
  title: string;             // Title or name of the task
  completed: boolean;        // Completion status of the task
  type: string;              // Type of the task, "DAY" or "MONTH"
}

export function QuickTasksWidget() {
  const [quickTasks, setQuickTasks] = useState<QuickTask[]>([]);   // State to store quick tasks
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());  // Selected tasks for deletion
  const [error, setError] = useState<string | null>(null);         // Error state for handling fetch or delete errors
  const [isDialogOpen, setIsDialogOpen] = useState(false);         // State to control the create task dialog

  // Fetch quick tasks from the API
  const fetchQuickTasks = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.get("http://127.0.0.1:8000/api/quickTasks/", {
        headers: {
          Authorization: `Token ${token}`,  // Authorization header
        },
      });
      // Filter tasks to show only those of type "DAY"
      const filteredTasks = response.data.filter((task: QuickTask) => task.type === "DAY");
      setQuickTasks(filteredTasks); // Update the quickTasks state
    } catch (err) {
      console.error("Error fetching Quick Tasks:", err);
      setError("Failed to fetch Quick Tasks. Please try again."); // Set error message
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchQuickTasks();
  }, []);

  // Refresh tasks list after creating a new task
  const handleTaskCreated = () => {
    fetchQuickTasks();
  };

  // Handle task selection for deletion
  const handleTaskSelection = (taskId: number) => {
    setSelectedTasks((prevSelectedTasks) => {
      const updatedSelectedTasks = new Set(prevSelectedTasks);
      // Toggle selection: add or remove the task ID from the set
      if (updatedSelectedTasks.has(taskId)) {
        updatedSelectedTasks.delete(taskId);
      } else {
        updatedSelectedTasks.add(taskId);
      }
      return updatedSelectedTasks;
    });
  };

  // Handle deletion of selected tasks
  const handleDeleteSelectedTasks = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      // Iterate through selected tasks and delete each one
      for (const taskId of selectedTasks) {
        await axios.delete(`http://127.0.0.1:8000/api/quickTasks/${taskId}/`, {
          headers: {
            Authorization: `Token ${token}`, // Authorization header
          },
        });
      }
      setSelectedTasks(new Set()); // Clear the selected tasks
      fetchQuickTasks(); // Refresh the tasks list
    } catch (error) {
      console.error("Error deleting tasks:", error);
      setError("Failed to delete selected tasks. Please try again."); // Set error message
    }
  };

  return (
    <Card className="bg-zinc-900">
      {/* Header with title and button to open the create task dialog */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg lg:text-xl text-white">Quick Tasks</CardTitle>
        <Button
          size="sm"
          variant="default"
          onClick={() => setIsDialogOpen(true)} // Open the create task dialog
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </CardHeader>

      <CardContent>
        {/* Display an error message if there is an error */}
        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error}
          </div>
        )}
        {/* List of quick tasks */}
        <ul className="space-y-2 lg:space-y-3">
          {quickTasks.length > 0 ? (
            quickTasks.map((task) => (
              <li key={task.id} className="flex items-center text-white">
                {/* Checkbox for selecting tasks */}
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedTasks.has(task.id)} // Reflect selection status
                  onChange={() => handleTaskSelection(task.id)} // Handle task selection
                />
                {/* Display task title with conditional styling if completed */}
                <span
                  className={`text-sm lg:text-base ${
                    task.completed ? "line-through text-gray-400" : "" // Strike-through if task is completed
                  }`}
                >
                  {task.title}
                </span>
              </li>
            ))
          ) : (
            // Message if no tasks are available
            <li className="text-white text-sm lg:text-base">
              No quick tasks available.
            </li>
          )}
        </ul>

        {/* Button to delete selected tasks, shown only if tasks are selected */}
        {selectedTasks.size > 0 && (
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={handleDeleteSelectedTasks} // Delete selected tasks
              className="bg-orange-500 hover:bg-orange-600"
            >
              Delete Selected Tasks
            </Button>
          </div>
        )}
      </CardContent>

      {/* Integration with the task creation dialog component */}
      <CreateQuickTaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onTaskCreated={handleTaskCreated}
        setAuthError={setError}
      />
    </Card>
  );
}
