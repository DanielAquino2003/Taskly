// ----------------------------------------------------------
// File: QuickTask-create-dialog.tsx
// Author: Máximo Martín Moreno
// Description: This file defines the CreateQuickTaskDialog component,
// which provides a modal form to create a new quick task. 
// The task is sent to an API and updates the task list upon creation.
// ----------------------------------------------------------

'use client'; // Ensures this file is treated as a client-side component

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

// Define the props for the CreateQuickTaskDialog component
interface CreateQuickTaskDialogProps {
  open: boolean;                          // Whether the dialog is open
  onOpenChange: (open: boolean) => void;  // Function to handle dialog open state changes
  onTaskCreated: () => void;              // Callback function after a task is successfully created
  setAuthError: (error: string) => void;  // Function to set an error message
}

export function CreateQuickTaskDialog({ open, onOpenChange, onTaskCreated, setAuthError }: CreateQuickTaskDialogProps) {
  
  // Reference to access the input field's value directly
  const titleRef = React.useRef<HTMLInputElement>(null);

  // Handle form submission to create a new task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const title = titleRef.current?.value; // Get the task title from the input field

    try {
      const token = localStorage.getItem("token"); // Retrieve the authentication token from localStorage

      // Send a POST request to the API to create a new task
      const response = await axios.post(
        "http://127.0.0.1:8000/api/quickTasks/",
        {
          title,                                          // Task title
          creator: localStorage.getItem("user_id"),       // Task creator ID
          type: "DAY",                                    // Set task type to "DAY"
        },
        {
          headers: {
            'Authorization': `Token ${token}`,            // Authorization header with token
          },
        }
      );

      console.log('Task created:', response.data);
      onTaskCreated();              // Trigger the callback to refresh the task list
      onOpenChange(false);          // Close the dialog after task creation
    } catch (error) {
      console.error('Error creating task:', error);
      setAuthError('Failed to add a new task. Please try again.'); // Set an error message
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Quick Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input field for the task title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              ref={titleRef}
              className="bg-zinc-800 border-zinc-700 text-white"
              required              // Ensure the field is not empty
            />
          </div>

          {/* Buttons to cancel or submit the form */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}    // Close the dialog on cancel
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Create Quick Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
