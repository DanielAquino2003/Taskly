import { StatsWidget } from "@/components/stats-widget"
import { GoalsWidget } from "@/components/goals-widget"
import { RemindersWidget } from "@/components/reminders-widget"
import { QuickStatsWidget } from "@/components/quick-stats-widget"
import { QuickTasksWidget } from "@/components/quick-tasks-widget"
import { TaskCompletionChart } from "@/components/task-completion-chart"
import { UserActivityChart } from "@/components/user-activity-chart"
import { AddNote } from "@/components/AddNote"

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <div className="lg:col-span-2">
        <StatsWidget />
      </div>
      <QuickStatsWidget />
      <GoalsWidget />
      <RemindersWidget />
      <QuickTasksWidget />
      <TaskCompletionChart />
      <UserActivityChart />
      <AddNote />
    </div>
  )
}

