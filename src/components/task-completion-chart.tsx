// ----------------------------------------------------------
// File: task-completion-chart.tsx
// Author: Máximo Martín Moreno
// Description: This file defines the TaskCompletionChart component,
// which fetches tasks and family data from an API and displays a bar chart.
// The chart shows the distribution of tasks by status for each family.
// ----------------------------------------------------------

'use client'; // Ensures this file is treated as a client-side component

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Define the structure of a task object
interface Task {
  id: string;                             // Unique identifier for the task
  title: string;                          // Title of the task
  family: string;                         // Family ID the task belongs to
  status: 'TODO' | 'DOING' | 'DONE' | 'PAUSED';  // Status of the task
}

// Define the structure of a family object
interface Family {
  id: string;                             // Unique identifier for the family
  title: string;                          // Name of the family
  color: string;                          // Color associated with the family
}

// Main component to display task completion chart
export function TaskCompletionChart() {
  const [tasks, setTasks] = useState<Task[]>([]);           // State to store tasks
  const [families, setFamilies] = useState<Family[]>([]);   // State to store families
  const [loading, setLoading] = useState(true);             // State to indicate loading status
  const [error, setError] = useState<string | null>(null);  // State to store error messages

  // Function to fetch tasks from the API
  const getTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");          // Retrieve authentication token
      const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Error fetching tasks");
      }

      setTasks(response.data);                              // Store fetched tasks in state
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError('Error fetching tasks. Please try again.');
    }
  }, []);

  // Function to fetch families from the API
  const fetchFamilies = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");          // Retrieve authentication token
      const response = await axios.get("http://127.0.0.1:8000/api/family/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Error fetching families");
      }

      setFamilies(response.data);                           // Store fetched families in state
    } catch (error) {
      console.error("Error fetching families:", error);
      setError('Error fetching families. Please try again.');
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);                                      // Set loading state
      await Promise.all([getTasks(), fetchFamilies()]);      // Fetch tasks and families concurrently
      setLoading(false);                                     // Reset loading state
    };

    fetchData();
  }, [getTasks, fetchFamilies]);

  // Process data to generate chart data
  const processData = useCallback(() => {
    const statusOrder = ['TODO', 'DOING', 'PAUSED', 'DONE']; // Define the order of statuses for the chart
    return statusOrder.map(status => {
      const dataPoint: { [key: string]: number | string } = { status };
      families.forEach(family => {
        const tasksCount = tasks.filter(task => task.family === family.id && task.status === status).length;
        dataPoint[family.id] = tasksCount;        // Count tasks per family and status
      });
      return dataPoint;
    });
  }, [tasks, families]);

  // Display loading or error state if applicable
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const data = processData();         // Generate chart data

  // Map Tailwind CSS color classes to hex values for chart display
  const getColorFromTailwind = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-red-500': '#ef4444',
      'bg-blue-500': '#3b82f6',
      'bg-green-500': '#22c55e',
      'bg-yellow-500': '#eab308',
      'bg-purple-500': '#a855f7',
      'bg-pink-500': '#ec4899',
      'bg-indigo-500': '#6366f1',
      'bg-teal-500': '#14b8a6'
    };
    return colorMap[color] || color;    // Fallback to provided color if not mapped
  };

  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-white">Tasks by Family and Status</CardTitle> {/* Chart title */}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={Object.fromEntries(families.map(family => [
            family.id,
            {
              label: family.title,
              color: getColorFromTailwind(family.color),
            }
          ]))}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="status"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              {families.map((family) => (
                <Bar
                  key={family.id}
                  dataKey={family.id}
                  stackId="a"
                  fill={getColorFromTailwind(family.color)}
                  name={family.title}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
