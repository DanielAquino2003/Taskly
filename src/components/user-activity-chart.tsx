"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Mon", active: 24 },
  { day: "Tue", active: 13 },
  { day: "Wed", active: 28 },
  { day: "Thu", active: 39 },
  { day: "Fri", active: 34 },
  { day: "Sat", active: 15 },
  { day: "Sun", active: 8 },
]

export function UserActivityChart() {
  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-white">User Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            active: {
              label: "Active Users",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
              <Line type="monotone" dataKey="active" strokeWidth={2} stroke="hsl(var(--chart-2))" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

