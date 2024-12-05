// ----------------------------------------------------------
// File: goal-create-dialog.tsx
// Author: Máximo Martín Moreno
// Description: This file defines the CreateGoalDialog component,
// which provides a dialog interface for creating new quick tasks (goals).
// It interacts with an API to add new goals and manages user input.
// ----------------------------------------------------------

'use client';

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

// Define the structure for the dialog's props
interface CreateGoalDialogProps {
  open: boolean;  // Controls whether the dialog is open
  onOpenChange: (open: boolean) => void;  // Callback when dialog open state changes
  onTaskCreated: () => void;  // Callback after a new task is successfully created
  setAuthError: (error: string) => void;  // Callback to set authentication errors
}

// Component to create a new quick task (goal)
export function CreateGoalDialog({ open, onOpenChange, onTaskCreated, setAuthError }: CreateGoalDialogProps) {
  const titleRef = React.useRef<HTMLInputElement>(null);  // Reference for the task title input

  // Handle form submission to create a new task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent the default form submission behavior

    const title = titleRef.current?.value;  // Get the task title from the input field

    try {
      const token = localStorage.getItem("token");  // Retrieve authentication token from local storage
      // Send a POST request to the API to create a new task
      const response = await axios.post(
        "http://127.0.0.1:8000/api/quickTasks/",  // API endpoint for quick tasks
        {
          title,
          creator: localStorage.getItem("user_id"),  // Include the user ID as the task creator
          type: "MONTH",  // Set the task type to "MONTH"
        },
        {
          headers: {
            'Authorization': `Token ${token}`,  // Include the token in the request header for authentication
          },
        }
      );

      console.log('response:', response.data);  // Log the response data for debugging
      onTaskCreated();  // Trigger the callback to refresh the task list
      onOpenChange(false);  // Close the dialog
    } catch (error) {
      console.error('Error performing POST request:', error);  // Log any errors that occur during the request
      setAuthError('Failed to add a new task. Please try again.');  // Set an error message for the user
    }
  };

  // Render the dialog component
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 text-white max-w-lg">  {/* Dialog container with custom styles */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Quick Task</DialogTitle>  {/* Dialog title */}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">  {/* Form to create a new task */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>  {/* Label for the task title input */}
            <Input
              id="title"
              ref={titleRef}  {/* Reference to access the input's value */}
              className="bg-zinc-800 border-zinc-700 text-white"  {/* Input field with custom styles */}
              required  // Ensure the input is filled before submitting
            />
          </div>

          {/* Buttons to cancel or submit the form */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}  {/* Close the dialog without submitting */}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"  {/* Submit button with styles */}
            >
              Create Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
