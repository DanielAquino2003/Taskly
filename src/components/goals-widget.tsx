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
  completed: boolean; // Estado de la tarea
  type: string; // Tipo de la tarea: "DAY" o "MONTH"
}

export function GoalsWidget() {
  const [quickTasks, setQuickTasks] = useState<QuickTask[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set()); // Estado para las tareas seleccionadas
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch Quick Tasks from API
  const   fetchQuickTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/quickTasks/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // Filtrar tareas de tipo "DAY"
      const filteredTasks = response.data.filter((task: QuickTask) => task.type === "MONTH");
      setQuickTasks(filteredTasks);
    } catch (err) {
      console.error("Error fetching Quick Tasks:", err);
      setError("Failed to fetch Quick Tasks. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuickTasks();
  }, []);

  const handleTaskCreated = () => {
    fetchQuickTasks(); // Refrescar la lista de tareas tras crear una nueva
  };

  // Maneja la selección de una tarea (checkbox)
  const handleTaskSelection = (taskId: number) => {
    setSelectedTasks((prevSelectedTasks) => {
      const updatedSelectedTasks = new Set(prevSelectedTasks);
      if (updatedSelectedTasks.has(taskId)) {
        updatedSelectedTasks.delete(taskId);
      } else {
        updatedSelectedTasks.add(taskId);
      }
      return updatedSelectedTasks;
    });
  };

  // Handler para eliminar tareas seleccionadas
  const handleDeleteSelectedTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      // Eliminar las tareas seleccionadas
      for (const taskId of selectedTasks) {
        await axios.delete(`http://127.0.0.1:8000/api/quickTasks/${taskId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
      // Refrescar las tareas después de la eliminación
      setSelectedTasks(new Set()); // Limpiar las tareas seleccionadas
      fetchQuickTasks(); // Refrescar la lista de tareas
    } catch (error) {
      console.error("Error deleting tasks:", error);
      setError("Failed to delete selected tasks. Please try again.");
    }
  };

  return (
    <Card className="bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg lg:text-xl text-white">Goals</CardTitle>
        <Button
          size="sm"
          variant="default"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error}
          </div>
        )}
        <ul className="space-y-2 lg:space-y-3">
          {quickTasks.length > 0 ? (
            quickTasks.map((task) => (
              <li key={task.id} className="flex items-center text-white">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedTasks.has(task.id)} // Mostrar si está seleccionada
                  onChange={() => handleTaskSelection(task.id)} // Cambiar selección
                />
                <span
                  className={`text-sm lg:text-base ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              </li>
            ))
          ) : (
            <li className="text-white text-sm lg:text-base">
              No goals available.
            </li>
          )}
        </ul>

        {selectedTasks.size > 0 && (
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={handleDeleteSelectedTasks} // Eliminar tareas seleccionadas
              className="bg-orange-500 hover:bg-orange-600"
            >
              Delete Selected Goals
            </Button>
          </div>
        )}
      </CardContent>

      {/* Integración del diálogo */}
      <CreateGoalDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onTaskCreated={handleTaskCreated}
        setAuthError={setError}
      />

    </Card>
  );
}
