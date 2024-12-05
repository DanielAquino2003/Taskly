'use client'

import React, {  } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"

interface CreateQuickTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTaskCreated: () => void
  setAuthError: (error: string) => void
}

export function CreateQuickTaskDialog({ open, onOpenChange, onTaskCreated, setAuthError }: CreateQuickTaskDialogProps) {

  const titleRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const title = titleRef.current?.value

    console.log(title)

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("http://127.0.0.1:8000/api/quickTasks/", {
        title,
        creator: localStorage.getItem("user_id"),
        type: "DAY"
      }, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })

      console.log('response:', response.data)
      onTaskCreated()
      onOpenChange(false)
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error)
      setAuthError('Error al agregar una nueva tarea. Por favor, intente nuevamente.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Quick Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              ref={titleRef}
              className="bg-zinc-800 border-zinc-700 text-white"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
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
  )
}
