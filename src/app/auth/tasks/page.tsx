'use client'

import { useState, useEffect, useCallback } from "react"
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { TaskDialog } from '@/components/task-dialog'
import { CreateTaskDialog } from '@/components/create-task-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios from 'axios'

interface Task {
  id: string
  title: string
  fecha: string
  hora: string
  location: string
  description: string
  family: string | null
  status: 'TODO' | 'DOING' | 'DONE' | 'PAUSED'
  puntosDeExperiencia: number
}

interface Family {  
  id: number
  name: string
  color?: string
}

const statusConfig = {
  TODO: { title: 'To Do', borderColor: 'border-red-500' },
  DOING: { title: 'Doing', borderColor: 'border-purple-500' },
  DONE: { title: 'Done', borderColor: 'border-green-500' },
  PAUSED: { title: 'Paused', borderColor: 'border-blue-500' }
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()
  const [families, setFamilies] = useState<Family[]>([])


  const fetchFamilies = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://127.0.0.1:8000/api/family/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      if (response.status !== 200) {
        throw new Error("Error fetching families")
      }

      setFamilies(response.data)
    } catch (error) {
      console.error("Error fetching families:", error)
      setAuthError('Error fetching families. Please try again.')
    }
  }, [])

  const getTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      if (response.status !== 200) {
        throw new Error("Error fetching tasks")
      }

      setTasks(response.data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setAuthError('Error fetching tasks. Please try again.')
    }
  }, [])

  useEffect(() => {
    fetchFamilies()
    getTasks()
  }, [fetchFamilies, getTasks])

  const handleDialogOpen = async () =>{
    getTasks()
    fetchFamilies()
    setCreateDialogOpen(true)
  }

  const handleStatusChange = async (taskId: string, newStatus: 'TODO' | 'DOING' | 'DONE' | 'PAUSED') => {
    try {
      const token = localStorage.getItem("token")
      const task = tasks.find(t => t.id === taskId)
      if (!task) {
        throw new Error("Task not found")
      }
      const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, 
        { ...task, status: newStatus },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      const updatedTask = response.data
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ))
      setDialogOpen(false)
    } catch (error) {
      console.error("Error updating task status:", error)
      setAuthError('Error updating task status. Please try again.')
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      setTasks(tasks.filter(task => task.id !== taskId))
      setDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error deleting task:", error)
      setAuthError('Error deleting task. Please try again.')
    }
  }

  const onTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = []
    }
    acc[task.status].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">My Tasks</h1>
        <Button 
          onClick={() => handleDialogOpen()}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {authError && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">
          {authError}
        </div>
      )}

      <div className="grid grid-cols-4 gap-6 flex-1 min-h-0">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => (
          <div key={status} className="flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                {statusConfig[status].title}
              </h2>
              <div className={cn(
                "h-1 w-24 rounded",
                status === 'TODO' && "bg-red-500",
                status === 'DOING' && "bg-purple-500",
                status === 'DONE' && "bg-green-500",
                status === 'PAUSED' && "bg-blue-500"
              )} />
            </div>
            <div className="space-y-4 overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
              {groupedTasks[status]?.map((task) => (
                <Card 
                  key={task.id}
                  className={cn(
                    "p-4 bg-zinc-900 border-2 cursor-pointer transition-colors hover:bg-zinc-800",
                    statusConfig[status].borderColor
                  )}
                  onClick={() => {
                    setSelectedTask(task)
                    setDialogOpen(true)
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white">{task.title}</h3>
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      families.find(f => f.id === Number(task.family))?.color || "bg-gray-400"
                    )} />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    {task.fecha}
                  </div>
                  <div className="text-sm font-medium text-zinc-300 mb-1">
                    {task.location}
                  </div>
                  <div className="text-sm text-zinc-400 line-clamp-2">
                    {task.description}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskDialog
        task={selectedTask}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteTask}
        onTaskUpdated={onTaskUpdated}
      />

      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onTaskCreated={() => {
          getTasks();
          fetchFamilies();
        }}
        setAuthError={setAuthError}
      />
    </div>
  )
}

