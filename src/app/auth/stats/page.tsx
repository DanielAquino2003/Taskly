'use client'

import {  } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  Legend
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AnimatedSection } from "@/components/animated-section"

// Mock data for all charts
const taskStatusData = [
  { name: 'To Do', value: 10 },
  { name: 'Doing', value: 5 },
  { name: 'Done', value: 15 },
  { name: 'Paused', value: 3 },
]

const tasksCompletedOverTimeData = [
  { date: '2023-01', tasks: 5 },
  { date: '2023-02', tasks: 8 },
  { date: '2023-03', tasks: 12 },
  { date: '2023-04', tasks: 10 },
  { date: '2023-05', tasks: 15 },
  { date: '2023-06', tasks: 20 },
]

const taskCompletionRateData = [
  { month: 'Jan', rate: 0.75 },
  { month: 'Feb', rate: 0.68 },
  { month: 'Mar', rate: 0.80 },
  { month: 'Apr', rate: 0.82 },
  { month: 'May', rate: 0.85 },
  { month: 'Jun', rate: 0.88 },
]

const taskPriorityData = [
  { name: 'High', value: 15 },
  { name: 'Medium', value: 30 },
  { name: 'Low', value: 20 },
]

const tasksByProjectData = [
  { name: 'Project A', tasks: 20 },
  { name: 'Project B', tasks: 15 },
  { name: 'Project C', tasks: 10 },
  { name: 'Project D', tasks: 5 },
]

const productivityTrendData = [
  { week: 'Week 1', productivity: 70 },
  { week: 'Week 2', productivity: 75 },
  { week: 'Week 3', productivity: 72 },
  { week: 'Week 4', productivity: 80 },
  { week: 'Week 5', productivity: 85 },
  { week: 'Week 6', productivity: 82 },
]

const taskCompletionTimeData = [
  { range: '0-1 hour', tasks: 10 },
  { range: '1-2 hours', tasks: 15 },
  { range: '2-4 hours', tasks: 20 },
  { range: '4-8 hours', tasks: 12 },
  { range: '8+ hours', tasks: 5 },
]

const loginFrequencyData = [
  { day: 'Mon', logins: 3 },
  { day: 'Tue', logins: 5 },
  { day: 'Wed', logins: 4 },
  { day: 'Thu', logins: 6 },
  { day: 'Fri', logins: 4 },
  { day: 'Sat', logins: 2 },
  { day: 'Sun', logins: 1 },
]

const usageTimeData = [
  { date: '2023-06-01', minutes: 45 },
  { date: '2023-06-02', minutes: 60 },
  { date: '2023-06-03', minutes: 30 },
  { date: '2023-06-04', minutes: 75 },
  { date: '2023-06-05', minutes: 90 },
  { date: '2023-06-06', minutes: 50 },
  { date: '2023-06-07', minutes: 40 },
]

const productivityScoreData = [
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 80 },
  { month: 'Apr', score: 82 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 88 },
]

export default function StatsPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">

      {/* Overview Section */}
      <AnimatedSection>
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">Overview</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">33</div>
                <p className="text-xs text-zinc-400">+10% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">15</div>
                <p className="text-xs text-zinc-400">+25% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Experience Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">520</div>
                <p className="text-xs text-zinc-400">+18% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3</div>
                <p className="text-xs text-zinc-400">Same as last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Tasks Completed Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    tasks: {
                      label: "Tasks",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tasksCompletedOverTimeData}>
                      <XAxis 
                        dataKey="date" 
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
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="tasks" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Task Status Distribution</CardTitle>
                <CardDescription className="text-zinc-400">
                  Current status of all tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Tasks",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="hsl(var(--chart-1))"
                        label
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Task Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Average Completion Time</span>
                    <span className="text-white font-semibold">2.5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Tasks Completed Today</span>
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Weekly Completion Rate</span>
                    <span className="text-white font-semibold">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Most Active Team</span>
                    <span className="text-white font-semibold">ITUe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Team Tasks Completed</span>
                    <span className="text-white font-semibold">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Team Collaboration Score</span>
                    <span className="text-white font-semibold">92/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Experience Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Weekly XP Gained</span>
                    <span className="text-white font-semibold">120 XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Most XP Task</span>
                    <span className="text-white font-semibold">UI Design (50 XP)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">XP Progress to Next Level</span>
                    <span className="text-white font-semibold">75%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Task Statistics Section */}
      <AnimatedSection>
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">Task Statistics</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Task Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    rate: {
                      label: "Completion Rate",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={taskCompletionRateData}>
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value * 100}%`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="rate" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Task Priority Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Tasks",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskPriorityData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="hsl(var(--chart-2))"
                        label
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Tasks by Project</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    tasks: {
                      label: "Tasks",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tasksByProjectData}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="tasks" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Analytics Section */}
      <AnimatedSection>
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">Analytics</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Productivity Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    productivity: {
                      label: "Productivity Score",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={productivityTrendData}>
                      <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="productivity" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Task Completion Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    tasks: {
                      label: "Tasks",
                      color: "hsl(var(--chart-5))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={taskCompletionTimeData}>
                      <XAxis dataKey="range" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="tasks" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* User Statistics Section */}
      <AnimatedSection>
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">User Statistics</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Login Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    logins: {
                      label: "Logins",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={loginFrequencyData}>
                      <XAxis
                        dataKey="day"
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
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="logins" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Usage Time (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    minutes: {
                      label: "Minutes",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={usageTimeData}>
                      <XAxis
                        dataKey="date"
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
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="minutes" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-white">Productivity Score</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    score: {
                      label: "Score",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={productivityScoreData}>
                      <XAxis
                        dataKey="month"
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
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="score" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-white">User Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Logins (This Week)</span>
                  <span className="text-white font-semibold">25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Average Daily Usage</span>
                  <span className="text-white font-semibold">62 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Most Active Day</span>
                  <span className="text-white font-semibold">Thursday</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Least Active Day</span>
                  <span className="text-white font-semibold">Sunday</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Current Productivity Score</span>
                  <span className="text-white font-semibold">88/100</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </AnimatedSection>
    </div>
  )
}

