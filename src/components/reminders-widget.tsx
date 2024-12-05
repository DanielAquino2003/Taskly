"use client"; // Asegúrate de que este archivo es tratado como componente del lado del cliente

import { useState, useEffect, useCallback } from "react";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";

// Definir el tipo adecuado para las tareas
interface Task {
  id: number;
  due_date: string; // Puede ser una fecha como string
  title: string;
}

export function RemindersWidget() {
  const [tasks, setTasks] = useState<Task[]>([]); // Tipado correcto para las tareas
  const [authError, setAuthError] = useState<string | null>(null); // authError puede ser string o null

  const getTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Error fetching tasks");
      }

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setAuthError('Error fetching tasks. Please try again.');
    }
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const sortedTasks = tasks
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()) // Aseguramos que las fechas sean comparables
    .slice(0, 5);

  return (
    <div className="bg-zinc-900 rounded-xl p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4 lg:mb-6">
        <h2 className="text-white font-semibold text-lg lg:text-xl">Quick reminders</h2>
        <button className="text-zinc-400 hover:text-white transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-3 lg:space-y-4">
        {authError && (
          <div className="text-red-500">{authError}</div>
        )}
        {sortedTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-white text-sm lg:text-base">{task.title}</span> {/* Usar 'title' si está presente en las tareas */}
          </div>
        ))}
      </div>
    </div>
  );
}
