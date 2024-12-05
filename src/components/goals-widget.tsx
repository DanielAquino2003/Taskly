// ----------------------------------------------------------
// File: goals-widget.tsx
// Author: Máximo Martín Moreno
// Description: This file defines the GoalsWidget component, responsible for displaying
// and managing quick goals of type "MONTH" in the task management web application.
// It includes functionalities to view, add, select, and delete tasks.
// ----------------------------------------------------------

'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateGoalDialog } from "./goal-create-dialog";

interface QuickTask {
  id: number;
  title: string;
  completed: boolean;  // Indicates if the task is completed
  type: string;  // Task type: "DAY" or "MONTH"
}

export function GoalsWidget() {
  const [quickTasks, setQuickTasks] = useState<QuickTask[]>([]);  // Stores the list of quick tasks
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());  // Tracks selected tasks
  const [error, setError] = useState<string | null>(null);  // Stores error messages
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // Controls the visibility of the goal creation dialog

  // Function to fetch quick tasks from the API
  const fetchQuickTasks = async () => {
    try {
      const token = localStorage.getItem("token");  // Retrieve authentication token from local storage
      const response = await axios.get("http://127.0.0.1:8000/api/quickTasks/", {
        headers: {
          Authorization: `Token ${token}`,  // Include token in the request header for authentication
        },
      });
      // Filter tasks to only include those of type "MONTH"
      const filteredTasks = response.data.filter((task: QuickTask) => task.type === "MONTH");
      setQuickTasks(filteredTasks);  // Update the state with the filtered tasks
    } catch (err) {
      console.error("Error fetching Quick Tasks:", err);  // Log any errors that occur during the fetch
      setError("Failed to fetch Quick Tasks. Please try again.");  // Set an error message
    }
  };

  // Fetch quick tasks when the component mounts
  useEffect(() => {
    fetchQuickTasks();
  }, []);

  // Function to handle the creation of a new task
  const handleTaskCreated = () => {
    fetchQuickTasks();  // Refresh the task list after a new task is created
  };

  // Handles task selection (checkbox toggle)
  const handleTaskSelection = (taskId: number) => {
    setSelectedTasks((prevSelectedTasks) => {
      const updatedSelectedTasks = new Set(prevSelectedTasks);
      if (updatedSelectedTasks.has(taskId)) {
        updatedSelectedTasks.delete(taskId);  // Deselect if already selected
      } else {
        updatedSelectedTasks.add(taskId);  // Select the task
      }
      return updatedSelectedTasks;  // Update the selected tasks state
    });
  };

  // Function to delete selected tasks
  const handleDeleteSelectedTasks = async () => {
    try {
      const token = localStorage.getItem("token");  // Retrieve authentication token
      // Loop through selected tasks and send delete requests
      for (const taskId of selectedTasks) {
        await axios.delete(`http://127.0.0.1:8000/api/quickTasks/${taskId}/`, {
          headers: {
            Authorization: `Token ${token}`,  // Include token in the request header
          },
        });
      }
      setSelectedTasks(new Set());  // Clear the selected tasks
      fetchQuickTasks();  // Refresh the task list after deletion
    } catch (error) {
      console.error("Error deleting tasks:", error);  // Log any errors during deletion
      setError("Failed to delete selected tasks. Please try again.");  // Set an error message
    }
  };

  // Render the GoalsWidget component
  return (
    <Card className="bg-zinc-900">  {/* Card container with dark background */}
      <CardHeader className="flex flex-row items-center justify-between">  {/* Header section */}
        <CardTitle className="text-lg lg:text-xl text-white">Goals</CardTitle>  {/* Title of the widget */}
        <Button
          size="sm"
          variant="default"
          onClick={() => setIsDialogOpen(true)}  // Open the dialog to add a new goal
        >
          <PlusCircle className="h-4 w-4 mr-2" />  {/* Add icon */}
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        {/* Display an error message if there is an error */}
        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error}
          </div>
        )}
        {/* Display the list of quick tasks */}
        <ul className="space-y-2 lg:space-y-3">
          {quickTasks.length > 0 ? (
            quickTasks.map((task) => (
              <li key={task.id} className="flex items-center text-white">
                {/* Checkbox to select/deselect a task */}
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedTasks.has(task.id)}  // Check if the task is selected
                  onChange={() => handleTaskSelection(task.id)}  // Handle selection change
                />
                <span
                  className={`text-sm lg:text-base ${
                    task.completed ? "line-through text-gray-400" : ""  // Style for completed tasks
                  }`}
                >
                  {task.title}  {/* Display task title */}
                </span>
              </li>
            ))
          ) : (
            <li className="text-white text-sm lg:text-base">
              No goals available.  {/* Message if no goals are available */}
            </li>
          )}
        </ul>

        {/* Display delete button if there are selected tasks */}
        {selectedTasks.size > 0 && (
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={handleDeleteSelectedTasks}  // Handle task deletion
              className="bg-orange-500 hover:bg-orange-600"
            >
              Delete Selected Goals  {/* Button to delete selected tasks */}
            </Button>
          </div>
        )}
      </CardContent>

      {/* Dialog for creating new goals */}
      <CreateGoalDialog
        open={isDialogOpen}  // Control the dialog's visibility
        onOpenChange={setIsDialogOpen}  // Callback when the dialog's open state changes
        onTaskCreated={handleTaskCreated}  // Callback when a new task is created
        setAuthError={setError}  // Callback to set error messages
      />
    </Card>
  );
}
