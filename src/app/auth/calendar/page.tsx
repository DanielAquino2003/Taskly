'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getTasks, getFamilies, Task, Family } from '../lib/api'

interface CalendarDay {
  date: Date
  tasks: Task[]
  isCurrentMonth: boolean
}

const getDaysInMonth = (year: number, month: number, tasks: Task[]): CalendarDay[] => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const result: CalendarDay[] = []

  const firstDayOfWeek = firstDay.getDay()
  
  for (let i = 1; i < firstDayOfWeek; i++) {
    const date = new Date(year, month, 1 - i)
    result.unshift({ date, tasks: [], isCurrentMonth: false })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    const dayTasks = tasks.filter(task => new Date(task.fecha).toDateString() === date.toDateString())
    result.push({ date, tasks: dayTasks, isCurrentMonth: true })
  }

  const daysFromNextMonth = 42 - result.length
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const date = new Date(year, month + 1, i)
    result.push({ date, tasks: [], isCurrentMonth: false })
  }

  return result
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [tasks, setTasks] = useState<Task[]>([])
  const [families, setFamilies] = useState<Family[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, familiesData] = await Promise.all([getTasks(), getFamilies()])
        setTasks(tasksData)
        setFamilies(familiesData)
      } catch (error) {
        console.error("Error fetching data:", error)
        // Here you could set an error state and display it to the user
      }
    }
    fetchData()
  }, [])

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth(), tasks)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  return (
    <div className="bg-zinc-900 rounded-xl p-4 lg:p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="default" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 lg:gap-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-center text-xs lg:text-sm font-medium text-zinc-400 py-1 lg:py-2">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square p-1 lg:p-2 rounded-lg",
              day.isCurrentMonth ? "bg-zinc-800" : "bg-zinc-800/50",
              isToday(day.date) && "bg-blue-1000 ring-2 ring-orange-400",
              "flex flex-col gap-1"
            )}
          >
            <span className={cn(
              "text-xs lg:text-sm font-medium",
              day.isCurrentMonth ? "text-white" : "text-zinc-500",
              isToday(day.date) && "text-blue-200 font-bold"
            )}>
              {day.date.getDate()}
            </span>
            <div className="flex flex-wrap gap-1">
              {day.tasks.map((task) => {
                const family = families.find(f => f.id === Number(task.family))
                return (
                  <Badge
                    key={task.id}
                    variant="secondary"
                    className={cn(
                      "text-[0.6rem] lg:text-xs font-medium px-1 py-0",
                      family ? family.color : 'bg-gray-500',
                      family?.color.startsWith('bg-zinc') || family?.color.startsWith('bg-gray') ? 'text-white' : 'text-zinc-900'
                    )}
                  >
                    {task.title}
                  </Badge>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

