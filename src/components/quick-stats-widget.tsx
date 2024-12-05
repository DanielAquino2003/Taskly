'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'

// Definir una interfaz para la tarea
interface Task {
  id: number
  title: string
  status: 'TODO' | 'DOING' | 'DONE' | 'PAUSED'
  date: string // Fecha de creación de la tarea
}

export function QuickStatsWidget() {
  const [tasks, setTasks] = useState<Task[]>([]) // Almacenar las tareas
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    tasksRemaining: 0,
    tasksActive: 0,
    marginDays: 0,
    completionPercentage: 0,
  })

  // Obtener tareas
  useEffect(() => {
    const getTasks = async () => {
      try {
        const token = localStorage.getItem("token") // Asumiendo que tienes un token en el localStorage
        const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })

        if (response.status === 200) {
          setTasks(response.data)
        }
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    getTasks()
  }, [])

  // Calcular estadísticas basadas en las tareas obtenidas
  useEffect(() => {
    if (tasks.length > 0) {
      const tasksCompleted = tasks.filter((task) => task.status === 'DONE').length
      const tasksRemaining = tasks.filter((task) => task.status !== 'DONE').length
      const tasksActive = tasks.filter((task) => task.status !== 'PAUSED').length

      // Calcular el margen de días entre el día actual y la última tarea
      const taskDates = tasks.map((task) => new Date(task.date))
      const latestTaskDate = new Date(Math.max(...taskDates.map(date => date.getTime())))
      const currentDate = new Date()

      // Si no hay tareas o la última tarea no tiene una fecha válida, asignar 0 días
      const marginDays = latestTaskDate.getTime() ? (currentDate.getTime() - latestTaskDate.getTime()) / (1000 * 3600 * 24) : 0

      // Calcular el porcentaje de tareas completadas
      const completionPercentage = (tasksCompleted / tasks.length) * 100

      setStats({
        tasksCompleted,
        tasksRemaining,
        tasksActive,
        marginDays: marginDays || 0, // Asegurar que no haya NaN
        completionPercentage: isNaN(completionPercentage) ? 0 : completionPercentage, // Asegurar que no haya NaN
      })
    }
  }, [tasks])

  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl text-white">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
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
