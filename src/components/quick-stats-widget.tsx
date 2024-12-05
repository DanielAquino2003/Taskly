// ----------------------------------------------------------
// File: quick-stats-widget.tsx
// Author: Máximo Martín Moreno
// Description: This file defines the QuickStatsWidget component,
// which fetches tasks and displays quick statistics such as
// the number of completed tasks, remaining tasks, active tasks,
// the time margin from the last task, and the completion percentage.
// ----------------------------------------------------------

'use client' // Ensures this file is treated as a client-side component

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'

// Define an interface for the task
interface Task {
  id: number
  title: string
  status: 'TODO' | 'DOING' | 'DONE' | 'PAUSED'
  date: string
}

export function QuickStatsWidget() {
  // State for storing tasks and statistics
  const [tasks, setTasks] = useState<Task[]>([]) // Array to store tasks
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    tasksRemaining: 0,
    tasksActive: 0,
    marginDays: 0,
    completionPercentage: 0,
  })

  // Fetch tasks from the API
  useEffect(() => {
    const getTasks = async () => {
      try {
        const token = localStorage.getItem("token") // Assuming there is a token in localStorage
        const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
          headers: {
            Authorization: `Token ${token}`, // Set Authorization header with token
          },
        })

        if (response.status === 200) {
          setTasks(response.data) // Store tasks in state if request is successful
        }
      } catch (error) {
        console.error("Error fetching tasks:", error) // Log error if fetching tasks fails
      }
    }

    getTasks() // Call the function to get tasks when the component mounts
  }, [])

  // Calculate statistics based on fetched tasks
  useEffect(() => {
    if (tasks.length > 0) {
      // Calculate the number of tasks in each category (Completed, Remaining, Active)
      const tasksCompleted = tasks.filter((task) => task.status === 'DONE').length
      const tasksRemaining = tasks.filter((task) => task.status !== 'DONE').length
      const tasksActive = tasks.filter((task) => task.status !== 'PAUSED').length

      // Calculate the margin of days between the last task and today's date
      const taskDates = tasks.map((task) => new Date(task.date)) // Convert task dates to Date objects
      const latestTaskDate = new Date(Math.max(...taskDates.map(date => date.getTime()))) // Get the latest task date
      const currentDate = new Date() // Get today's date

      // If no valid date exists, set marginDays to 0
      const marginDays = latestTaskDate.getTime() ? (currentDate.getTime() - latestTaskDate.getTime()) / (1000 * 3600 * 24) : 0

      // Calculate the percentage of tasks that are completed
      const completionPercentage = (tasksCompleted / tasks.length) * 100

      // Update the statistics state with the calculated values
      setStats({
        tasksCompleted,
        tasksRemaining,
        tasksActive,
        marginDays: marginDays || 0, // Ensure no NaN values are set for marginDays
        completionPercentage: isNaN(completionPercentage) ? 0 : completionPercentage, // Ensure no NaN values for completionPercentage
      })
    }
  }, [tasks]) // Recalculate stats whenever the tasks change

  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl text-white">Quick Stats</CardTitle> {/* Display title of the widget */}
      </CardHeader>
      <CardContent>
        {/* Display statistics */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          <div className="text-center">
            <p className="text-xl lg:text-2xl font-bold text-orange-500">{stats.completionPercentage.toFixed(1)}%</p>
            <p className="text-xs lg:text-sm text-zinc-400">Tasks Completed</p>
          </div>
          <div className="text-center">
            <p className="text-xl lg:text-2xl font-bold text-orange-500">{stats.tasksRemaining}</p>
            <p className="text-xs lg:text-sm text-zinc-400">Tasks Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-xl lg:text-2xl font-bold text-orange-500">{stats.tasksActive}</p>
            <p className="text-xs lg:text-sm text-zinc-400">Tasks Active</p>
          </div>
          <div className="text-center">
            <p className="text-xl lg:text-2xl font-bold text-orange-500">{stats.marginDays.toFixed(1)}d</p>
            <p className="text-xs lg:text-sm text-zinc-400">Time Margin (Last Task to Today)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
