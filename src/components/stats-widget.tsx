'use client'

import { useState, useEffect } from 'react'
import { MoreHorizontal } from 'lucide-react'
import axios from 'axios'

// Definir una interfaz para el tipo de tarea
interface Task {
  id: number
  title: string
  status: 'TODO' | 'DOING' | 'DONE' | 'PAUSED'
}

interface Stats {
  tasksDone: number
  tasksTodo: number
  tasksDoing: number
  tasksPaused: number
  totalProjects: number
}

export function StatsWidget() {
  const [tasks, setTasks] = useState<Task[]>([]) // Ahora 'tasks' tiene el tipo 'Task[]'
  const [stats, setStats] = useState<Stats>({
    tasksDone: 0,
    tasksTodo: 0,
    tasksDoing: 0,
    tasksPaused: 0,
    totalProjects: 0,
  })

  // Función para obtener las tareas desde la API
  useEffect(() => {
    const getTasks = async () => {
      try {
        const token = localStorage.getItem("token") // Asumiendo que tienes un token en el localStorage
        const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })

        if (response.status !== 200) {
          throw new Error("Error fetching tasks")
        }

        setTasks(response.data) // Ahora 'response.data' es un array de 'Task'
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    getTasks()
  }, [])

  // Función para actualizar las estadísticas basadas en las tareas obtenidas
  useEffect(() => {
    if (tasks.length > 0) {
      const tasksTodo = tasks.filter((task) => task.status === 'TODO').length
      const tasksDoing = tasks.filter((task) => task.status === 'DOING').length
      const tasksDone = tasks.filter((task) => task.status === 'DONE').length
      const tasksPaused = tasks.filter((task) => task.status === 'PAUSED').length
      const totalProjects = tasksTodo + tasksDoing + tasksDone + tasksPaused

      setStats({
        tasksDone,
        tasksTodo,
        tasksDoing,
        tasksPaused,
        totalProjects,
      })
    }
  }, [tasks]) // Se ejecuta cada vez que las tareas cambian

  return (
    <div className="bg-zinc-900 rounded-xl p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6">
        <h2 className="text-white font-semibold mb-2 sm:mb-0">Overall Information</h2>
        <div className="flex items-center gap-2">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

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

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-4">
        <div className="bg-zinc-800 rounded-lg p-3 lg:p-4 text-center">
          <span className="text-xl lg:text-2xl font-bold text-white">{stats.tasksTodo}</span>
          <p className="text-xs lg:text-sm text-zinc-400">To Do</p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3 lg:p-4 text-center">
          <span className="text-xl lg:text-2xl font-bold text-white">{stats.tasksDoing}</span>
          <p className="text-xs lg:text-sm text-zinc-400">In Progress</p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3 lg:p-4 text-center">
          <span className="text-xl lg:text-2xl font-bold text-white">{stats.tasksPaused}</span>
          <p className="text-xs lg:text-sm text-zinc-400">Paused</p>
        </div>
      </div>
    </div>
  )
}
