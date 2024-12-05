'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Timer() {
  const [seconds, setSeconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000)
    } else {
      if (interval) {
        clearInterval(interval)
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning((prev) => !prev)
  }

  const handleReset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-white">Timer</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-white text-4xl">{seconds}s</div>
        <div className="mt-4 space-x-2">
          <Button onClick={handleStartStop} className="w-24">
            {isRunning ? 'Stop' : 'Start'}
          </Button>
          <Button onClick={handleReset} className="w-24">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
